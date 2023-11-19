---
layout: default
title: "Logseq"
date: 2023-11-12
---

# What is Logseq?
- Second brain
    - <https://www.buildingasecondbrain.com/>
- Available on Windows, Mac, Linux, iOS, and Android
    - Usable in most places you need
- Offline use first
    - Security and privacy
- Plain text files using markdown format
    - Future proof
    - Easy to export to other systems
    - Easy to version control
- Free and open-source
    - No annoying subscriptions required
    - Not controlled by 3rd party company
- Supports plugins, and is programmable
    - Extensibility

# Limitations on iOS
- Unfortunately right now plugins are not supported
    - There is a feature request that has 99 votes as of Nov 13th 2023
        - <https://discuss.logseq.com/t/plugin-support-for-ios-android-apps/10109>

# Keyboard Shortcuts
If you click the 3 dots in the top right of the application, click settings, and then click keymap, you can see the keyboard shortcuts. You can also use the keyboard shortcut `g s` to see the shortcuts.

## Useful Shortcuts
- `Enter` - Enter edit mode
- `Esc` - Leave edit mode
- `CMD-K` - Search or create page
- `g s` - Show shortcuts
- `g j` - Show journals
- `g n` - Next journal
- `g p` - Previous journal
- `g a` - All pages
- `g f` - Flashcards
- `g g` - Graph view
- `CMD-SHIFT-P` - Command palette
- `CMD-SHIFT-J` - Open journal in sidebar
- `t w` - Make screen wider
- `t l` - Toggle left sidebar
- `t r` - Toggle right sidebar

# Properties

TODO

# Queries

#### Give me all blocks that have the tag daily, but not the tag page itself or my templates page
{% raw %}
{{query (and #daily (not (page "templates")) (not (page "daily"))) }}
{% endraw %}

# Task Management

TODO

# Syncing using GitHub on iOS using WorkingCopy

You could sync with iCloud, but there are numerous reports of issues with it being slow on the forums. There is also a native LogSeq sync although it is still in beta.

Please note that you will have to do these steps for each iOS device you want to use LogSeq on. Also note that you will need to pay for the pro features of WorkingCopy to link folders.

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
- You need to make sure you lose focus on LogSeq after edits for shortcuts to run

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

- Instructions and a video on a graph that shows Javascript and Python execution
    - <https://github.com/adxsoft/logseq-code-execution-demo-graph>

## Languages supported (not on iOS):
- Clojure
- Javascript
- Python
- R

# Resources
- <https://logseq.com/>
- <https://hub.logseq.com/>
- <https://discuss.logseq.com/>
- <https://discord.gg/KpN4eHY>
- <https://github.com/logseq/>
- <https://github.com/logseq/awesome-logseq>
- <https://www.youtube.com/c/Logseq>
- <https://xyhp915.github.io/logseq-marketplace-table/>
- <https://youtu.be/khNI-4r2wW0?si%253DhkTlmqCYFObE84R1>
- <https://cheatography.com/bgrolleman/cheat-sheets/logseq/>
