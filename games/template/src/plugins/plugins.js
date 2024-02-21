import InitSetupPlugin from './InitSetupPlugin.js';
import EventPlugin from './EventPlugin.js';
import SettingsPlugin from './SettingsPlugin.js';
//import ConsolePlugin from './ConsolePlugin.js';
import IntrospectPlugin from './IntrospectPlugin.js';
import AudioPlugin from './AudioPlugin.js';
//import FirebasePlugin from './FirebasePlugin.js';

// List of global plugins, that can be used to initialize the game engine. Order is important.
const global_plugins = [
  InitSetupPlugin.options,
  EventPlugin.options,
  SettingsPlugin.options,
  //ConsolePlugin.options,
  IntrospectPlugin.options,
  AudioPlugin.options,
  //FirebasePlugin.options,
]

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
