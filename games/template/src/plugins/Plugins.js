import InitSetupPlugin from './InitSetupPlugin.js';
import EventPlugin from './EventPlugin.js';
import SettingsPlugin from './SettingsPlugin.js';
import ServiceWorkerPlugin from './ServiceWorkerPlugin.js';
import WindowPlugin from './WindowPlugin.js';
import ConsolePlugin from './ConsolePlugin.js';
import NotificationPlugin from './NotificationPlugin.js';
import IntrospectPlugin from './IntrospectPlugin.js';
import CachePlugin from './CachePlugin.js';
import StylesPlugin from './StylesPlugin.js';
import ReflectionPlugin from './ReflectionPlugin.js';
import GenAIPlugin from './GenAIPlugin.js';
import AudioPlugin from './AudioPlugin.js';
//import FirebasePlugin from './FirebasePlugin.js';

// List of global plugins, that can be used to initialize the game engine. Order is important.
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
  NotificationPlugin.options,
  IntrospectPlugin.options,
  CachePlugin.options,
  StylesPlugin.options,
  ReflectionPlugin.options,
  GenAIPlugin.options,
  AudioPlugin.options,
  //FirebasePlugin.options,
]

/**
 * Is the passed in plugin key enabled? These are global plugins as defined
 * by Phaser 3.
 * 
 * @param {string} pluginKey The plugin key to check on.
 * @returns {boolean} true if it is enabled, false otherwise.
 */
function isGlobalPluginEnabled(pluginKey) {
  // Go through all the global plugins and see if the key is there.
  for (let i = 0; i < global_plugins.length; i++) {
    // Is the key there?
    if (global_plugins[i].key === pluginKey) { return true; }
  }

  // Did not find the key.
  return false;
}

export {
  global_plugins,
  isGlobalPluginEnabled,
};
