# Symphony for the website

Symphony watches the [Website project in Linear](https://linear.app/john-goalby/project/website-1fc47cbc2b43)
and works on [jgoalby/jgoalby.github.io](https://github.com/jgoalby/jgoalby.github.io).

Create issues in Backlog while planning. Move one to Todo when its description
and acceptance criteria are ready. Symphony moves it to In Progress, works in
an isolated clone, checks the Jekyll build, and opens a draft PR against master.
Finished work and blockers go to In Review. Review the recorded PR commit, then
move the issue to Approved to let Symphony merge and mark Done. You can also
merge and mark Done manually. Return feedback to Todo or In Progress to resume the workspace.

GitHub Pages publishes master automatically. Moving an issue to Approved
authorizes that publication through the PR merge. Agents must not push directly
to master or run just publish.

## Run alongside Tanks

Use two Symphony processes to watch both projects simultaneously. They share one
runtime installation, Codex login, GitHub login, and saved Linear key.

| Project | Dashboard | Workspace directory under ~/symphony/elixir/tmp |
| --- | --- | --- |
| Tanks | http://127.0.0.1:4000 | tanks-workspaces |
| Website | http://127.0.0.1:4001 | website-workspaces |

Each project runs one agent at a time, so both processes together can run two.
They share your Codex usage limits. Stop either process independently with Ctrl-C.

In one terminal, start Tanks as usual. In another terminal:

```bash
cd ~/GitHub/jgoalby.github.io
./scripts/symphony.sh
```

The launcher uses `~/symphony/elixir`, including the local runtime changes on
branch `tanks-git-write-access`. That branch supplies scoped Git writes and
reasoning-effort labels for both repositories. Preserve it when updating Symphony.

The existing Linear key is read from `~/symphony/elixir/.env.tanks`, the host-only
file created during Tanks setup. No second key is needed for these projects in
the same Linear team. LINEAR_API_KEY overrides the file; SYMPHONY_ENV_FILE can
select another file. Never save the key in this public website repository.

Prerequisites are mise, signed-in Codex and GitHub CLI, Ruby/Bundler compatible
with Gemfile.lock, and Just. The workspace hook clones the repository and installs
locked gems into `.bundle/vendor` inside that clone. Logs go under
`~/symphony/elixir/log/website`. SYMPHONY_HOME can select another runtime installation.

This starts a foreground process, not a login service. It includes Symphony's
required engineering-preview acknowledgement and keeps the dashboard on localhost.

## Reasoning effort

Use one existing Linear label to override the medium default:
`effort:low`, `effort:medium`, `effort:high`, `effort:xhigh`, `effort:max`, or
`effort:ultra`. Add it before moving the issue to Todo. Without an effort label,
`codex.reasoning_effort` in WORKFLOW.md supplies the default. Conflicting effort
labels produce an error; remove the conflict before retrying.

## Validation and previews

Agents run `just check` for the strict front matter build. To preview a visual
change while both dashboards are running, use a separate port:

```bash
BUNDLE_PATH=.bundle/vendor bundle exec jekyll serve --host 127.0.0.1 --port 4100
```

Open http://127.0.0.1:4100. Keep the operational files excluded in _config.yml so
WORKFLOW.md, AGENTS.md, scripts, and this documentation do not become public pages.

## First test

Create an issue in the Website project asking for one small README clarification,
with acceptance criteria that only README.md changes and `just check` passes.
Move it to Todo and check for a workpad, issue branch, draft PR, and In Review.
This exercises the workflow without publishing website content.

## Approve a reviewed PR

The lifecycle is Todo → In Progress → In Review → Approved → Done. Approved is
a started state in the shared Linear team, available to both projects. Only you
move an issue to Approved. Check the PR and the `Review commit` SHA in its workpad
before approving. Give feedback by returning the issue to Todo or In Progress.

Symphony verifies the recorded head, target branch, GitHub reviews, CI results,
and mergeability, marks the draft ready, then squash-merges that exact head.
It respects branch protections and retains the issue branch. Pending checks
leave the issue Approved for retry. Failed checks, conflicts, changed commits,
or missing review information return it to In Review with an explanation.
Projects without GitHub CI rely on the recorded successful local project checks.

After confirming the merge, Symphony records the merge commit and moves to Done.
For Website, this triggers normal Pages publication; Done confirms the merge,
not the deployment result. Tanks deployment remains a separate manual action.
If you merge manually, mark Done yourself, or leave Approved for Symphony to
confirm the same PR and finish the Linear update.

Issues already In Review before this feature have no recorded review SHA.
Return them to Todo to produce a fresh validated handoff before approving.
Never fill in a newer SHA while an issue is Approved.

Merge this setup change and pull the default branch in the checkout used by the
launcher before using Approved. Restart that project's Symphony process to
ensure it loads the new workflow. Python 3 and the authenticated GitHub CLI are
required for the merge helper. Test with a small README issue, review the PR,
move it to Approved, and confirm GitHub shows Merged and Linear shows Done.
The approval check and GitHub merge use separate APIs: moving an issue away
from Approved cannot cancel a merge request that has already been submitted.

Run the merge helper's offline tests with
`PYTHONDONTWRITEBYTECODE=1 python3 scripts/test_symphony_merge.py`.
