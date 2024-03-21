import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

import Scenes from '../scenes/Scenes.js';
import { getPlugin } from './PluginsHelpers.js'

export default class DataPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    this.data = {
      mainMenu: [
        { shortcut: 'I', label: 'Play',        scene: Constants.SCENES.INSTRUCTIONS_SCENE },
        { shortcut: 'O', label: 'Options',     scene: Constants.SCENES.OPTIONS_SCENE },
        { shortcut: 'C', label: 'Credits',     scene: Constants.SCENES.CREDITS_SCENE },
        { shortcut: 'L', label: 'Leaderboard', scene: Constants.SCENES.LEADERBOARD_SCENE },
      ]
    };

    // We want to intercept getting and setting so that we can store arbitrary values.
    return new Proxy(this, {
      get(obj, prop) {
        // If there is an existing property on the obj, return it.
        if (prop in obj) { return obj[prop]; }

        // If our data member has the property, use it.
        if (prop in obj.data) { return obj.data[prop]; }

        // We did not find the property, so undefined.
        return undefined;
      },
      set(obj, prop, value) {
        // If there is an existing property on the obj, set it.
        if (prop in obj) { obj[prop] = value; return true; }

        // We just add to our data member otherwise.
        obj.data[prop] = value;
        return true;
      }
    });
  }

  addMainMenu(mainMenuItem) {
    // Go through all of the existing mane menu items looking for same one we are adding.    
    for (let curMainMenuItem of this.data.mainMenu) {
      if ((curMainMenuItem.shortcut === mainMenuItem.shortcut) && 
          (curMainMenuItem.label === mainMenuItem.label) && 
          (curMainMenuItem.scene === mainMenuItem.scene)) {
            // Main menu item already exists, do not add again.
            return;
          }
    }

    // Add this new main menu item.
    this.data.mainMenu.push(mainMenuItem);
  }

  async test() {
    // const item = { shortcut: 'B', label: 'Basic!', scene: Constants.SCENES.BASIC_SCENE };
    // this.addMainMenu(item);
    await this.test2();
  }

  async test3() {
    const code = 'export default function hello() { console.log("Hello World"); }';
    const objectURL = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
    const module = await import(objectURL);
    console.log(module); // property default contains function hello now
    const myHello = module.default;
    myHello(); // puts "Hello World" to console
  }

  async test2() {
    let basicSceneCode = `import Constants from '../constants.js';
import BaseScene from './BaseScene.js';

export default class ScrollingQuoteScene extends BaseScene {
  constructor(config) {
    if (!config) { config = {} }
    config.key = Constants.SCENES.SCROLLING_QUOTE_SCENE;
    super(config);

    this.quoteText = undefined;
  }

  createScene() {
    const quote = "The only way to do great work is to love what you do. - Steve Jobs";
    this.quoteText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height, quote, Constants.STYLES.HEADING_TEXT);
    this.quoteText.setOrigin(0.5, 1); // Center the text horizontally and align its bottom with the given y position

    this.createScrollingAnimation();
  }

  createScrollingAnimation() {
    this.tweens.add({
      targets: this.quoteText,
      y: -this.quoteText.height, // Target y position is above the top of the screen
      ease: 'Linear', // Linear easing for constant scroll speed
      duration: 10000, // Duration of the scroll in milliseconds
      repeat: 0, // No repeat
      onComplete: () => {
        // Optional: what to do when the scroll animation completes
        console.log('Quote has finished scrolling');
      },
    });
  }

  resize() {
    // Ensure the quote remains centered during resizing
    this.quoteText.setX(this.cameras.main.width / 2);
  }
}`;

    /** @type {CachePlugin} */
    const cachePlugin = getPlugin(Constants.PLUGIN_INFO.CACHE_KEY);

    // Look for import statements and capture the quoted part as we want to make that absolute.
    const allImports = basicSceneCode.matchAll(/^\s*import [^\'\"]+[\'\"](.*)[\'\"];\s*$/gm);

    // Go through all of the imports we found.
    for (const match of allImports) {
      // Just making sure before we access it.
      if (match.length >= 2) {
        // The importString we matched
        const importString = match[1];

        // Get the absolute URL based on the import we found.
        const absoluteURL = await cachePlugin.getAbsoluteURL(importString);

        // Replace the relative URL with the absolute URL.
        basicSceneCode = basicSceneCode.replace(importString, absoluteURL);
      }
    }

    try {
      const objectURL = URL.createObjectURL(new Blob([basicSceneCode], { type: 'text/javascript' }));
      const module = await import(objectURL);
      URL.revokeObjectURL(objectURL);
      const baseSceneClass = module.default;
      let myScene = new baseSceneClass();
      Scenes.addSceneToGame(window.game, myScene);

      const item = { shortcut: 'B', label: 'Basic!', scene: myScene.key };
      this.addMainMenu(item);
    } catch(e) {
      console.log(e.message);
    }
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.DATA_KEY, 
      plugin: this,
      start: true,
      mapping: Constants.PLUGIN_INFO.DATA_PLUGIN,
    }
  }
}
