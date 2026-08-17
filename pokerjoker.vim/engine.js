(function () {
  "use strict";

  var SUITS = ["hearts", "diamonds", "clubs", "spades"];
  var RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  var MARKS = { hearts: "♥", diamonds: "♦", clubs: "♣", spades: "♠" };
  var BASE = {
    "Straight Flush": [100, 8],
    "Four of a Kind": [60, 7],
    "Full House": [40, 4],
    Flush: [35, 4],
    Straight: [30, 4],
    "Three of a Kind": [30, 3],
    "Two Pair": [20, 2],
    Pair: [10, 2],
    "High Card": [5, 1]
  };

  function shuffle(items, seed) {
    var output = items.slice();
    var value = seed || 1;
    function random() {
      value = (value * 1664525 + 1013904223) >>> 0;
      return value / 4294967296;
    }
    for (var index = output.length - 1; index > 0; index -= 1) {
      var target = Math.floor(random() * (index + 1));
      var held = output[index];
      output[index] = output[target];
      output[target] = held;
    }
    return output;
  }

  function deck(seed) {
    var cards = [];
    SUITS.forEach(function (suit) {
      RANKS.forEach(function (rank, index) {
        cards.push({
          id: suit + "-" + rank,
          suit: suit,
          rank: rank,
          value: index + 2,
          mark: MARKS[suit]
        });
      });
    });
    return shuffle(cards, seed);
  }

  function isStraight(cards) {
    if (cards.length !== 5) return false;
    var values = cards.map(function (card) { return card.value; })
      .filter(function (value, index, all) { return all.indexOf(value) === index; })
      .sort(function (a, b) { return a - b; });
    return values.length === 5 && (values[4] - values[0] === 4 || values.join(",") === "2,3,4,5,14");
  }

  function evaluate(cards) {
    var counts = {};
    cards.forEach(function (card) {
      (counts[card.value] || (counts[card.value] = [])).push(card);
    });
    var groups = Object.keys(counts).map(function (key) { return counts[key]; })
      .sort(function (a, b) { return b.length - a.length || b[0].value - a[0].value; });
    var flush = cards.length === 5 && cards.every(function (card) { return card.suit === cards[0].suit; });
    var run = isStraight(cards);
    var name = "High Card";
    var scoring = [];

    if (flush && run) { name = "Straight Flush"; scoring = cards; }
    else if (groups[0] && groups[0].length === 4) { name = "Four of a Kind"; scoring = groups[0]; }
    else if (groups[0] && groups[0].length === 3 && groups[1] && groups[1].length === 2) { name = "Full House"; scoring = groups[0].concat(groups[1]); }
    else if (flush) { name = "Flush"; scoring = cards; }
    else if (run) { name = "Straight"; scoring = cards; }
    else if (groups[0] && groups[0].length === 3) { name = "Three of a Kind"; scoring = groups[0]; }
    else {
      var pairs = groups.filter(function (group) { return group.length === 2; });
      if (pairs.length > 1) { name = "Two Pair"; scoring = pairs[0].concat(pairs[1]); }
      else if (pairs.length === 1) { name = "Pair"; scoring = pairs[0]; }
      else if (cards.length) { scoring = [cards.slice().sort(function (a, b) { return b.value - a.value; })[0]]; }
    }

    var chips = BASE[name][0] + scoring.reduce(function (sum, card) {
      return sum + Math.min(card.value, 10) + (card.rank === "A" ? 1 : 0);
    }, 0);
    return { name: name, chips: chips, mult: BASE[name][1], total: chips * BASE[name][1], scoring: scoring };
  }

  window.PJ4Engine = Object.freeze({ deck: deck, evaluate: evaluate, base: BASE, marks: MARKS });
}());
