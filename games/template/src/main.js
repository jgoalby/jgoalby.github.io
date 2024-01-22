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

// Called on every resize event.
function resize() {
  var w = window.innerWidth;   
  var h = window.innerHeight;

  // @ts-ignore
  window.innerWidthPrevious = w;
  // @ts-ignore
  window.innerHeightPrevious = h;
  
  // @ts-ignore
  window.game.scale.resize(w, h);
  window.setTimeout(onResizeTimeout, 5);
}

// Called after a short timeout for the case of iPad strange behavior.
function onResizeTimeout() {
  var w = window.innerWidth;   
  var h = window.innerHeight;

  // @ts-ignore
  var wPrev = window.innerWidthPrevious;
  // @ts-ignore
  var hPrev = window.innerHeightPrevious;

  // If the values are the same then do nothing. If they are not the
  // same that means they were changed during the short timeout.
  // This happens occasionally on iPads.
  if (wPrev === w && hPrev === h) {
    return;
  }

  // @ts-ignore
  window.game.scale.resize(w, h);
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
