import { config } from './config/config.js';
import ConsolePlugin from './plugins/ConsolePlugin.js';

// If the console plugin is enabled then initialize it. We do not want to do it otherwise.
if (config.isGlobalPluginEnabled("ConsolePlugin")) {
  // Initialize console first. Do it here so that we can capture any console messages that happen during startup.
  (() => { ConsolePlugin.initialize(); })();
}

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

  // TODO: Put this somewhere better.

  if ((event.code == "KeyE") && (event.ctrlKey)) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        console.log("doing the deed");
        registration.active.postMessage({ type: "clearcache" });
      });
    }
  }
}

(() => {
  // See if the browser supports service workers.
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').then((registration) => {
        console.info('Service worker registration successful.');
      }, function(err) {
        console.error('Service worker registration failed!', err);
      });

      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data) {
          if (typeof event.data === 'string') {
            console.log(`The service worker sent me a message: ${event.data}`);
          } else if ((event.data.type === "cache") && (event.data.message)) {
            console.log(`Service worker cache message: ${event.data.message}`);
          }
        }
      });

      navigator.serviceWorker.ready.then(registration => {
        registration.active.postMessage({ type: "initialize" });
      });
    });
  } else {
    console.info('No service worker support in this browser.');
  }

  // Listen out for things.
  window.addEventListener('resize', resize);
  window.addEventListener("keydown", handleKeydown, false);
})();
