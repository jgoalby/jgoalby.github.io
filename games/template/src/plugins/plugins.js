import EventPlugin from '../plugins/EventPlugin.js';
import SettingsPlugin from '../plugins/SettingsPlugin.js';
import ConsolePlugin from '../plugins/ConsolePlugin.js';
import IntrospectPlugin from '../plugins/IntrospectPlugin.js';
import AudioPlugin from '../plugins/AudioPlugin.js';
import FirebasePlugin from '../plugins/FirebasePlugin.js';

const global_plugins = [
  EventPlugin.options,
  SettingsPlugin.options,
  ConsolePlugin.options,
  IntrospectPlugin.options,
  AudioPlugin.options,
  FirebasePlugin.options,
]

export {
  global_plugins
};
