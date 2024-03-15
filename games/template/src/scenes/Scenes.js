import BaseScene from './BaseScene.js';

// Import each of the scenes we want to use.
import BootScene from './BootScene.js';
import PreloaderScene from './PreloaderScene.js';
import LoginScene from './LoginScene.js';
import MenuScene from './MenuScene.js';
import OptionsScene from './OptionsScene.js';
import CreditsScene from './CreditsScene.js';
import LeaderboardScene from './LeaderboardScene.js';
import InstructionsScene from './InstructionsScene.js';
import GameScene from './GameScene.js';
import GameOverScene from './GameOverScene.js';
import BasicScene from './BasicScene.js';

export default class Scenes {
  /**
   * Create scenes and start the first scene.
   * 
   * @param {Phaser.Game} game The game instance.
   */
  static create(game) {
    // The first scene is special as we start it.
    const startScene = new BootScene();

    // Add all of the scenes here
    Scenes.addSceneToGame(game, startScene);
    Scenes.addSceneToGame(game, new PreloaderScene());
    Scenes.addSceneToGame(game, new LoginScene());
    Scenes.addSceneToGame(game, new MenuScene());
    Scenes.addSceneToGame(game, new OptionsScene());
    Scenes.addSceneToGame(game, new CreditsScene());
    Scenes.addSceneToGame(game, new LeaderboardScene());
    Scenes.addSceneToGame(game, new InstructionsScene());
    Scenes.addSceneToGame(game, new GameScene());
    Scenes.addSceneToGame(game, new GameOverScene());
    Scenes.addSceneToGame(game, new BasicScene());

    // Add all of the scenes here
    /*game.scene.add(Constants.SCENES.BOOT_SCENE,         new BootScene());
    game.scene.add(Constants.SCENES.PRELOADER_SCENE,    new PreloaderScene());
    game.scene.add(Constants.SCENES.LOGIN_SCENE,        new LoginScene());
    game.scene.add(Constants.SCENES.MENU_SCENE,         new MenuScene());
    game.scene.add(Constants.SCENES.OPTIONS_SCENE,      new OptionsScene());
    game.scene.add(Constants.SCENES.CREDITS_SCENE,      new CreditsScene());
    game.scene.add(Constants.SCENES.LEADERBOARD_SCENE,  new LeaderboardScene());
    game.scene.add(Constants.SCENES.INSTRUCTIONS_SCENE, new InstructionsScene());
    game.scene.add(Constants.SCENES.GAME_SCENE,         new GameScene());
    game.scene.add(Constants.SCENES.GAMEOVER_SCENE,     new GameOverScene());
    game.scene.add(Constants.SCENES.BASIC_SCENE,        new BasicScene());*/

    // Start the first scene
    game.scene.start(startScene.key);
  }

  /**
   * Add the scene to the game.
   * 
   * @param {Phaser.Game} game The game instance.
   * @param {BaseScene} scene The scene instance.
   */
  static addSceneToGame(game, scene) {
    console.log("1111");
    console.dir(scene);
    console.log(scene.key);
    // Add the passed in scene to the passed in game.
    game.scene.add(scene.key, scene);
  }
}
