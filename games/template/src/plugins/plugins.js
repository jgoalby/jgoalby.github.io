import InitPlugin from './InitPlugin.js';
import EventPlugin from './EventPlugin.js';
import SettingsPlugin from './SettingsPlugin.js';
import ConsolePlugin from './ConsolePlugin.js';
import IntrospectPlugin from './IntrospectPlugin.js';
import AudioPlugin from './AudioPlugin.js';
import FirebasePlugin from './FirebasePlugin.js';

// List of global plugins, that can be used to initialize the game engine. Order is important.
const global_plugins = [
  InitPlugin.options,
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
