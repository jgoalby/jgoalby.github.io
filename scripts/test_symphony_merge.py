"""Offline merge safety tests. No GitHub or Linear mutations."""
import copy
import importlib.util
from pathlib import Path
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('merge_helper', Path(__file__).with_name('symphony-merge.py'))
helper = importlib.util.module_from_spec(spec)
spec.loader.exec_module(helper)
SHA = 'a' * 40


class MergeTests(unittest.TestCase):
    def setUp(self):
        self.pr = dict(url='https://github.com/' + helper.REPOSITORY + '/pull/7',
                       state='OPEN', isDraft=False, headRefOid=SHA,
                       baseRefName=helper.BASE, isCrossRepository=False,
                       mergeable='MERGEABLE', mergeStateStatus='CLEAN',
                       reviewDecision='', statusCheckRollup=[], mergeCommit=None)
        self.calls = []

    def fake_gh(self, *args):
        self.calls.append(args)
        if args[:2] == ('pr', 'view'):
            return copy.deepcopy(self.pr)
        if args[:2] == ('pr', 'ready'):
            self.pr['isDraft'] = False
            return None
        if args[0] == 'api':
            self.pr['state'] = 'MERGED'
            self.pr['mergeCommit'] = {'oid': 'b' * 40}
            return {'merged': True}
        self.fail('Unexpected command: ' + repr(args))

    def run_merge(self):
        with patch.object(helper, 'gh', side_effect=self.fake_gh):
            return helper.merge('7', SHA)

    def assert_no_merge(self, exception):
        with self.assertRaises(exception):
            self.run_merge()
        self.assertFalse(any(c[0] == 'api' for c in self.calls))

    def test_ready_then_atomic_squash_merge_and_confirmation(self):
        self.pr['isDraft'] = True
        self.assertEqual('MERGED', self.run_merge()['state'])
        call = next(c for c in self.calls if c[0] == 'api')
        self.assertIn('sha=' + SHA, call)
        self.assertIn('merge_method=squash', call)
        self.assertIn('repos/' + helper.REPOSITORY + '/pulls/7/merge', call)
        self.assertEqual(('pr', 'view'), self.calls[-1][:2])

    def test_identity_changes_cannot_merge(self):
        for key, value in [('headRefOid', 'c' * 40), ('baseRefName', 'wrong'),
                           ('isCrossRepository', True), ('state', 'CLOSED')]:
            with self.subTest(key=key):
                original = self.pr[key]
                self.pr[key] = value
                self.assert_no_merge(helper.Blocked)
                self.pr[key] = original

    def test_pending_checks_or_unknown_mergeability_retry(self):
        self.pr['statusCheckRollup'] = [{'status': 'IN_PROGRESS', 'conclusion': ''}]
        self.assert_no_merge(helper.Pending)
        self.pr['statusCheckRollup'] = [{'state': 'PENDING'}]
        self.assert_no_merge(helper.Pending)
        self.pr['statusCheckRollup'] = []
        self.pr['mergeable'] = 'UNKNOWN'
        self.assert_no_merge(helper.Pending)

    def test_failed_checks_and_reviews_block(self):
        for conclusion in ['FAILURE', 'CANCELLED', 'TIMED_OUT', 'ACTION_REQUIRED', 'UNKNOWN']:
            self.pr['statusCheckRollup'] = [{'status': 'COMPLETED', 'conclusion': conclusion}]
            self.assert_no_merge(helper.Blocked)
        self.pr['statusCheckRollup'] = [{'state': 'ERROR'}]
        self.assert_no_merge(helper.Blocked)
        self.pr['statusCheckRollup'] = []
        for decision in ['CHANGES_REQUESTED', 'REVIEW_REQUIRED']:
            self.pr['reviewDecision'] = decision
            self.assert_no_merge(helper.Blocked)

    def test_conflicts_and_branch_requirements_block(self):
        self.pr['mergeable'] = 'CONFLICTING'
        self.assert_no_merge(helper.Blocked)
        self.pr['mergeable'] = 'MERGEABLE'
        for state in ['BLOCKED', 'BEHIND', 'UNSTABLE', 'DIRTY', 'HAS_HOOKS']:
            self.pr['mergeStateStatus'] = state
            self.assert_no_merge(helper.Blocked)

    def test_already_merged_is_idempotent(self):
        self.pr['state'] = 'MERGED'
        self.pr['mergeCommit'] = {'oid': 'b' * 40}
        self.assertEqual('MERGED', self.run_merge()['state'])
        self.assertEqual(1, len(self.calls))

    def test_changed_head_after_ready_blocks(self):
        self.pr['isDraft'] = True
        original = self.fake_gh
        def changing(*args):
            result = original(*args)
            if args[:2] == ('pr', 'ready'):
                self.pr['headRefOid'] = 'c' * 40
            return result
        with patch.object(helper, 'gh', side_effect=changing):
            with self.assertRaises(helper.Blocked):
                helper.merge('7', SHA)
        self.assertFalse(any(c[0] == 'api' for c in self.calls))

    def test_server_rejects_racing_head_without_reporting_success(self):
        original = self.fake_gh
        def racing(*args):
            if args[0] == 'api':
                raise helper.Blocked('HTTP 409: Head branch was modified')
            return original(*args)
        with patch.object(helper, 'gh', side_effect=racing):
            with self.assertRaises(helper.Blocked):
                helper.merge('7', SHA)
        self.assertEqual('OPEN', self.pr['state'])

    def test_successful_checks(self):
        self.pr['statusCheckRollup'] = [
            {'status': 'COMPLETED', 'conclusion': c}
            for c in ['SUCCESS', 'NEUTRAL', 'SKIPPED']
        ] + [{'state': 'SUCCESS'}]
        self.assertEqual('MERGED', self.run_merge()['state'])

    def test_merge_response_requires_confirmation(self):
        original = self.fake_gh
        def unconfirmed(*args):
            if args[0] == 'api':
                return {'merged': False}
            return original(*args)
        with patch.object(helper, 'gh', side_effect=unconfirmed):
            with self.assertRaises(helper.Blocked):
                helper.merge('7', SHA)


if __name__ == '__main__':
    unittest.main()
