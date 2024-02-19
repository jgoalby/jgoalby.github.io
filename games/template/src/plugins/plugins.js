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

function getPlugin(pluginName) {
  return undefined;
}

function getPluginListAsString() {
  return "";
}

function getEventPlugin() { return getPlugin('EventPlugin'); }

function getSettingsPlugin() { return getPlugin('SettingsPlugin'); }

function getConsolePlugin() { return getPlugin('ConsolePlugin'); }

function getIntrospectPlugin() { return getPlugin('IntrospectPlugin'); }

function getAudioPlugin() { return getPlugin('AudioPlugin'); }

function getFirebasePlugin() { return getPlugin('FirebasePlugin'); }

export {
  global_plugins,
  getEventPlugin,
  getSettingsPlugin,
  getConsolePlugin,
  getIntrospectPlugin,
  getAudioPlugin,
  getFirebasePlugin,
  getPluginListAsString,
};
