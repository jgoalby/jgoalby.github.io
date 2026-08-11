set shell := ["zsh", "-cu"]

# Choose a project command interactively
default:
    #!/usr/bin/env zsh
    set -eu

    if ! command -v gum >/dev/null 2>&1; then
      echo "Gum is not installed, so here are the available commands:"
      just --list
      exit 0
    fi

    selection=$(
      printf '%s\n' \
        "serve      Run the site locally with live reload" \
        "build      Build the production site" \
        "check      Check content and build the site" \
        "install    Install the Ruby dependencies" \
        "clean      Remove generated Jekyll files" \
        "status     Show the Git working tree status" \
        "review     Review changes before committing" \
        "pull       Get the latest changes from GitHub" \
        "stage      Stage all changes for a commit" \
        "commit     Commit the currently staged changes" \
        "push       Push committed changes to GitHub" \
        "publish    Check, commit, and push site changes" \
        "help       Show every available command" |
        gum choose --header "What would you like to run?" --height 13
    ) || exit 0

    recipe="${selection%% *}"
    just "$recipe"

# Install the Ruby dependencies locally
[group('Site')]
install:
    BUNDLE_PATH=.bundle/vendor bundle install

# Build the production site into _site
[group('Site')]
build:
    BUNDLE_PATH=.bundle/vendor bundle exec jekyll build

# Run the site at http://localhost:4000 with live reload
[group('Site')]
serve:
    BUNDLE_PATH=.bundle/vendor bundle exec jekyll serve --livereload

# Check front matter and build the site
[group('Site')]
check:
    BUNDLE_PATH=.bundle/vendor bundle exec jekyll build --strict_front_matter

# Remove generated Jekyll files and caches
[group('Site')]
clean:
    BUNDLE_PATH=.bundle/vendor bundle exec jekyll clean

# Show the current branch and working tree status
[group('Git')]
status:
    @git status --short --branch

# Review staged and unstaged changes
[group('Git')]
review:
    #!/usr/bin/env zsh
    set -eu

    git status --short --branch
    echo
    echo "Unstaged changes:"
    git diff --stat
    git diff
    echo
    echo "Staged changes:"
    git diff --cached --stat
    git diff --cached

# Get the latest GitHub changes without creating a merge commit
[group('Git')]
pull:
    git pull --ff-only

# Stage all changes and show what will be committed
[group('Git')]
stage:
    git add -A
    @git status --short

# Prompt for a message and commit the currently staged changes
[group('Git')]
commit:
    #!/usr/bin/env zsh
    set -eu

    if git diff --cached --quiet; then
      echo "There are no staged changes to commit. Run 'just stage' first."
      exit 1
    fi

    if command -v gum >/dev/null 2>&1; then
      message=$(gum input --header "Commit message" --placeholder "Describe this update")
    else
      read "message?Commit message: "
    fi

    if [[ -z "$message" ]]; then
      echo "Commit cancelled: a message is required."
      exit 1
    fi

    git commit -m "$message"

# Push committed changes to GitHub
[group('Git')]
push:
    git push

# Pull the latest changes and refresh dependencies
[group('Git')]
update:
    just pull
    just install

# Check the site, then confirm, commit, and push all changes
[group('Git')]
publish:
    #!/usr/bin/env zsh
    set -eu

    just check

    if [[ -z "$(git status --porcelain)" ]]; then
      echo "The site is valid, but there are no changes to publish."
      exit 0
    fi

    git status --short
    echo

    if command -v gum >/dev/null 2>&1; then
      gum confirm "Stage all of these changes and publish them?" || exit 0
    else
      read "answer?Stage all of these changes and publish them? [y/N] "
      [[ "$answer" == [yY]* ]] || exit 0
    fi

    just stage
    just commit
    just push

# Show every available command
[group('Help')]
help:
    @just --list
