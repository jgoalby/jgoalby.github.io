(function () {
  "use strict";

  var TARGET_SCORE = 300;
  var HAND_SIZE = 8;
  var MAX_SELECTION = 5;
  var JOKER_MULT = 4;
  var TARGET_LABELS = {
    h: "hearts", d: "diamonds", c: "clubs", s: "spades", f: "face cards",
    r: "red cards", b: "black cards", "*": "all cards", "0": "tens",
    "2": "twos", "3": "threes", "4": "fours", "5": "fives", "6": "sixes",
    "7": "sevens", "8": "eights", "9": "nines", j: "jacks", q: "queens", k: "kings", a: "aces"
  };
  var COMMAND_TARGETS = {
    hearts: "h", heart: "h", diamonds: "d", diamond: "d", clubs: "c", club: "c",
    spades: "s", spade: "s", faces: "f", face: "f", red: "r", black: "b", all: "*",
    tens: "0", ten: "0", "10": "0", twos: "2", threes: "3", fours: "4", fives: "5",
    sixes: "6", sevens: "7", eights: "8", nines: "9", jacks: "j", queens: "q",
    kings: "k", aces: "a", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6",
    "7": "7", "8": "8", "9": "9", j: "j", q: "q", k: "k", a: "a", "*": "*"
  };
  var SUIT_PRIORITY = { spades: 0, hearts: 1, clubs: 2, diamonds: 3 };

  var state;
  var refs = {};

  function sortCards(cards, by) {
    return cards.sort(function (a, b) {
      if (by === "suit") return SUIT_PRIORITY[a.suit] - SUIT_PRIORITY[b.suit] || b.value - a.value;
      return b.value - a.value || SUIT_PRIORITY[a.suit] - SUIT_PRIORITY[b.suit];
    });
  }

  function freshState(seed) {
    var deck = window.PJ4Engine.deck(seed);
    var hand = sortCards(deck.slice(0, HAND_SIZE), "rank");
    return {
      seed: seed,
      deck: deck,
      drawIndex: HAND_SIZE,
      hand: hand,
      sortBy: "rank",
      cursor: 0,
      selected: [],
      selectionUndo: [],
      score: 0,
      hands: 4,
      discards: 3,
      phase: "play",
      mode: "normal",
      pending: "",
      count: "",
      command: "",
      visualAnchor: null,
      visualCurrent: null,
      lastAction: null,
      keyTrail: [],
      history: ["round initialized", "blind target: 300 chips"],
      message: "Press ? for the manual, or begin with h / l / Space.",
      messageKind: "INFO",
      manual: false,
      turn: 1
    };
  }

  function cacheRefs() {
    ["progress", "score", "hands", "discards", "deck", "selected", "hand-name", "chips", "mult",
      "total", "cards", "position", "message-kind", "message", "context-title", "context-copy", "pending",
      "history", "mode", "keystrokes", "sort", "turn", "percent", "prompt", "command", "manual", "announcer"
    ].forEach(function (name) {
      refs[name] = document.querySelector("[data-" + name + "]");
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char];
    });
  }

  function setText(name, value) {
    if (refs[name]) refs[name].textContent = value;
  }

  function selectedCards() {
    return state.hand.filter(function (card) { return state.selected.indexOf(card.id) !== -1; });
  }

  function visualIndexes() {
    if (state.mode !== "visual" || state.visualAnchor === null) return [];
    var start = Math.min(state.visualAnchor, state.visualCurrent);
    var end = Math.max(state.visualAnchor, state.visualCurrent);
    var result = [];
    for (var index = start; index <= end; index += 1) result.push(index);
    return result;
  }

  function previewCards() {
    if (state.mode === "visual") {
      return visualIndexes().slice(0, MAX_SELECTION).map(function (index) { return state.hand[index]; });
    }
    return selectedCards();
  }

  function cardDescription(card) {
    var ranks = { J: "jack", Q: "queen", K: "king", A: "ace" };
    return (ranks[card.rank] || card.rank) + " of " + card.suit;
  }

  function renderCards(scoringIds) {
    var visual = visualIndexes();
    refs.cards.innerHTML = state.hand.map(function (card, index) {
      var selected = state.selected.indexOf(card.id) !== -1;
      var cursor = index === state.cursor;
      var range = visual.indexOf(index) !== -1;
      var scoring = scoringIds.indexOf(card.id) !== -1;
      var classes = ["card", (card.suit === "hearts" || card.suit === "diamonds") ? "red" : "black"];
      if (selected) classes.push("selected");
      if (cursor) classes.push("cursor");
      if (range) classes.push("visual");
      if (scoring) classes.push("scoring");
      return '<div class="' + classes.join(" ") + '" role="listitem" aria-label="' +
        escapeHtml(cardDescription(card)) + (selected ? ", selected" : "") + (cursor ? ", cursor" : "") + '">' +
        '<span class="index">' + String(index + 1).padStart(2, "0") + '</span>' +
        '<span class="flag">' + (selected ? "+" : " ") + '</span>' +
        '<strong>' + escapeHtml(card.rank.padStart(2, " ")) + card.mark + '</strong>' +
        '<span class="cursor-mark">' + (cursor ? "^^" : "  ") + '</span></div>';
    }).join("");
    var current = state.hand[state.cursor];
    setText("position", "card " + (state.cursor + 1) + " of " + state.hand.length + " · " + cardDescription(current));
  }

  function context() {
    if (state.manual) return { title: "HELP BUFFER", copy: "The manual has focus. Press ? or Esc to return.", pending: ":help" };
    if (state.mode === "command") return { title: "COMMAND MODE", copy: "Type a command, then press Enter. Backspace edits; Esc cancels.", pending: ":" + state.command };
    if (state.mode === "visual") return { title: "VISUAL MODE", copy: "Extend the range with h/l. Space keeps it; d discards it; p plays it.", pending: "range " + (visualIndexes()[0] + 1) + "…" + (visualIndexes().slice(-1)[0] + 1) };
    if (state.pending === "s" || state.pending === "S") return { title: "SELECT TARGET", copy: "Choose a suit, rank, color, face cards, or all. Uppercase S replaces the current selection.", pending: state.pending + "{h d c s f r b 2…9 0 j q k a *}" };
    if (state.pending === "d") return { title: "DISCARD TARGET", copy: "Press d for the current selection, or choose a group to discard immediately.", pending: "d{d h c s f r b 2…9 0 j q k a *}" };
    if (state.pending === "g") return { title: "GO TO", copy: "Complete gg to move to the first card.", pending: "g_" };
    if (state.count) return { title: "COUNT", copy: "Apply the count to h, l, or x.", pending: state.count + "_" };
    return { title: "NORMAL MODE", copy: "Move, compose a hand, then play it. Commands appear here as you type.", pending: "ready" };
  }

  function render() {
    var cards = previewCards();
    var result = cards.length ? window.PJ4Engine.evaluate(cards) : null;
    var scoringIds = result ? result.scoring.map(function (card) { return card.id; }) : [];
    renderCards(scoringIds);
    setText("score", state.score.toLocaleString());
    setText("hands", state.hands);
    setText("discards", state.discards);
    setText("deck", Math.max(0, state.deck.length - state.drawIndex));
    setText("selected", state.mode === "visual" ? Math.min(visualIndexes().length, MAX_SELECTION) : state.selected.length);
    setText("hand-name", result ? result.name.toUpperCase() : "— NO SELECTION —");
    setText("chips", result ? result.chips : 0);
    setText("mult", result ? result.mult + JOKER_MULT : 0);
    setText("total", result ? (result.chips * (result.mult + JOKER_MULT)).toLocaleString() : 0);
    setText("message-kind", state.messageKind);
    setText("message", state.message);
    setText("mode", "-- " + (state.manual ? "HELP" : state.mode.toUpperCase()) + " --");
    setText("keystrokes", state.keyTrail.length ? state.keyTrail.join(" ") : '"game" 1L, 8C');
    setText("sort", "SORT:" + state.sortBy.toUpperCase());
    setText("turn", "HAND " + Math.min(state.turn, 4) + "/4");
    setText("percent", Math.min(100, Math.floor(state.score / TARGET_SCORE * 100)) + "%");
    refs.progress.style.width = Math.min(100, state.score / TARGET_SCORE * 100) + "%";
    refs.manual.hidden = !state.manual;

    var currentContext = context();
    setText("context-title", currentContext.title);
    setText("context-copy", currentContext.copy);
    setText("pending", currentContext.pending);
    setText("prompt", state.mode === "command" ? ":" : state.pending || (state.count ? state.count : ":"));
    setText("command", state.mode === "command" ? state.command : "");
    refs.history.innerHTML = state.history.slice(-6).reverse().map(function (line) {
      return "<li>" + escapeHtml(line) + "</li>";
    }).join("");
    document.body.dataset.mode = state.manual ? "help" : state.mode;
  }

  function trail(key) {
    var label = key === " " ? "␠" : key === "Enter" ? "↵" : key;
    state.keyTrail.push("[" + label + "]");
    if (state.keyTrail.length > 7) state.keyTrail.shift();
  }

  function notify(message, kind, addToHistory) {
    state.message = message;
    state.messageKind = kind || "INFO";
    refs.announcer.textContent = message;
    if (addToHistory !== false) {
      state.history.push(message);
      if (state.history.length > 30) state.history.shift();
    }
  }

  function rememberSelection() {
    state.selectionUndo.push(state.selected.slice());
    if (state.selectionUndo.length > 20) state.selectionUndo.shift();
  }

  function setSelection(cards, replace, label) {
    rememberSelection();
    var ids = replace ? [] : state.selected.slice();
    cards.forEach(function (card) {
      if (ids.length < MAX_SELECTION && ids.indexOf(card.id) === -1) ids.push(card.id);
    });
    state.selected = ids;
    var truncated = cards.length > MAX_SELECTION || (!replace && cards.some(function (card) { return ids.indexOf(card.id) === -1; }));
    notify((replace ? "selected " : "added ") + label + " · " + state.selected.length + "/5" + (truncated ? " · capped at five" : ""), "SELECT");
  }

  function cardsMatching(target) {
    var rankMap = { "0": "10", j: "J", q: "Q", k: "K", a: "A" };
    return state.hand.filter(function (card) {
      if (target === "h" || target === "d" || target === "c" || target === "s") {
        return card.suit === { h: "hearts", d: "diamonds", c: "clubs", s: "spades" }[target];
      }
      if (target === "f") return ["J", "Q", "K"].indexOf(card.rank) !== -1;
      if (target === "r") return card.suit === "hearts" || card.suit === "diamonds";
      if (target === "b") return card.suit === "clubs" || card.suit === "spades";
      if (target === "*") return true;
      return card.rank === (rankMap[target] || target);
    });
  }

  function validTarget(key) {
    return Object.prototype.hasOwnProperty.call(TARGET_LABELS, key);
  }

  function toggleAt(index) {
    var card = state.hand[index];
    if (!card) return;
    rememberSelection();
    var selectedIndex = state.selected.indexOf(card.id);
    if (selectedIndex !== -1) {
      state.selected.splice(selectedIndex, 1);
      notify("unselected " + card.rank + card.mark, "SELECT", false);
    } else if (state.selected.length < MAX_SELECTION) {
      state.selected.push(card.id);
      notify("selected " + card.rank + card.mark + " · " + state.selected.length + "/5", "SELECT", false);
    } else {
      notify("selection unchanged · five-card maximum", "ERROR");
    }
  }

  function toggleRange(count) {
    var amount = Math.max(1, count || 1);
    for (var offset = 0; offset < amount; offset += 1) {
      toggleAt(Math.min(state.cursor + offset, state.hand.length - 1));
    }
    state.lastAction = { type: "toggleRange", count: amount };
  }

  function move(delta, count) {
    state.cursor = Math.max(0, Math.min(state.hand.length - 1, state.cursor + delta * Math.max(1, count || 1)));
    if (state.mode === "visual") state.visualCurrent = state.cursor;
    notify("cursor → " + (state.cursor + 1) + " · " + cardDescription(state.hand[state.cursor]), "MOVE", false);
  }

  function startVisual() {
    state.mode = "visual";
    state.visualAnchor = state.cursor;
    state.visualCurrent = state.cursor;
    state.pending = "";
    state.count = "";
    notify("visual selection started at card " + (state.cursor + 1), "VISUAL", false);
  }

  function leaveVisual(message) {
    state.mode = "normal";
    state.visualAnchor = null;
    state.visualCurrent = null;
    if (message) notify(message, "INFO", false);
  }

  function commitVisual() {
    var cards = visualIndexes().slice(0, MAX_SELECTION).map(function (index) { return state.hand[index]; });
    setSelection(cards, false, "visual range");
    leaveVisual();
    state.lastAction = { type: "visualSelect", size: cards.length };
  }

  function drawReplacement(ids) {
    var cursorIndex = state.cursor;
    var cursorId = state.hand[state.cursor].id;
    state.hand = state.hand.map(function (card) {
      if (ids.indexOf(card.id) === -1) return card;
      var next = state.deck[state.drawIndex];
      state.drawIndex += 1;
      return next || card;
    });
    sortCards(state.hand, state.sortBy);
    state.selected = [];
    state.selectionUndo = [];
    var preservedCursor = state.hand.findIndex(function (card) { return card.id === cursorId; });
    state.cursor = preservedCursor === -1 ? Math.min(cursorIndex, state.hand.length - 1) : preservedCursor;
  }

  function finishIfNeeded() {
    if (state.score >= TARGET_SCORE) {
      state.phase = "won";
      notify("BLIND CLEARED · " + state.score.toLocaleString() + " chips · press r for a new round", "WIN");
      return true;
    }
    if (state.hands <= 0) {
      state.phase = "lost";
      notify("ROUND OVER · " + (TARGET_SCORE - state.score) + " chips short · press r to retry", "LOSS");
      return true;
    }
    return false;
  }

  function playCards(cards, remember) {
    if (state.phase !== "play") { notify("round is complete · press r to restart", "ERROR"); return false; }
    if (!cards.length) { notify("nothing selected · use Space, v, or s{target}", "ERROR"); return false; }
    var chosen = cards.slice(0, MAX_SELECTION);
    var result = window.PJ4Engine.evaluate(chosen);
    var points = result.chips * (result.mult + JOKER_MULT);
    state.score += points;
    state.hands -= 1;
    state.turn += 1;
    drawReplacement(chosen.map(function (card) { return card.id; }));
    notify(result.name.toUpperCase() + " · " + result.chips + " × " + (result.mult + JOKER_MULT) + " = " + points + " chips", "SCORE");
    if (remember !== false) state.lastAction = { type: "play" };
    finishIfNeeded();
    return true;
  }

  function discardCards(cards, label, remember) {
    if (state.phase !== "play") { notify("round is complete · press r to restart", "ERROR"); return false; }
    if (!state.discards) { notify("no discards remain", "ERROR"); return false; }
    if (!cards.length) { notify("discard matched no cards", "ERROR"); return false; }
    var chosen = cards.slice(0, MAX_SELECTION);
    drawReplacement(chosen.map(function (card) { return card.id; }));
    state.discards -= 1;
    notify("discarded " + chosen.length + " " + label + " · " + state.discards + " discards remain", "DISCARD");
    if (remember !== false) state.lastAction = { type: "discard", target: label, ids: null };
    return true;
  }

  function discardTarget(target, remember) {
    var cards = cardsMatching(target);
    var success = discardCards(cards, TARGET_LABELS[target], false);
    if (success && remember !== false) state.lastAction = { type: "discardTarget", target: target };
    return success;
  }

  function discardSelected(remember) {
    var cards = selectedCards();
    var success = discardCards(cards.length ? cards : [state.hand[state.cursor]], cards.length ? "selected cards" : "card under cursor", false);
    if (success && remember !== false) state.lastAction = { type: "discardSelected" };
    return success;
  }

  function restart() {
    var nextSeed = state.seed + 997;
    state = freshState(nextSeed);
    notify("new round · seed " + nextSeed + " · reach 300 chips", "INFO");
  }

  function sortHand(by) {
    var currentId = state.hand[state.cursor].id;
    state.sortBy = by;
    sortCards(state.hand, by);
    state.cursor = state.hand.findIndex(function (card) { return card.id === currentId; });
    notify("hand sorted by " + by, "SORT");
    state.lastAction = { type: "sort", by: by };
  }

  function repeatLast() {
    var action = state.lastAction;
    if (!action) { notify("nothing to repeat", "ERROR"); return; }
    if (action.type === "toggleRange") toggleRange(action.count);
    else if (action.type === "groupSelect") selectTarget(action.target, action.replace, false);
    else if (action.type === "discardTarget") discardTarget(action.target, false);
    else if (action.type === "discardSelected") discardSelected(false);
    else if (action.type === "play") playCards(selectedCards(), false);
    else if (action.type === "sort") sortHand(action.by);
    else notify("last action cannot be repeated here", "ERROR");
  }

  function selectTarget(target, replace, remember) {
    var cards = cardsMatching(target);
    if (!cards.length) { notify("no " + TARGET_LABELS[target] + " in hand", "ERROR"); return false; }
    setSelection(cards, replace, TARGET_LABELS[target]);
    if (remember !== false) state.lastAction = { type: "groupSelect", target: target, replace: replace };
    return true;
  }

  function resolveTargetWord(word) {
    return COMMAND_TARGETS[String(word || "").toLowerCase()] || null;
  }

  function executeCommand(raw) {
    var command = raw.trim().replace(/^:/, "");
    var parts = command.toLowerCase().split(/\s+/).filter(Boolean);
    var verb = parts[0] || "";
    var argument = parts.slice(1).join(" ");
    state.mode = "normal";
    state.command = "";
    if (!verb) { notify("command cancelled", "INFO", false); return; }

    if (verb === "select" || verb === "add") {
      var selectTargetKey = resolveTargetWord(argument);
      if (!selectTargetKey) notify("unknown target · try :select hearts or :select faces", "ERROR");
      else selectTarget(selectTargetKey, verb === "select", true);
    } else if (verb === "discard" || verb === "d") {
      if (!argument || argument === "selected") discardSelected(true);
      else {
        var discardTargetKey = resolveTargetWord(argument);
        if (!discardTargetKey) notify("unknown target · try :discard hearts", "ERROR");
        else discardTarget(discardTargetKey, true);
      }
    } else if (verb === "play" || verb === "p") playCards(selectedCards(), true);
    else if (verb === "clear") {
      rememberSelection(); state.selected = []; notify("selection cleared", "SELECT");
    } else if (verb === "sort" && (argument === "rank" || argument === "suit")) sortHand(argument);
    else if (verb === "restart" || verb === "new") restart();
    else if (verb === "help" || verb === "bindings") { state.manual = true; notify("manual opened", "INFO", false); }
    else if (verb === "normal" || verb === "q") notify("normal mode", "INFO", false);
    else notify("not an editor command: " + command, "ERROR");
  }

  function handleCommandKey(event) {
    if (event.key === "Escape") {
      state.mode = "normal"; state.command = ""; notify("command cancelled", "INFO", false); return;
    }
    if (event.key === "Enter") { executeCommand(state.command); return; }
    if (event.key === "Backspace") { state.command = state.command.slice(0, -1); return; }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) state.command += event.key;
  }

  function handleVisualKey(event) {
    var key = event.key;
    var count = Number(state.count || 1);
    if (/^[1-9]$/.test(key)) { state.count += key; return; }
    if (key === "h" || key === "ArrowLeft") move(-1, count);
    else if (key === "l" || key === "ArrowRight") move(1, count);
    else if (key === " " || key === "x" || key === "y") commitVisual();
    else if (key === "d") {
      var discardRange = previewCards();
      leaveVisual();
      discardCards(discardRange, "visual cards", true);
    } else if (key === "p" || key === "Enter") {
      var playRange = previewCards();
      leaveVisual();
      playCards(playRange, true);
    } else if (key === "Escape" || key === "v") leaveVisual("visual selection cancelled");
    else notify("key has no visual-mode mapping: " + key, "ERROR", false);
    state.count = "";
  }

  function handlePending(key) {
    var operator = state.pending;
    state.pending = "";
    if (operator === "g") {
      if (key === "g") { state.cursor = 0; notify("cursor → first card", "MOVE", false); }
      else notify("expected g after g", "ERROR", false);
      return;
    }
    if (operator === "d" && key === "d") { discardSelected(true); return; }
    if (!validTarget(key.toLowerCase())) {
      notify("unknown target " + key + " after " + operator, "ERROR");
      return;
    }
    if (operator === "d") discardTarget(key.toLowerCase(), true);
    else selectTarget(key.toLowerCase(), operator === "S", true);
  }

  function handleNormalKey(event) {
    var key = event.key;
    if (state.pending) { handlePending(key); state.count = ""; return; }
    if (/^[1-9]$/.test(key)) { state.count += key; return; }
    if (key === "0" && state.count) { state.count += "0"; return; }
    var count = Number(state.count || 1);
    state.count = "";

    if (key === "h" || key === "ArrowLeft") move(-1, count);
    else if (key === "l" || key === "ArrowRight") move(1, count);
    else if (key === "0" || key === "Home") { state.cursor = 0; notify("cursor → first card", "MOVE", false); }
    else if (key === "$" || key === "End" || key === "G") { state.cursor = state.hand.length - 1; notify("cursor → last card", "MOVE", false); }
    else if (key === "g") state.pending = "g";
    else if (key === " " || key === "x") toggleRange(count);
    else if (key === "v") startVisual();
    else if (key === "s" || key === "S" || key === "d") state.pending = key;
    else if (key === "p" || key === "Enter") playCards(selectedCards(), true);
    else if (key === "c") { rememberSelection(); state.selected = []; notify("selection cleared", "SELECT"); }
    else if (key === "u") {
      if (state.selectionUndo.length) { state.selected = state.selectionUndo.pop(); notify("selection restored · " + state.selected.length + "/5", "UNDO"); }
      else notify("already at oldest selection", "ERROR", false);
    } else if (key === ".") repeatLast();
    else if (key === "r") restart();
    else if (key === "?") { state.manual = true; notify("manual opened", "INFO", false); }
    else if (key === ":") { state.mode = "command"; state.command = ""; notify("command mode", "COMMAND", false); }
    else if (key === "Escape") { state.pending = ""; state.count = ""; notify("normal mode", "INFO", false); }
    else if (!event.metaKey && !event.ctrlKey && !event.altKey && key.length === 1) notify("unmapped key: " + key + " · press ? for help", "ERROR", false);
  }

  function shouldCapture(event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return false;
    if (["Shift", "Control", "Alt", "Meta", "CapsLock"].indexOf(event.key) !== -1) return false;
    return ["Tab", "F5", "F12"].indexOf(event.key) === -1;
  }

  function onKeyDown(event) {
    if (!shouldCapture(event)) return;
    event.preventDefault();
    trail(event.key);
    if (state.manual) {
      if (event.key === "?" || event.key === "Escape") {
        state.manual = false;
        notify("manual closed · normal mode", "INFO", false);
      }
      render();
      return;
    }
    if (state.mode === "command") handleCommandKey(event);
    else if (state.mode === "visual") handleVisualKey(event);
    else handleNormalKey(event);
    render();
  }

  function snapshot() {
    return JSON.parse(JSON.stringify({
      seed: state.seed, hand: state.hand, cursor: state.cursor, selected: state.selected,
      score: state.score, hands: state.hands, discards: state.discards, phase: state.phase,
      mode: state.mode, pending: state.pending, command: state.command, sortBy: state.sortBy, history: state.history
    }));
  }

  function dispatchKey(key, extras) {
    var event = Object.assign({ key: key, preventDefault: function () {}, metaKey: false, ctrlKey: false, altKey: false }, extras || {});
    onKeyDown(event);
  }

  function boot(seed) {
    cacheRefs();
    state = freshState(seed || 20260417);
    document.addEventListener("keydown", onKeyDown);
    document.body.focus();
    render();
  }

  window.PJ4App = Object.freeze({ boot: boot, dispatchKey: dispatchKey, snapshot: snapshot, executeCommand: executeCommand });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { boot(); });
  else boot();
}());
