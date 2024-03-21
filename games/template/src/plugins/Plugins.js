import InitSetupPlugin from './InitSetupPlugin.js';

import EventPlugin from './EventPlugin.js';
import SettingsPlugin from './SettingsPlugin.js';
import ServiceWorkerPlugin from './ServiceWorkerPlugin.js';
import WindowPlugin from './WindowPlugin.js';

import ConsolePlugin from './ConsolePlugin.js';
import DataPlugin from './DataPlugin.js';
import NotificationPlugin from './NotificationPlugin.js';
import IntrospectPlugin from './IntrospectPlugin.js';
import CachePlugin from './CachePlugin.js';
import StylesPlugin from './StylesPlugin.js';
import ReflectionPlugin from './ReflectionPlugin.js';
import ShortcutsPlugin from './ShortcutsPlugin.js';
import GenAIPlugin from './GenAIPlugin.js';
import AudioPlugin from './AudioPlugin.js';
import UnitTestPlugin from './UnitTestPlugin.js';
//import FirebasePlugin from './FirebasePlugin.js';

// List of global plugins, that can be used to initialize the game engine. Order is important.
// Can be used to pass directly to the game in the configuration for example as:
//  plugins: { global: global_plugins, }
// Or you can use the create static method to create the plugins dynamically and have more control.
const global_plugins = [
  // This plugin makes other plugins available, so it is necessary and should be first.
  InitSetupPlugin.options,

  // Important plugins for general functionality.
  EventPlugin.options,
  SettingsPlugin.options,
  ServiceWorkerPlugin.options,
  WindowPlugin.options,

  // Less critical plugins.
  ConsolePlugin.options,
  DataPlugin.options,
  NotificationPlugin.options,
  IntrospectPlugin.options,
  CachePlugin.options,
  StylesPlugin.options,
  ReflectionPlugin.options,
  ShortcutsPlugin.options,
  GenAIPlugin.options,
  AudioPlugin.options,
  UnitTestPlugin.options,
  //FirebasePlugin.options,
]

export default class Plugins {
  /**
  * Is the passed in plugin key enabled? These are what Phaser 3 considers global plugins.
  * 
  * @param {string} pluginKey The plugin key to check on.
  * @returns {boolean} true if it is enabled, false otherwise.
  */
  static isGlobalPluginEnabled(pluginKey) {
    // Go through all the global plugins and see if the key is there.
    for (let i = 0; i < global_plugins.length; i++) {
      // Is the key there?
      if (global_plugins[i].key === pluginKey) { return true; }
    }

    // Did not find the key.
    return false;
  }

  /**
   * Create plugins. Allows us to have more control over creation of the plugins
   * if we want it. Worth remembering that the plugin that is passed to install is a class
   * rather than an object instance.
   * 
   * @param {Phaser.Game} game The game instance.
   */
  static create(game) {
    // Go through all the global plugins
    for (let i = 0; i < global_plugins.length; i++) {
      // Do the install with the properties defined.
      game.plugins.install(
        global_plugins[i].key,
        global_plugins[i].plugin,
        global_plugins[i].start,
        global_plugins[i].mapping);
    }
  }
}
