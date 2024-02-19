/**
 * Get the specified plugin or undefined if not present.
 * Need to return 'any' because the BasePlugin type doesn't work well. So use the specified
 * plugin methods if you want type safety.
 * 
 * @param {string} pluginName The name of the plugin to get.
 * @returns {any}
 */
function getPlugin(pluginName) {
  if (window && window.game && window.game.plugins) {
    return window.game.plugins.get(pluginName);
  } else if (window && window.pluginManager) {
    return window.pluginManager.get(pluginName);
  } else {
    return undefined;
  }
}

function getPluginsList() {
  if (window && window.game && window.game.plugins) {
    return window.game.plugins.plugins;
  } else if (window && window.pluginManager) {
    return window.pluginManager.plugins;
  } else {
    return undefined;
  }
}

function getPluginListAsString() {
  // Get the list of plugins.
  const plugins = getPluginsList();

  if (!plugins) { return ""; }

  // The list of plugins we have found as a string.
  let pluginsList = "";

  if (plugins) {
    // Go through all of the plugins.
    for (let i = 0; i < plugins.length; i++) {
      // Get the key and the plugin itself so we can get its version.
      const pluginKey = plugins[i].key;

      // We cannot tell it to be a Phaser.Plugins.BasePlugin because that doesn't work.
      /** @type {any} */
      const curPlugin = plugins[i].plugin;
      /** @type {Phaser.Plugins.BasePlugin} */
      const basePlugin = curPlugin;

      // If there is no version defined it could be an internal plugin that we do not want listed.
      if (basePlugin.getVersion) {
        // Add the current plugin information to the string list of plugins.
        pluginsList += `${pluginKey} : ${basePlugin.getVersion()}\n`;
      }
    }
  }

  return pluginsList;
}

// These functions provide type safe access to the plugins. When using the pluginManager
// or going straight to the plugins in the game object, you get a base class that does not
// have the methods you need. This is a workaround to get the methods you need with type safety.

/**
 * Get the plugin instance if it is available, otherwise undefined.
 * @returns {InitSetupPlugin}
 */
function getInitSetupPlugin() { return getPlugin('InitSetupPlugin'); }

/**
 * Get the plugin instance if it is available, otherwise undefined.
 * @returns {EventPlugin}
 */
function getEventPlugin() { return getPlugin('EventPlugin'); }

/**
 * Get the plugin instance if it is available, otherwise undefined.
 * @returns {SettingsPlugin}
 */
function getSettingsPlugin() { return getPlugin('SettingsPlugin'); }

/**
 * Get the plugin instance if it is available, otherwise undefined.
 * @returns {ConsolePlugin}
 */
function getConsolePlugin() { return getPlugin('ConsolePlugin'); }

/**
 * Get the plugin instance if it is available, otherwise undefined.
 * @returns {IntrospectPlugin}
 */
function getIntrospectPlugin() { return getPlugin('IntrospectPlugin'); }

/**
 * Get the plugin instance if it is available, otherwise undefined.
 * @returns {AudioPlugin}
 */
function getAudioPlugin() { return getPlugin('AudioPlugin'); }

/**
 * Get the plugin instance if it is available, otherwise undefined.
 * @returns {FirebasePlugin}
 */
function getFirebasePlugin() { return getPlugin('FirebasePlugin'); }

export {
  getInitSetupPlugin,
  getEventPlugin,
  getSettingsPlugin,
  getConsolePlugin,
  getIntrospectPlugin,
  getAudioPlugin,
  getFirebasePlugin,
  getPluginListAsString,
};
