import Phaser from './lib/phaser.js';
import config from './config/config.js';
import BootScene from './scenes/BootScene.js';
console.log('hello from main.js');
import PreloaderScene from './scenes/PreloaderScene.js';
console.log('hello from main.js');
import InputScene from './scenes/GetInputScene.js';
console.log('hello from main.js');
import MenuScene from './scenes/MenuScene.js';
console.log('hello from main.js');
import OptionsScene from './scenes/OptionsScene.js';
console.log('hello from main.js');
import CreditsScene from './scenes/CreditsScene.js';
console.log('hello from main.js');
import LeaderboardScene from './scenes/LeaderboardScene.js';
console.log('hello from main.js');
import IntroScene from './scenes/IntroScene.js';
console.log('hello from main.js');
import GameScene from './scenes/GameScene.js';
console.log('hello from main.js');
import GameOverScene from './scenes/GameOverScene.js';
console.log('hello from main.js');
import AudioModel from './utils/audio-status.js';
console.log('hello from main.js');

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
