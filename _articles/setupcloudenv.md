---
layout: default
title: "Setting up a cloud environment"
date: 2023-09-29
---

# Setting up your cloud development environment

How to set up an opinionated and specific development environment. This is a useful guide if you want to setup these exact things to work together as a single solution. Streamlit Community Cloud requires a github repository to deploy from, so that's why we start with setting up your github account. The other services are optional (but helpful) to getting Streamlit running. my use case is using an iPad exclusively so local instalation is not an option.

## Setup your GitHub account

You will need a GitHub account for deploying to Streamlit. It is also a good idea to have a github account if you deal with text you care about. It is a way to keep text centralized and safe. You also can see previous versions of files which can be very handy with code.

If you already have a GitHub setup, then you can move on to the next step.

This is the homepage for GitHub:
- <https://www.github.com/>

Private repos.

## GitHub basics

commit, then push

To create a folder in the web interface you specify the folder when you add a file. Add a file using the add file button, and then rather than giving a filename, specify the folder using a trailing slash, followed by the filename.

To rename a file in the web interface, edit the file and then specify a new name for it in the textbox above the edit area.

## GitHub on iPad

### GitHub app

### working copy app

need to have a personal access token
- settings -> developer settings
use the personal access token in place of password


## GitHub.dev editor

This is an optional step. This is a free alternative to codespaces.

## GitHub Codespaces

This is an optional step. An instant development environment.

More information on GitHub Codespaces can be found here:
- <https://github.com/codespaces>

## Making VSCode in a browser useful on iPad

## Keyboard shortcuts

If you use VSCode in a real browser with GitHub.dev or Codespaces, you may notice that not many keyboard shortcuts work. To remedy this you can add VSCode to the home screen. To do this, open the site you want to put on your homescreen with Safari. Once you have it open in Safari, click the Share icon and pick 'Add to Homescreen'.

You can open your own repos in VScode from your homescreen. Bring up the command palette and search for 'Open Remote Repository'. Picking this will give you the ability to select from the repos in your account.

### The Esc key

iPadOS allows you to remap physical hardware keys to have the same functionality as an ESC key would. Here’s how to make this change:
1. Open the Settings app
1. Tap General
1. Tap Keyboard
1. Choose Hardware Keyboard
1. Look for the Modifier Keys option

You will have the ability to customize five different keys: Caps Lock, Control, Option, Command, and Globe. The most common recommendation is to remap the Caps Lock key to act like an Escape key.  To do this, tap the “Caps Lock Key” option and pick the “Escape” option. Now, every time you hit the Caps Lock key, it will perform just like an Escape key would. Of course, this also means you lose Caps Lock functionality unless you remap it to another key.

## GitHub copilot

This is an optional step.
This is a paid service and is useful for generating code.

More information on GitHub Copilot can be found here:
- <https://docs.github.com/en/copilot>

## GitHub pages

This is an optional step.
This is a website you can host through github.

Learn markdown.
- <https://www.markdownguide.org/cheat-sheet/>

Advantages are:
- version controlled
- can use codespaces or github.dev or other github app to edit
- can use copilot for genai help

<https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll>

### GitHub pages themes

Search for the tags #github-pages and #jekyll-theme

<https://github.com/search?q%253D%2523github-pages%252B%2523jekyll-theme%2526type%253Drepositories>

<https://github.com/pages-themes>

Cayman theme used on this page: <https://github.com/pages-themes/cayman/>

## Streamlit

<https://streamlit.io/>
<https://docs.streamlit.io/library/api-reference>
<https://github.com/streamlit>

## Streamlit Community Cloud

This is required if you want to deploy your application code hosted in a GitHub repository on Streamlit Community Cloud.

Streamlit deployment guide: <https://docs.streamlit.io/streamlit-community-cloud/deploy-your-app>
