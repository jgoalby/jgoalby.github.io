import config from './config/config.js';
import Globals from './globals.js';
import Scenes from './scenes/Scenes.js';

export default class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.globals = Globals.create();
    Scenes.create(this);
  }
}

// @ts-ignore
window.game = new Game();

(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then((registration) => {
      console.log('Service worker registration successful!');
      console.log(registration);
    }, function(err) {
        console.log('Service worker registration failed!');
        console.log(err);
      });
    });
  } else {
    console.log('No service worker support in this browser!');
  }
})();
