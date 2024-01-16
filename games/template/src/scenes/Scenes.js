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
  static create(game) {
    const customEmitter = new Phaser.Events.EventEmitter();

    const deps = {
      emitter: customEmitter,
    }

    game.scene.add('Boot', new BootScene(deps));
    game.scene.add('Preloader', new PreloaderScene(deps));
    game.scene.add('Input', new InputScene(deps));
    game.scene.add('Menu', new MenuScene(deps));
    game.scene.add('Options', new OptionsScene(deps));
    game.scene.add('Credits', new CreditsScene(deps));
    game.scene.add('Leaderboard', new LeaderboardScene(deps));
    game.scene.add('Intro', new IntroScene(deps));
    game.scene.add('Game', new GameScene(deps));
    game.scene.add('GameOver', new GameOverScene(deps));
    game.scene.start('Boot');
  }
}
