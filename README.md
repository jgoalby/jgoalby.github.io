# goalby.org

John Goalby's portfolio and notebook, built with Jekyll and published through GitHub Pages.

## Site structure

- `_projects/` contains project case studies.
- `_articles/` contains technical field guides.
- `_thoughts/` contains essays and observations.
- `about.md` and `resume.md` contain the About and Résumé pages.
- `index.md`, `work.md`, and `writing.md` build the main indexes.
- `_layouts/default.html` contains the shared page structure.
- `assets/css/style.scss` contains the Night Workshop design.

## Test locally

### First-time setup

From the repository folder, install the local dependencies:

```sh
BUNDLE_PATH=.bundle/vendor bundle install
```

The `.bundle` directory is ignored by Git and should not be committed.

### Start the site

```sh
BUNDLE_PATH=.bundle/vendor bundle exec jekyll serve --livereload
```

Open <http://localhost:4000> in a browser. Changes to Markdown, HTML, and CSS should appear automatically after saving. Stop the server by pressing `Ctrl+C` in the terminal.

If port 4000 is already in use, choose another port:

```sh
BUNDLE_PATH=.bundle/vendor bundle exec jekyll serve --livereload --port 4001
```

Then open <http://localhost:4001>.

### Test a production build

```sh
BUNDLE_PATH=.bundle/vendor bundle exec jekyll build
```

The generated site is written to `_site/`. This directory is temporary, is ignored by Git, and should not be edited or committed.

## Add or update content

Every content file uses Markdown with a front matter block:

```yaml
---
title: "A useful title"
description: "A short description for indexes and link previews."
date: 2026-08-10
---
```

The page layout creates the main page title automatically. Begin headings inside collection content with `##`, followed by `###` for subsections.

To publish something new:

1. Add a Markdown file to `_projects/`, `_articles/`, or `_thoughts/`.
2. Add any images to `assets/` and reference them as `/assets/filename.png`.
3. Start the local site and review the new page.
4. Check desktop and narrow browser widths before committing.

## Update the Git repository

Start by incorporating changes that may already be on GitHub:

```sh
git pull --ff-only
```

After editing and testing the site, review exactly what changed:

```sh
git status
git diff
```

Stage, commit, and push the update:

```sh
git add -A
git status
git commit -m "Describe the site update"
git push
```

The second `git status` is intentional: check that `_site/`, `.bundle/`, and `.DS_Store` are not staged before committing.

If GitHub Pages is configured to publish from the repository's default branch and root folder, pushing the commit triggers the normal build and deployment. The update should appear after the Pages deployment finishes.

## GitHub Pages settings

For this repository, check **Settings → Pages** and confirm:

- The publishing source is the default branch and the repository root (`/`).
- The custom domain is `www.goalby.org`.
- **Enforce HTTPS** is enabled.

The root `CNAME` file must remain in the repository when publishing from a branch. No DNS changes should be needed for this redesign if the existing domain is already working.

After pushing, the deployment result is available in the repository's **Actions** tab and under **Settings → Pages**.

