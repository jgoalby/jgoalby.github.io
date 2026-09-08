#!/usr/bin/env python3
"""Merge one reviewed PR. The caller must first verify live Linear approval."""
import argparse
import json
import re
import subprocess
import sys

REPOSITORY = "jgoalby/jgoalby.github.io"
BASE = "master"
FIELDS = "url,state,isDraft,headRefOid,baseRefName,isCrossRepository,mergeable,mergeStateStatus,reviewDecision,statusCheckRollup,mergeCommit"


class Blocked(Exception):
    pass


class Pending(Exception):
    pass


def gh(*args):
    result = subprocess.run(["gh", *args], text=True, capture_output=True)
    if result.returncode:
        raise Blocked(result.stderr.strip() or "GitHub command failed")
    if args[:2] == ("pr", "ready"):
        return None
    return json.loads(result.stdout) if result.stdout.strip() else None


def read_pr(number):
    return gh("pr", "view", number, "--repo", REPOSITORY, "--json", FIELDS)


def identity(pr, sha):
    if pr["baseRefName"] != BASE or pr["isCrossRepository"]:
        raise Blocked("PR must originate in this repository and target " + BASE)
    if pr["headRefOid"] != sha:
        raise Blocked("PR changed since review. Request a new review; keep the recorded SHA.")
    if pr["state"] not in ("OPEN", "MERGED"):
        raise Blocked("PR is closed without merging")


def checks(pr):
    if pr["reviewDecision"] in ("CHANGES_REQUESTED", "REVIEW_REQUIRED"):
        raise Blocked("GitHub review requirements are not satisfied")
    if pr["mergeable"] == "CONFLICTING":
        raise Blocked("PR has merge conflicts; request another implementation and review")
    for check in pr["statusCheckRollup"] or []:
        if "conclusion" in check:
            if check["status"] != "COMPLETED":
                raise Pending("CI is still running")
            if check["conclusion"] not in ("SUCCESS", "NEUTRAL", "SKIPPED"):
                raise Blocked("CI failed: " + check.get("name", "unnamed check"))
        elif check.get("state") == "PENDING":
            raise Pending("Commit status is pending")
        elif check.get("state") != "SUCCESS":
            raise Blocked("Commit status failed or was not recognized")
    if pr["mergeable"] != "MERGEABLE" or pr["mergeStateStatus"] == "UNKNOWN":
        raise Pending("GitHub is calculating mergeability")
    if pr["mergeStateStatus"] != "CLEAN":
        raise Blocked("GitHub merge state is " + pr["mergeStateStatus"])


def merge(number, sha):
    pr = read_pr(number)
    identity(pr, sha)
    if pr["state"] == "MERGED":
        if not pr["mergeCommit"]:
            raise Pending("GitHub has not returned the merge commit yet")
        return pr  # Recover after a successful merge followed by a Linear failure.
    if pr["isDraft"]:
        gh("pr", "ready", number, "--repo", REPOSITORY)
        pr = read_pr(number)
        identity(pr, sha)
    checks(pr)
    # GitHub atomically rejects a changed head. Direct API avoids enabling
    # auto-merge or a merge queue whose execution could outlive approval.
    result = gh("api", "--method", "PUT", "repos/" + REPOSITORY + "/pulls/" + number + "/merge",
                "-f", "sha=" + sha, "-f", "merge_method=squash")
    if not result or result.get("merged") is not True:
        raise Blocked("GitHub did not confirm a completed merge")
    pr = read_pr(number)
    identity(pr, sha)
    if pr["state"] != "MERGED" or not pr["mergeCommit"]:
        raise Pending("Merge submitted; confirm GitHub state on the next attempt")
    return pr


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pr", help="PR number from the Linear review record")
    parser.add_argument("reviewed_sha", help="Full head SHA recorded before human approval")
    args = parser.parse_args()
    if not re.fullmatch(r"[1-9][0-9]*", args.pr) or not re.fullmatch(r"[0-9a-f]{40}", args.reviewed_sha):
        parser.error("Expected a positive PR number and a full lowercase 40-character SHA")
    try:
        pr = merge(args.pr, args.reviewed_sha)
        print(json.dumps({"state": pr["state"], "url": pr["url"], "mergeCommit": pr["mergeCommit"]}))
    except Pending as error:
        print("PENDING: " + str(error), file=sys.stderr)
        return 3
    except (Blocked, KeyError, ValueError) as error:
        print("BLOCKED: " + str(error), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
