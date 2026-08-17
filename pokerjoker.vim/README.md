# Pocket Joker — Vim mode

A standalone, keyboard-only Balatro-like exploration. It has a simple goal: reach 300 chips in four hands, with three discards and a fixed `+4 Mult` Joker.

Open `index.html` directly, or serve this folder with any static file server. There are no packages, dependencies, build steps, external assets, or network requests.

The hand defaults to rank sorting from Ace down to 2. Equal ranks follow Balatro's suit order: Spades, Hearts, Clubs, then Diamonds. Suit sorting uses that same suit priority and keeps ranks high-to-low within each suit. Newly drawn cards automatically respect the active sort mode.

## Core grammar

### Movement

- `h` / `l` moves left and right.
- Counts work with motions and toggles: `3l`, `2h`, `4x`.
- `0` / `$`, `gg` / `G`, and Home / End jump to the first or last card.

### Individual and visual selection

- `Space` or `x` toggles the card under the cursor.
- `v` begins a visual range. Move with `h` / `l`, then press Space, `x`, or `y` to add it to the selection.
- In visual mode, `d` immediately discards the range and `p` or Enter plays it.
- `c` clears the selection and `u` restores its previous state.

### Group language

`s{target}` adds a group to the current selection. Uppercase `S{target}` replaces the selection. `d{target}` immediately discards a group, while `dd` discards the current selection.

Targets:

- Suits: `h` hearts, `d` diamonds, `c` clubs, `s` spades
- Classes: `f` face cards, `r` red cards, `b` black cards, `*` all cards
- Ranks: `2`–`9`, `0` tens, `j`, `q`, `k`, `a`

Examples: `sh` selects all hearts, `S5` replaces the selection with all fives, `sf` adds all face cards, and `dh` immediately discards every heart. Because `dd` follows Vim's whole-selection convention, use uppercase `dD` to discard diamonds directly. Actions are capped at Balatro's five-card maximum.

### Actions and command mode

- `p` or Enter plays the selected hand.
- `.` repeats the last repeatable action.
- `r` starts a new round; `?` toggles the manual.
- `:` enters EX-style command mode.

Supported commands include `:select hearts`, `:add faces`, `:discard black`, `:discard selected`, `:play`, `:clear`, `:sort rank`, `:sort suit`, `:restart`, `:help`, and `:normal`.

## Files

- `index.html` — semantic terminal layout
- `styles.css` — terminal, split-buffer, card, mode, and responsive design
- `engine.js` — deterministic deck and poker hand evaluator
- `game.js` — modal input grammar, game state, and renderer
- `test.html` — dependency-free browser test suite
