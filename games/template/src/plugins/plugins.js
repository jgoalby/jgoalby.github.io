import EventPlugin from '../plugins/EventPlugin.js';
import SettingsPlugin from '../plugins/SettingsPlugin.js';
import ConsolePlugin from '../plugins/ConsolePlugin.js';
import IntrospectPlugin from '../plugins/IntrospectPlugin.js';
import AudioPlugin from '../plugins/AudioPlugin.js';
import FirebasePlugin from '../plugins/FirebasePlugin.js';

// List of global plugins, that can be used to initialize the game engine. Order is important.
const global_plugins = [
  EventPlugin.options,
  SettingsPlugin.options,
  ConsolePlugin.options,
  IntrospectPlugin.options,
  AudioPlugin.options,
  FirebasePlugin.options,
]

export {
  global_plugins,
};
