import Constants from '../constants.js';
import { generalConfig } from '../config/config.js';
import { getPlugin } from './PluginsHelpers.js'

// Note that the event mechanism for the service worker is different from the custom event
// mechanism for the rest of the game. This plugin basically translates from the service worker
// event mechanism to the custom event mechanism.

export default class ServiceWorkerPlugin extends Phaser.Plugins.BasePlugin {
  static initialize() {
    // See if the browser supports service workers.
    if ('serviceWorker' in navigator) {
      // Once the page is loaded, register the service worker.
      window.addEventListener('load', () => {
        // Register the service worker.
        navigator.serviceWorker.register('service-worker.js').then((registration) => {
          // Uncomment this to see the service worker registration.
          //console.info('Service worker registration successful.');
        }, function(err) {
          // The service worker can fail for numerous reasons. This is async so nothing to do here.
          console.error('Service worker registration failed!', err);
        });

        // These are messages received from the service worker.
        navigator.serviceWorker.addEventListener('message', event => {
          // Sanity check.
          if (event.data) {
            // Messages can be a string type or object type.
            if (typeof event.data === 'string') {
              // Not implemented anything with string messages, so just log it.
              console.log(`The service worker sent a message: ${event.data}`);
            } else if (event.data.type === Constants.SW_EVENTS.CACHE_EVENT) {
              // Get the event plugin.
              /** @type {EventPlugin} */
              const customevent = getPlugin(Constants.PLUGIN_INFO.EVENT_KEY);

              // It might not be available.
              if (customevent) {
                // Emit an event for the cache event.
                customevent.emit(Constants.EVENTS.CACHE_EVENT, event.data);
              }
            }
          }
        });

        // Once the service worker is ready, send it a message to initialize.
        navigator.serviceWorker.ready.then(registration => {
          // Message to initialize the service worker with us.
          registration.active.postMessage({ type: Constants.SW_EVENTS.INIT });

          // Message to set whether we want to receive cache messages.
          registration.active.postMessage({ type: Constants.SW_EVENTS.CONFIG, sendCacheMessages: generalConfig.sendCacheMessages });
        });
      });
    } else {
      console.info('No service worker support in this browser.');
    }
  }

  constructor(pluginManager) {
    super(pluginManager);

    // If there is no service worker then we cannot do anything.
    if (! ('serviceWorker' in navigator)) { return; }

    /** @type {EventPlugin} */
    this.customevent = getPlugin(Constants.PLUGIN_INFO.EVENT_KEY);

    // If we can access the event plugin.
    if (this.customevent) {
      // We want to know when anyone wants the cache to be cleared as it is handled by the service worker.
      // This means we can keep all of the service worker code in this plugin, separating the concerns.
      this.customevent.on(Constants.EVENTS.CLEAR_CACHE, this.clearCache, this);      
    }
  }

  /**
   * Destroy the plugin and clean up after ourselves.
   */
  destroy() {
    // We might not have the plugin, so check this first.
    if (this.customevent) {
      // Remove the listener.
      this.customevent.off(Constants.EVENTS.CLEAR_CACHE, this.clearCache, this);
      this.customevent = undefined;
    }

    // MUST do this.
    super.destroy();
  }

  /**
   * Local plugin so we do not provide a version.
   * 
   * @returns {string | undefined} The version of the plugin.
   */
  getVersion() { return undefined; }

  /**
   * Ask the service worker to clear the cache.
   */
  clearCache() {
    // If there is no service worker then we cannot do anything.
    if (! ('serviceWorker' in navigator)) { return; }

    navigator.serviceWorker.ready.then(registration => {
      // Send the message to the service worker to clear the cache.
      registration.active.postMessage({ type: Constants.SW_EVENTS.CLEAR_CACHE });
    });
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.SERVICE_WORKER_KEY, 
      plugin: ServiceWorkerPlugin, 
      start: true,
      mapping: Constants.PLUGIN_INFO.SERVICE_WORKER_MAPPING,
    }
  }
}