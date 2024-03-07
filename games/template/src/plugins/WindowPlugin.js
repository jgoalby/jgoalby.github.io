import Constants from '../constants.js';
import { getPlugin } from './PluginsHelpers.js'

export default class WindowPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Listen out for things.
    window.addEventListener('resize', () => { this.resize() });
    window.addEventListener("keydown", (e) => { this.handleKeydown(e) }, false);
  }

  /**
   * Destroy the plugin and clean up after ourselves.
   */
  destroy() {
    // MUST do this.
    super.destroy();
  }

  /**
   * Local plugin so we do not provide a version.
   * 
   * @returns {string | undefined} The version of the plugin.
   */
  getVersion() { return undefined; }

  // Called on every resize event.
  resize() {
    console.log("In resize");
    // The current width and height.
    var w = window.innerWidth;   
    var h = window.innerHeight;

    // Save the current width and height for the next event.
    window.innerWidthPrevious = w;
    window.innerHeightPrevious = h;

    // Resize, and set a timer to check again very soon.
    window.game.scale.resize(w, h);
    window.setTimeout(() => { this.onResizeTimeout() }, 5);
  }

  // Called after a short timeout for the case of iPad strange behavior.
  onResizeTimeout() {
    console.log("In onResizeTimeout");
    // The current width and height.
    var w = window.innerWidth;   
    var h = window.innerHeight;

    // The previous width and height.
    var wPrev = window.innerWidthPrevious;
    var hPrev = window.innerHeightPrevious;

    // If the values are the same then do nothing. If they are not the same that means they were changed
    // during the short timeout. This happens occasionally on iPads.
    if (wPrev === w && hPrev === h) { return; }

    // We need to do a resize because the values are different.
    window.game.scale.resize(w, h);
  }

  /**
   * Handle the keydown event.
   * @param {KeyboardEvent} event The event.
   */
  async handleKeydown(event) {
    // CTRL-D shows the console.
    if ((event.code == "KeyD") && (event.ctrlKey)) {
      console.log("In handleKeydown");
    }
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.WINDOW_KEY, 
      plugin: WindowPlugin, 
      start: true,
      mapping: Constants.PLUGIN_INFO.WINDOW_MAPPING,
    }
  }
}
