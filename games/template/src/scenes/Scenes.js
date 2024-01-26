import BootScene from './BootScene.js';
import PreloaderScene from './PreloaderScene.js';
import InputScene from './GetInputScene.js';
import MenuScene from './MenuScene.js';
import OptionsScene from './OptionsScene.js';
import CreditsScene from './CreditsScene.js';
import LeaderboardScene from './LeaderboardScene.js';
import IntroScene from './IntroScene.js';
import GameScene from './GameScene.js';
import GameOverScene from './GameOverScene.js';

export default class Scenes {
  static BOOT_SCENE = 'Boot';
  static PRELOADER_SCENE = 'Preloader';
  static INPUT_SCENE = 'Input';
  static MENU_SCENE = 'Menu';
  static OPTIONS_SCENE = 'Options';
  static CREDITS_SCENE = 'Credits';
  static LEADERBOARD_SCENE = 'Leaderboard';
  static INTRO_SCENE = 'Intro';
  static GAME_SCENE = 'Game';
  static GAMEOVER_SCENE = 'GameOver';

  static create(game) {
    const customEmitter = new Phaser.Events.EventEmitter();

    const deps = {
      emitter: customEmitter,
    }

    game.scene.add(this.BOOT_SCENE, new BootScene(deps));
    game.scene.add(this.PRELOADER_SCENE, new PreloaderScene(deps));
    game.scene.add(this.INPUT_SCENE, new InputScene(deps));
    game.scene.add(this.MENU_SCENE, new MenuScene(deps));
    game.scene.add(this.OPTIONS_SCENE, new OptionsScene(deps));
    game.scene.add(this.CREDITS_SCENE, new CreditsScene(deps));
    game.scene.add(this.LEADERBOARD_SCENE, new LeaderboardScene(deps));
    game.scene.add(this.INTRO_SCENE, new IntroScene(deps));
    game.scene.add(this.GAME_SCENE, new GameScene(deps));
    game.scene.add(this.GAMEOVER_SCENE, new GameOverScene(deps));
    game.scene.start(this.BOOT_SCENE);
  }
}
