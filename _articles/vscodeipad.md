---
layout: default
title: "Using VSCode on an iPad"
date: 2023-10-09
---

# GitHub.dev vs Codespaces

VScode can run on an iPad in 2 different ways. GitHub.dev and Codespaces. GitHub.dev is lightweight and free and therefore somewhat limited in features. Codespaces is more capable as it runs in a VM and costs money for compute and storage.

## Codespaces features not available in GitHub.dev

- Debug and run code
- Terminal
- Copilot extension can be used

# Adding VSCode to your iPad homescreen

- Better keyboard support
- Easier to run

# VSCode Keyboard Shortcuts on iPad

Note: The keyboard functionality on the iPad is limited compared to the full VSCode experience.

## Most useful ones to learn first

- CMD-SHIFT-P command palette (can also get to file selection if you backspace to remove >)
- CMD-P file selection, and can keep pressing to go through list (can type > to get to command palette)
- CMD-K-S lists all keyboard shortcuts

## Sidebar

- CMD-SHIFT-E explorer
- CMD-SHIFT-F search / find
- CTRL-SHIFT-G goes to the github section
    - but does not seem to put focus in messsage, but you can use tab to cycle through files as well as cursor keys
    - CMD-SHIFT-G would be the natural choice, but it is assigned to another function
- CMD-SHIFT-D debug / run (not usable in the web-based editor)
- CMD-SHIFT-X extensions
- CMD-B toggle sidebar

## Others

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
- List useful shortcuts and how they are helpful
    - CMD-S
    - CMD-/ for commenting and uncommenting
    - CMD-L selects current line, and then further presses selects next lines one by one
    - CMD-, opens settings
    - CTRL-G go to line
    - CMD-[ CMD-] indent or unindent
    - CMD-K-X remove whitespace at the end of the line
- Shortcuts that I don't yet understand fully
    - CMD-G highlight search results and allows you to cycle through them
    - CMD-F searches within the current file, but not sure how to get rid of the find dialog as ESC does not work
- Issues
    - Often CMD-UP and CMD-DOWN stop working
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
