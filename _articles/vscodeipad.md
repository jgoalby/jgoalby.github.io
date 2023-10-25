---
layout: default
title: "Using VSCode on an iPad"
date: 2023-10-09
---

# GitHub.dev vs Codespaces

VScode can run on an iPad in 2 different ways. GitHub.dev and Codespaces. GitHub.dev is lightweight and free and somewhat limited in features. Codespaces is more capable as it runs in a VM and costs money for compute and storage.

## Codespaces features not available in GitHub.dev

- Debug and run code
- Terminal
- Copilot extension can be used
- Full intellisense
- Can use linting based on install packages

# Adding VSCode to your iPad homescreen

- Better keyboard support
- Easier to run
- Easier to navigate to in the list of running apps

# Stage Manager and Display Zoom

When using an iPad for development, you will likely want to multitask a lot and be able to see multiple apps at the same time. These settings will enhance that experience.

## Stage Manager for multitasking

Multitasking & Gestures -> Stage Manager

## Display Zoom for more space

Display & Brightness -> Display Zoom -> More Space

# VSCode Keyboard Shortcuts on iPad

Note: The keyboard functionality on the iPad is limited compared to the full VSCode experience.

## Most useful ones to learn first

- CMD-SHIFT-P command palette (can also get to file selection if you backspace to remove >)
- CMD-P file selection, and can keep pressing to go through list (can type > to get to command palette, : to get to go to line)
- CTRL-G go to line in file
- CMD-K-S lists all keyboard shortcuts

## Sidebar

- CMD-SHIFT-E explorer
- CMD-SHIFT-F search / find
- CTRL-SHIFT-G goes to the github section
    - but does not seem to put focus in messsage, but you can use tab to cycle through files as well as cursor keys
    - CMD-SHIFT-G would be the natural choice, but it is assigned to another function
- CMD-SHIFT-D debug / run (not usable in the web-based editor)
- CMD-SHIFT-X extensions
- CMD-CTRL-I GitHub copilot
- CMD-B toggle sidebar

## Copilot

- CMD-SHIFT-I ask Copilot
    - type / to get a list of commands
    - type /help for help

Slash Commands

Slash commands tailor the conversation to common tasks. Pick from the available commands by typing /:

/help - Learn how to use Copilot Chat
/workspace - Ask a question about the files in your current workspace
/tests - Generate unit tests for the selected code
/simplify - Simplify the selected code
/fix - Propose a fix for the problems in the selected code
/explain - Explain how the selected code works
/extApi - Ask about VS Code extension development
/vscode - Ask questions about VS Code
/createNotebook - Create a new Jupyter Notebook
/createWorkspace - Scaffold code for a new workspace
/search - Generate query parameters for workspace search

- Shortcuts I have made
    - CMD-CTRL-D /doc for Copilot to add a docstring to a function

## Others
- Move code up and down using cursor keys
    - OPT-UP/DOWN
    - Works on selected text as well as current line
- Remote repository changing
- Already specified ESC key change
- How to change tabs simply
- Page up and page down
- Can I access github functionality such as commiting, would be nice to have save and commit
- What are good shortcuts to define
- Are there other people writing about this?
- Add the multiple cursor shortcuts
    - CMD-OPT-UP/DOWN adds a cursor up or down from current position
    - SHIFT-OPT-i after making a selection will add a cursor to the end of lines
    - CMD-SHIFT-L causes all occurrences under cursor to be selected with multiple cursors
    - OPT-CLICK puts a cursor where you click
    - CMD-D press multiple times to add a cursor on the word under current position
- List of useful shortcuts and how they are helpful
    - CMD-S
    - CMD-/ for commenting and uncommenting
    - CMD-L selects current line, and then further presses selects next lines one by one
    - CMD-, opens settings
    - CTRL-G go to line
    - CMD-[ CMD-] indent or unindent
    - CMD-K-X remove whitespace at the end of the line
    - CMD J shows the terminal
- Shortcuts that I don't yet understand fully
    - CMD-G highlight search results and allows you to cycle through them
    - CMD-F searches within the current file, but not sure how to get rid of the find dialog as ESC does not work
- Issues
    - Often CMD-UP and CMD-DOWN stop working
    - CTRL-TAB does not change tabs
- What about vim mode? Does this give page up and down?
    - CTRL-U page up
    - CTRL-D page down
    - SHIFT-g and gg
    - Set CMD-OPT-V to toggle vim mode on and off
        - CMD-K-S and search for toggle vim

# iPad Key Reference

- Command (or Cmd) ⌘
- Shift ⇧
- Option (or Alt) ⌥
- Control (or Ctrl) ⌃
- Caps Lock ⇪

# User Settings

PyLint warnings you might want to disable:
- W0311 - Bad Indentation
- C0301 - Line too long

```
{
    "editor.minimap.enabled": false,
    "pylint.args": [
        "--disable=W0311",
        "--disable=C0301"
    ],
}
```
