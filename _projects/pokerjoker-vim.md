---
title: pokerjoker.vim
description: A standalone, keyboard-only Balatro-like card game experiment built around Vim-style commands.
date: 2026-08-17
section: Project 003
---

## Play cards with a modal command language.

**pokerjoker.vim** is a dependency-free browser game that explores how a Balatro-like card loop feels when the primary interface is inspired by Vim. The goal is small and focused: reach 300 chips in four hands, with three discards and a fixed `+4 Mult` Joker.

[Play pokerjoker.vim](https://www.goalby.org/pokerjoker.vim/)

<figure class="project-screenshot">
  <img src="{{ '/assets/pokerjoker-vim-screenshot.jpg' | relative_url }}" alt="Screenshot of pokerjoker.vim showing the terminal-style card game interface">
  <figcaption>pokerjoker.vim running in the browser.</figcaption>
</figure>

## The problem

Most card games are built around pointing, clicking, and dragging. That works well, but it also hides an interesting design question: can a hand-management game feel fast and expressive if the player manipulates cards with composable keyboard commands?

This project treats the keyboard as the main interface rather than an accessibility afterthought.

## Design constraints

- It should run as a static site with no packages, build step, or external assets.
- The full game should be playable with the keyboard.
- Commands should feel familiar to Vim users without requiring a full Vim clone.
- Selection, discard, play, sort, help, and restart flows should all be reachable without a pointer.
- The rules should stay compact enough for quick experimentation.

## What it does

- Implements a four-hand poker round with a fixed Joker multiplier.
- Supports cursor movement with `h` and `l`, counts, first and last card jumps, and visual selection.
- Uses composable commands for selecting suits, ranks, colors, face cards, and all cards.
- Provides EX-style commands such as `:select hearts`, `:discard black`, `:sort rank`, and `:restart`.
- Includes rank and suit sorting, automatic sorting for newly drawn cards, undo for selection state, and repeatable actions.
- Ships with a dependency-free browser test page.

## Engineering approach

The project is plain HTML, CSS, and JavaScript. The implementation separates the deterministic deck and poker-hand evaluator from the game-state and input grammar, keeping the rules engine easier to test while the renderer stays focused on the terminal-style interface.

The command grammar borrows the parts of Vim that fit the card-table model: movement, counts, visual ranges, grouped targets, and command mode. The result is intentionally smaller than Vim, but it preserves the useful idea that a few primitives can combine into fast actions.

## What I learned

Keyboard-first design changes the shape of a game. Small conveniences, such as count prefixes, repeated actions, and mode feedback, matter more when every move is typed. The experiment also reinforced how useful a tight grammar can be: the same concepts that make text editing efficient can make game actions feel deliberate and quick.
