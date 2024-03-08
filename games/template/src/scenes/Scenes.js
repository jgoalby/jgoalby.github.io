import Constants from '../constants.js';

// Import each of the scenes we want to use.
import BootScene from './BootScene.js';
import PreloaderScene from './PreloaderScene.js';
import InputScene from './GetInputScene.js';
import MenuScene from './MenuScene.js';
import OptionsScene from './OptionsScene.js';
import CreditsScene from './CreditsScene.js';
import LeaderboardScene from './LeaderboardScene.js';
import InstructionsScene from './InstructionsScene.js';
import GameScene from './GameScene.js';
import GameOverScene from './GameOverScene.js';

export default class Scenes {
  /**
   * Create scenes and start the first scene.
   * 
   * @param {any} game The game instance.
   */
  static create(game) {
    // Add all of the scenes here
    game.scene.add(Constants.SCENES.BOOT_SCENE,         new BootScene());
    game.scene.add(Constants.SCENES.PRELOADER_SCENE,    new PreloaderScene());
    game.scene.add(Constants.SCENES.INPUT_SCENE,        new InputScene());
    game.scene.add(Constants.SCENES.MENU_SCENE,         new MenuScene());
    game.scene.add(Constants.SCENES.OPTIONS_SCENE,      new OptionsScene());
    game.scene.add(Constants.SCENES.CREDITS_SCENE,      new CreditsScene());
    game.scene.add(Constants.SCENES.LEADERBOARD_SCENE,  new LeaderboardScene());
    game.scene.add(Constants.SCENES.INSTRUCTIONS_SCENE, new InstructionsScene());
    game.scene.add(Constants.SCENES.GAME_SCENE,         new GameScene());
    game.scene.add(Constants.SCENES.GAMEOVER_SCENE,     new GameOverScene());

    // Start the first scene
    game.scene.start(Constants.SCENES.BOOT_SCENE);
  }
}
