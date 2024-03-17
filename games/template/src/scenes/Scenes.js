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
    // We dynamically create scenes, so its possible we already have one.    
    game.scene.remove(scene.key);

    // Add the passed in scene to the passed in game.
    game.scene.add(scene.key, scene);
  }
}
