---
layout: default
title: "Logseq"
date: 2023-11-12
---

# What is Logseq?

- Second brain: https://www.buildingasecondbrain.com/
- Available on Windows, Mac, Linux, iOS, and Android
- Offline use is major feature for security and privacy
- Free and open-source so not controlled by 3rd party company
- Supports plugins, and is programmable

# Syncing using GitHub on iOS using WorkingCopy

Please note that you will have to do these steps for each iOS device you want to use LogSeq on.

## Step 1, Set up the folder to sync
- Clone your repository
- Tap the newly cloned repository
- Tap on the "Repository" item
- Tap the repository name at the top of the screen
- Tap Link Repository to menu item
- Tap Directory
- Browse for LogSeq folder on your device (not iCloud)
- Create a new folder for your files
- Tap Open to specify that folder as the linked folder
- You should see a chain next to the repository name in the repository list

## Step 2, Add graph to the folder
- Open LogSeq
- Tap Documents
- Tap Add new graph
- Tap Create a new graph
- Give the graph a name
- Uncheck iCloud sync
- Select the folder you created in previous step and tap Open

## Step 3a, Add automation for opening LogSeq to pull changes
- Open ShortCuts > Automation Tab > Tap Plus to Create Personal Automation
- Scroll down to App, and tap it
- We define which app by tapping choose, and select LogSeq
- Tap Is Opened
- Tap Run immediately
- Tap Next
- Tap New Blank Automation
- Tap Add Action
- Search for action Pull Repository
    - Specify for Repository your Logseq repo
- Tap Done

## Step 3b, Add automation for opening LogSeq to pull changes
- Open ShortCuts > Automation Tab > Tap Plus to Create Personal Automation
- Scroll down to App, and tap it
- We define which app by tapping choose, and select LogSeq
- Tap Is Closed, and make sure Is Opened is not selected
- Tap Run immediately
- Tap Next
- Tap New Blank Automation
- Tap Add Action
- Search for action Stage for Commit
    - For path specify *
    - For repository use your Logseq repo
- Create an action for If condition below the stage action
- Select Magic Variable - choose Filenames below the first action
- Condition: has any value
    - Add Commit Repository action under if action
        - Repository your Logseq repo
        - For message specify Auto-commit from LogSeq
        - You can toggle off Fail when nothing to Commit to prevent failure notification
    - Add Push Repository action as second action under if action
        - Specify your repository as the Logseq repo

## Step 4, Make sure it works
- Open LogSeq and type something
- Close LogSeq
- See if your changes have been commited to GitHub

# Useful plugins
- copycode
    - adds button to the right of code blocks to copy the code
- bulletthreading
    - adds a visual indication of threading in bullets
- git plugin
- chatgpt
- mindmap (markmap?)

# Themes

- Bonofix

# Programming LogSeq

- Clojure
- Javascript
- Python
- R

# Resources

- https://logseq.com/
- https://hub.logseq.com/
- https://discuss.logseq.com/
- https://discord.gg/KpN4eHY
- https://github.com/logseq/
- https://github.com/logseq/awesome-logseq
- https://www.youtube.com/c/Logseq
- https://xyhp915.github.io/logseq-marketplace-table/
- https://youtu.be/khNI-4r2wW0?si%253DhkTlmqCYFObE84R1
