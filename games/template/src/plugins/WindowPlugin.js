import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

export default class WindowPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Listen out for window messages that we would like to handle.
    window.addEventListener('resize', () => { this.onResize() });
    window.addEventListener("keydown", (e) => { this.onKeydown(e) }, false);
  }

  /**
   * Called on every resize event. See if we need to scale the game.
   */
  onResize() {
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

  /**
   * Called after a short timeout for the case of iPad strange behavior. Without this
   * the resizing would not work correctly.
   */
  onResizeTimeout() {
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
   * 
   * @param {KeyboardEvent} event The event.
   */
  onKeydown(event) {
    // Notify everyone that a keyboard event happened.
    this.customevent.emit(Constants.EVENTS.KEYBOARD, event);
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
