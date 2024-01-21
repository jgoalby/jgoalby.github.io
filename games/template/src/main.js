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

function resize() {
  var w = window.innerWidth;   
  var h = window.innerHeight;

  console.log("Resize instant called: ", w, h);
  
  // @ts-ignore
  window.game.scale.resize(w, h);
  window.setTimeout(onResizeTimeout, 5);
}

// Called after 5ms timeout
// Will yield accurate values
function onResizeTimeout() {
  var w = window.innerWidth;   
  var h = window.innerHeight;

  console.log("Resize timeout called: ", w, h);
}


(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then((registration) => {
      console.log('Service worker registration successful!');
    }, function(err) {
        console.log('Service worker registration failed!', err);
      });
    });
  } else {
    console.log('No service worker support in this browser!');
  }

  window.addEventListener('resize', resize); 
})();
