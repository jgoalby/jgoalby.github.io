import { phaserConfig, generalConfig } from './config/config.js';
import ConsolePlugin from './plugins/ConsolePlugin.js';

async function chatCompletions(token, body) {
  console.log("Before fetch");

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  console.log("After fetch");

  return response;
};

const template = `You are a helpful assistant.".

Question: {QUERY}

Answer: `;

const getPrompt = (query) => {
  return template.replace('{QUERY}', query);
};

const prompt = getPrompt('What is an LLM?');

// If the console plugin is enabled then initialize it. We do not want to do it otherwise.
if (phaserConfig.isGlobalPluginEnabled("ConsolePlugin")) {
  // Initialize console first. Do it here so that we can capture any console messages that happen during startup.
  (() => { ConsolePlugin.initialize(); })();
}

import Globals from './globals.js';
import Scenes from './scenes/Scenes.js';
import { getCachePlugin, getConsolePlugin } from './plugins/PluginsHelpers.js'
import Constants from './constants.js';

// Create the game!
export default class Game extends Phaser.Game {
  constructor() {
    super(phaserConfig);
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

import { doSomeTests } from './common.js'

/**
 * Handle the keydown event.
 * @param {KeyboardEvent} event The event.
 */
async function handleKeydown(event) {
  // CTRL-D shows the console.
  if ((event.code == "KeyD") && (event.ctrlKey)) {
    // Make sure we have a console plugin to work with, and then toggle it.
    //const consolePlugin = getConsolePlugin();
    //if (consolePlugin) { consolePlugin.toggle(); }

    console.log("In handleKeydown");
    console.log(window.game.globals.player);

    const messages = [];
    messages.push({
      role: 'user',
      content: prompt,
    });

    const response = await chatCompletions({
      token: window.game.globals.player,
      body: {
        model: 'gpt-3.5-turbo',
        messages,
      },
    });

    const data = await response.json();
    const text = data.choices[0].message.content;

    console.log(text);

    doSomeTests();

    // TODO: Somehow we will need to know the base URL.

    console.log("FFS 1");

    // TODO: Put in constants.
    const cacheName = "cache-v1";

    let cachedResponse = undefined;
    let cacheKeyStr = "";

    try {
      const cache = await window.caches.open(cacheName);
      cachedResponse = await cache.match('https://www.goalby.org/games/template/src/common.js');
      const cacheKeys = await cache.keys();
      for (let i = 0; i < cacheKeys.length; i++) {
        cacheKeyStr += cacheKeys[i].url + " | ";
      }
    } catch (error) {
      // Oh dear, there was an issue.
      cachedResponse = undefined;
    }

    console.log("MAIN NUM 3!!! " + cacheKeyStr);

    if (cachedResponse) {
      const text = await cachedResponse.text();
      console.log("MAIN 5: " + text);
    } else {
      console.log("MAIN NOT FOUND 2!!!");
    }
  }
}

(() => {
  // See if the browser supports service workers.
  if ('serviceWorker' in navigator) {
    // Once the page is loaded, register the service worker.
    window.addEventListener('load', () => {
      // Register the service worker.
      navigator.serviceWorker.register('service-worker.js').then((registration) => {
        console.info('Service worker registration successful.');
      }, function(err) {
        // The service worker can fail for numerous reasons. This is async so nothing to do here.
        console.error('Service worker registration failed!', err);
      });

      // Get the cache plugin.
      const cachePlugin = getCachePlugin();

      // These are messages received from the service worker.
      navigator.serviceWorker.addEventListener('message', event => {
        // Sanity check.
        if (event.data) {
          console.log("***** WE got an event: " + event.data.type + " *****");
          // Messages can be a string type or object type.
          if (typeof event.data === 'string') {
            // console.log(`The service worker sent a message: ${event.data}`);
          } else if (event.data.type === Constants.SW_EVENTS.CACHE_MESSAGE) {
            if (cachePlugin) {
              // Have the cache plugin log the cache hit or miss.
              cachePlugin.logCacheMessage(event.data.cacheHit, event.data.requestURL);
            }
          }
        }
      });

      // Once the service worker is ready, send it a message to initialize.
      navigator.serviceWorker.ready.then(registration => {
        // Message to initialize the service worker with us.
        registration.active.postMessage({ type: Constants.SW_EVENTS.INIT });

        // No point capturing cache messages if we don't have a cache plugin.
        if (cachePlugin) {
          // Message to set whether we want to receive cache messages.
          registration.active.postMessage({ type: Constants.SW_EVENTS.CONFIG, sendCacheMessages: generalConfig.sendCacheMessages });
        }
      });
    });
  } else {
    console.info('No service worker support in this browser.');
  }

  // Listen out for things.
  window.addEventListener('resize', resize);
  window.addEventListener("keydown", handleKeydown, false);
})();
