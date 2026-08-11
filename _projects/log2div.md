---
title: log2div
description: A lightweight JavaScript console for browsers with limited developer tools.
date: 2024-02-14
section: Project 001
---

## Debug anywhere.

**log2div** is a pure JavaScript library that displays console messages directly inside a webpage. It is designed for browsers—especially on phones and tablets—where conventional developer tools are missing or limited.

[View the source on GitHub](https://github.com/jgoalby/log2div/) · [Try the example](https://www.goalby.org/log2div/)

## The problem

Modern desktop browsers have excellent developer consoles. Mobile and tablet browsers often do not. While developing a Phaser 3 application on an iPad, I needed to see what the application was logging without changing devices or setting up inconvenient remote debugging.

The obvious solution was to make the page itself the console.

## Design constraints

- It should work in browsers with limited development tooling.
- Integration should require as little setup as possible.
- The library should remain understandable without a build process.
- It should overlay an existing page without preventing interaction underneath.
- Normal browser logging should remain useful when it is available.

These constraints led to a deliberately small, dependency-free JavaScript implementation.

## What it does

- Captures console log, info, warning, error, exception, and table output.
- Displays messages in an overlay within the current page.
- Allows the page underneath to remain interactive.
- Copies logs as plain text or rich HTML.
- Collapses repeated messages into a count.
- Supports custom styling and configuration.
- Can be shown, hidden, cleared, or disabled at runtime.

## Engineering approach

The project wraps the browser’s existing console functions, retains references to the originals, and mirrors output into a generated DOM interface. The library can create its own container or use one supplied by the application.

Keeping the project in one readable JavaScript file is an intentional product decision: log2div is meant to be useful precisely in environments where installing and running a toolchain may be difficult.

## What I learned

Constraints can reveal useful products. Developing on an iPad initially looked like a limitation specific to my setup, but the underlying problem applies anywhere browser developer tools are unavailable or inconvenient.

The next version will focus on a clearer API, better mobile ergonomics, compact display options, timestamps, filtering, and stronger documentation.
