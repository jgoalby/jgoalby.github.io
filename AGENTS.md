# Website

Read README.md for the site structure, writing conventions, and local commands.
Follow the existing Night Workshop design in _layouts and assets/css/style.scss.
Use provided facts for biographical content and project results. Collection
bodies start with ##; the layout supplies the page title.

Run just check before handoff. For visual changes, inspect a preview at desktop
and narrow widths. Port 4100 avoids the Symphony dashboards on 4000 and 4001.
Keep _site, .bundle, caches, and local secrets out of Git.

The default branch is master. GitHub Pages publishes changes to that branch.
Symphony work belongs on issue branches with draft PRs against master. Human
approval through the Linear Approved state authorizes the merge procedure in
WORKFLOW.md for the recorded review commit and the resulting Pages publication.
Never run just publish in an agent session. Follow WORKFLOW.md for the Linear
lifecycle.

Keep AGENTS.md, WORKFLOW.md, scripts, and docs in _config.yml's exclude list so
operational files do not appear in the generated website.
