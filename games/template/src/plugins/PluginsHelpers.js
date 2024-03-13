/**
 * Get the specified plugin or undefined if not present.
 * Need to return 'any' because the BasePlugin type doesn't work well.
 *   Error: Type 'Function | BasePlugin' is not assignable to type 'BasePlugin'.
 * Maybe we can change this if we implement our own base plugin.
 * Use the @ type feature for type safety for your returned objects.
 * 
 * @param {string} pluginName The name of the plugin to get.
 * @returns {any } The plugin or undefined if not present.
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

/**
 * Get a proxy to any plugin so you do not have to check if it is undefined or not.
 * 
 * @returns {any } The plugin proxy.
 */
function getPluginProxy() {
  const blankHandler = {
    get(target, prop, receiver) {
      // Just return a blank function. This also works as a value. A value though does not
      // work as a function, so we need to return this. This is because we would be using a
      // class vs object. And as we do cannot use the class, we don't need to pass it in.
      return function() { };
    },
  };

  // Return a proxy for a plugin that does not blow up when methods called on it.
  return new Proxy({}, blankHandler);
}

/**
 * Return a list of the plugins that are available or undefined.
 * 
 * @returns {Phaser.Types.Plugins.GlobalPlugin[] | undefined}
 */
function getPluginsList() {
  if (window && window.game && window.game.plugins) {
    return window.game.plugins.plugins;
  } else if (window && window.pluginManager) {
    return window.pluginManager.plugins;
  } else {
    return undefined;
  }
}

/**
 * Get the list of plugins as a string, useful for showing what plugins are used.
 * 
 * @returns {string} The list of plugins.
 */
function getPluginListAsString() {
  // Get the list of plugins.
  const plugins = getPluginsList();

  // Short circuit if there are no plugins.
  if (!plugins) { return ""; }

  // The list of plugins we have found as a string.
  let pluginsList = "";

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

  // Return the list of plugins as a single string.
  return pluginsList;
}

export {
  getPlugin,
  getPluginProxy,
  getPluginListAsString,
};
