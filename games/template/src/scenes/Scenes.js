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
    game.scene.add('Boot', BootScene);
    game.scene.add('Preloader', PreloaderScene);
    game.scene.add('Input', InputScene);
    game.scene.add('Menu', MenuScene);
    game.scene.add('Options', OptionsScene);
    game.scene.add('Credits', CreditsScene);
    game.scene.add('Leaderboard', LeaderboardScene);
    game.scene.add('Intro', IntroScene);
    game.scene.add('Game', GameScene);
    game.scene.add('GameOver', GameOverScene);
    game.scene.start('Boot');
  }
}
