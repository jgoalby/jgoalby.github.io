import Constants from './constants.js';
import Scenes from './scenes/Scenes.js';
import Plugins from './plugins/Plugins.js';
import { phaserConfig } from './config/config.js';
import ConsolePlugin from './plugins/ConsolePlugin.js';
import ServiceWorkerPlugin from './plugins/ServiceWorkerPlugin.js';

// Main JS file for the project. Loaded from the HTML file. Try to keep this minimal.

//------------------------------------------------------------------------------------
// ***                                Before game                                  ***
//------------------------------------------------------------------------------------

(() => {
  // If the console plugin is enabled then initialize it. We do not want to do it otherwise.
  if (Plugins.isGlobalPluginEnabled(Constants.PLUGIN_INFO.CONSOLE_KEY)) {
    // Initialize console first. Do it here so that we can capture any console messages that happen during startup.
    ConsolePlugin.initialize();
  }

  // If the service worker plugin is enabled then initialize it. We do not want to do it otherwise.
  if (Plugins.isGlobalPluginEnabled(Constants.PLUGIN_INFO.SERVICE_WORKER_KEY)) {
    // Initialize early on as it is important for functionality.
    ServiceWorkerPlugin.initialize();
  }
})();

//------------------------------------------------------------------------------------
// ***                                    Game                                     ***
//------------------------------------------------------------------------------------

// Create the game!
export default class Game extends Phaser.Game {
  constructor() {
    super(phaserConfig);
    Scenes.create(this);
    Plugins.create(this);
  }
}

// Create the global game instance.
window.game = new Game();

//------------------------------------------------------------------------------------
// ***                                  Post game                                  ***
//------------------------------------------------------------------------------------
