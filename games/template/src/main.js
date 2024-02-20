// Initialize console first. Do it here so that we can capture any console messages that happen during startup.
import ConsolePlugin from './plugins/ConsolePlugin.js';
(() => {
  console.info("Initializing console plugin...");
  ConsolePlugin.initialize();
  console.info("Console plugin initialized.");
})();

import { config } from './config/config.js';
import Globals from './globals.js';
import Scenes from './scenes/Scenes.js';
import { getConsolePlugin } from './plugins/pluginshelpers.js'

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

/**
 * Handle the keydown event.
 * @param {KeyboardEvent} event The event.
 */
async function handleKeydown(event) {
  // CTRL-D shows the console.
  if ((event.code == "KeyD") && (event.ctrlKey)) {
    // Make sure we have a console plugin to work with, and then toggle it.
    const consolePlugin = getConsolePlugin();
    if (consolePlugin) { consolePlugin.toggle(); }
  }
}

const channel = ('BroadcastChannel' in self) ? new BroadcastChannel('sw-messages') : undefined;

(() => {
  console.info("Main starting...");

  // See if the browser supports service workers.
  if ('serviceWorker' in navigator) {
    console.info("Service worker is in navigator.");
    window.addEventListener('load', () => {
      console.info("Registering service worker.");
      navigator.serviceWorker.register('service-worker.js').then((registration) => {
        console.info('Service worker registration successful.');
      }, function(err) {
        console.error('Service worker registration failed!', err);
      });
    });

    if (channel) {
      channel.addEventListener('message', event => {
        console.log("WHAT????????????");
        console.log('Received', event.data);
      });
    }
  } else {
    console.info('No service worker support in this browser.');
  }

  // Listen out for things.
  window.addEventListener('resize', resize);
  window.addEventListener("keydown", handleKeydown, false);
})();
