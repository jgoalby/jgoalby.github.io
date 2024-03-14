import Constants from './constants.js';

export default class Data {
  constructor() {
    this.data = {
      mainMenu: [
        { shortcut: 'I', label: 'Play',        scene: Constants.SCENES.INSTRUCTIONS_SCENE },
        { shortcut: 'O', label: 'Options',     scene: Constants.SCENES.OPTIONS_SCENE },
        { shortcut: 'C', label: 'Credits',     scene: Constants.SCENES.CREDITS_SCENE },
        { shortcut: 'L', label: 'Leaderboard', scene: Constants.SCENES.LEADERBOARD_SCENE },
        { shortcut: 'B', label: 'Basic',       scene: Constants.SCENES.BASIC_SCENE },
      ]
    };
  }

  getMainMenu() {
    return this.data.mainMenu;
  }

  addMainMenu(mainMenuItem) {
    
    // TODO: Check the item first?
    //       Conflicting shortcuts?

    this.data.mainMenu.push(mainMenuItem);
  }

  test() {
    const item = { shortcut: 'J', label: 'Joust!', scene: Constants.SCENES.INSTRUCTIONS_SCENE };
    this.addMainMenu(item);
  }
}
