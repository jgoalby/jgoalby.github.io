// Initialize console first. Do it here so that we can capture any console messages that happen during startup.
import consolePlugin from './plugins/ConsolePlugin.js';
(() => { consolePlugin.initialize(); })();

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

async function showConsole(event) {
  // We need to use the console plugin rather than accessing the console provider directly.
  const consolePlugin = window.game.plugins.get('ConsolePlugin');

  // If the console plugin is not available then do nothing.
  if (consolePlugin === undefined) { return; }

  // CTRL-D shows the console.
  if ((event.code == "KeyD") && (event.ctrlKey)) { consolePlugin.toggle(); }
}

(() => {
  // Test console message.
  console.log("This is %i %s", 1, "log message.");
  console.log("This is %ca red message", "color: red;");
  console.log("This is %ca %s message", "color: red;", "red");
  console.log("This message is repeated");
  console.log("This message is repeated");
  console.log("This message is repeated");
  console.log("This is %ca red message %cand this is blue", "color: red; font-size: 20px;", "color: blue; font-size: 15px;");
  console.error("This message is repeated");
  console.error("This message is repeated");
  console.log("This is a long message with some Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio tempor. More lorem ispsum goes here if we need it to be here.");

  // See if the browser supports service workers.
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
  window.addEventListener("keydown", showConsole, false);
})();
