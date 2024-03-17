import Constants from './constants.js';

import Scenes from './scenes/Scenes.js';

import { getPlugin } from './plugins/PluginsHelpers.js'

export default class Data {
  constructor() {
    this.data = {
      mainMenu: [
        { shortcut: 'I', label: 'Play',        scene: Constants.SCENES.INSTRUCTIONS_SCENE },
        { shortcut: 'O', label: 'Options',     scene: Constants.SCENES.OPTIONS_SCENE },
        { shortcut: 'C', label: 'Credits',     scene: Constants.SCENES.CREDITS_SCENE },
        { shortcut: 'L', label: 'Leaderboard', scene: Constants.SCENES.LEADERBOARD_SCENE },
      ]
    };

    this.count = 0;
  }

  getMainMenu() {
    return this.data.mainMenu;
  }

  addMainMenu(mainMenuItem) {
    
    // TODO: Check the item first?
    //       Conflicting shortcuts?

    this.data.mainMenu.push(mainMenuItem);
  }

  async test() {
    const item = { shortcut: 'B', label: 'Basic!', scene: Constants.SCENES.BASIC_SCENE };
    this.addMainMenu(item);
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
    this.count += 1;
    const heading = 'This is dynamic';

    let basicSceneCode = `import Constants from '../constants.js';
import Button from '../components/Button.js';
import BaseScene from './BaseScene.js';

export default class BasicScene extends BaseScene {
  constructor(config) {
    if (!config) { config = {} }
    config.key = Constants.SCENES.BASIC_SCENE;
    super(config);

    this.heading = undefined;
    this.button = undefined;
  }

  createScene() {
    this.heading = this.add.text(0, 0, '${heading} - ${this.count}', Constants.STYLES.HEADING_TEXT);
    this.heading.setOrigin(0.5, 0);
    this.heading.setY(50);

    this.button = new Button(this, { shortcut: 'esc', label: 'Menu', actionFn: () => { this.gotoScene(Constants.SCENES.MENU_SCENE) } });
  }

  resize() {
    this.heading.setX(this.cameras.main.width / 2);
    this.button.setPosition(this.cameras.main.width / 2, this.cameras.main.height - ((this.button.height / 2) + 10));
  }
}`;

    /** @type {CachePlugin} */
    const cachePlugin = getPlugin(Constants.PLUGIN_INFO.CACHE_KEY);
   
    const allImports = basicSceneCode.matchAll(/^\s*import [^\'\"]+[\'\"](.*)[\'\"];\s*$/gm);

    for (const match of allImports) {
      const absoluteURL = await cachePlugin.getAbsoluteURL(match[1]);

      basicSceneCode = basicSceneCode.replace(match[1], absoluteURL);
    }

    try {
      const objectURL = URL.createObjectURL(new Blob([basicSceneCode], { type: 'text/javascript' }));
      const module = await import(objectURL);
      URL.revokeObjectURL(objectURL);
      const baseSceneClass = module.default;
      let myClass = new baseSceneClass();
      Scenes.addSceneToGame(window.game, myClass);
    } catch(e) {
      console.log(e.message);
    }
  }
}

/*
    const basicSceneCode = `import Constants from '../constants.js';
import Button from './components/Button.js';
import BaseScene from './scenes/BaseScene.js';

export default class BasicScene extends BaseScene {
  constructor(config) {
    if (!config) { config = {} }
    config.key = Constants.SCENES.BASIC_SCENE;
    super(config);

    this.heading = undefined;
    this.button = undefined;
  }

  createScene() {
    this.heading = this.add.text(0, 0, 'Basic Scene', Constants.STYLES.HEADING_TEXT);
    this.heading.setOrigin(0.5, 0);
    this.heading.setY(50);

    this.button = new Button(this, { shortcut: 'esc', label: 'Menu', actionFn: () => { this.gotoScene(Constants.SCENES.MENU_SCENE) } });
  }

  resize() {
    this.heading.setX(this.cameras.main.width / 2);
    this.button.setPosition(this.cameras.main.width / 2, this.cameras.main.height - ((this.button.height / 2) + 10));
  }
}`;

*/