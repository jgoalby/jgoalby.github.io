//import Phaser from './lib/phaser.js';
import config from './config/config.js';
import BootScene from './scenes/BootScene.js';
import PreloaderScene from './scenes/PreloaderScene.js';
import InputScene from './scenes/GetInputScene.js';
import MenuScene from './scenes/MenuScene.js';
import OptionsScene from './scenes/OptionsScene.js';
import CreditsScene from './scenes/CreditsScene.js';
import LeaderboardScene from './scenes/LeaderboardScene.js';
import IntroScene from './scenes/IntroScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import AudioModel from './utils/audio-status.js';

export default class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new AudioModel();
    this.globals = {
      model,
      bgMusic: null,
      player: '',
      score: 0,
    };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Input', InputScene);
    this.scene.add('Menu', MenuScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Leaderboard', LeaderboardScene);
    this.scene.add('Intro', IntroScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
