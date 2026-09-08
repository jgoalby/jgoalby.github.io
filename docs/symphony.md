# Symphony for the website

Symphony watches the [Website project in Linear](https://linear.app/john-goalby/project/website-1fc47cbc2b43)
and works on [jgoalby/jgoalby.github.io](https://github.com/jgoalby/jgoalby.github.io).

Create issues in Backlog while planning. Move one to Todo when its description
and acceptance criteria are ready. Symphony moves it to In Progress, works in
an isolated clone, checks the Jekyll build, and opens a draft PR against master.
Finished work and blockers go to In Review. Review and merge manually, then mark
the issue Done. Return feedback to Todo or In Progress to resume the workspace.

GitHub Pages publishes master automatically. Agents leave publication to your
review and merge; they must not push directly to master or run just publish.

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
