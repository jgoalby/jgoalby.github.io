// Initialize the console log div first.
import { initConsoleLogDiv, clearConsoleLogDiv, copyLogDiv } from './lib/console-log-div.js'
(() => { initConsoleLogDiv(); })();

import { config } from './config/config.js';
import Globals from './globals.js';
import Scenes from './scenes/Scenes.js';

export default class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.globals = Globals.create();
    Scenes.create(this);
  }
}

// Create the global game instance.
window.game = new Game();

// Called on every resize event.
function resize() {
  // The current width and height.
  var w = window.innerWidth;   
  var h = window.innerHeight;

  // Save the current width and height for the next event.
  window.innerWidthPrevious = w;
  window.innerHeightPrevious = h;

  // Resize, and set a timer to check again very soon.
  window.game.scale.resize(w, h);
  window.setTimeout(onResizeTimeout, 5);
}

// Called after a short timeout for the case of iPad strange behavior.
function onResizeTimeout() {
  // The current width and height.
  var w = window.innerWidth;   
  var h = window.innerHeight;

  // The previous width and height.
  var wPrev = window.innerWidthPrevious;
  var hPrev = window.innerHeightPrevious;

  // If the values are the same then do nothing. If they are not the same that means they were changed
  // during the short timeout. This happens occasionally on iPads.
  if (wPrev === w && hPrev === h) { return; }

  // We need to do a resize because the values are different.
  window.game.scale.resize(w, h);
}

(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then((registration) => {
      console.info('Service worker registration successful.');
    }, function(err) {
        console.error('Service worker registration failed!', err);
      });
    });
  } else {
    console.info('No service worker support in this browser.');
  }

  window.addEventListener('resize', resize);

  window.addEventListener("keydown", (event) => {
    if ((event.code == "KeyD") && (event.ctrlKey)) {
      var elem = document.getElementById("console-log-div");
      if (elem.style.display === "block") {
        elem.style.display = "none";
      } else {
        elem.style.display = "block";
      }
    } else if ((event.code == "KeyE") && (event.ctrlKey)) {
      clearConsoleLogDiv();
    } else if ((event.code == "KeyW") && (event.ctrlKey)) {
      let logMessages = copyLogDiv();
      alert(logMessages);
    }
  }, false);
})();
