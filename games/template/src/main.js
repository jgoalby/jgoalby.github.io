import { phaserConfig } from './config/config.js';
import ConsolePlugin from './plugins/ConsolePlugin.js';
import ServiceWorkerPlugin from './plugins/ServiceWorkerPlugin.js';

(() => {
  // If the console plugin is enabled then initialize it. We do not want to do it otherwise.
  if (phaserConfig.isGlobalPluginEnabled(Constants.PLUGIN_INFO.CONSOLE_KEY)) {
    // Initialize console first. Do it here so that we can capture any console messages that happen during startup.
    ConsolePlugin.initialize();
  }

  // If the service worker plugin is enabled then initialize it. We do not want to do it otherwise.
  if (phaserConfig.isGlobalPluginEnabled(Constants.PLUGIN_INFO.SERVICE_WORKER_KEY)) {
    // Initialize early on as it is important.
    ServiceWorkerPlugin.initialize();
  }
})();

import Globals from './globals.js';
import Scenes from './scenes/Scenes.js';
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



import { doSomeTests } from './common.js'

async function chatCompletions({token, body}) {
  console.log("Before fetch");
  console.log("Token" + token);

  const strToken = "" + token;
  console.log("strToken" + strToken);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${strToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  console.log("After fetch");
  console.log(response);

  return response;
};

/**
 * Handle the keydown event.
 * @param {KeyboardEvent} event The event.
 */
async function handleKeydown(event) {
  // CTRL-D shows the console.
  if ((event.code == "KeyD") && (event.ctrlKey)) {
    console.log("In handleKeydown");
    console.log(window.game.globals.player);

    const response = await chatCompletions({
      token: window.game.globals.player,
      body: {
        model: 'gpt-3.5-turbo',
        "messages": [
          {
            "role": "system",
            "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."
          },
          {
            "role": "user",
            "content": "Compose a poem that explains the concept of recursion in programming."
          }
        ]
      },
    });

    console.log("before data");
    const data = await response.json();
    console.log(data);
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
