import Constants from '../constants.js';
import Button from '../components/Button.js';
import BaseScene from './BaseScene.js';

export default class BasicScene extends BaseScene {
  constructor(config) {
    if (!config) { config = {} }
    config.key = Constants.SCENES.BASIC_SCENE;
    super(config);

    this.heading = undefined;
    this.button = undefined;
  }

  createScene() {
    this.heading = this.add.text(0, 0, 'Basic Scene', Constants.STYLES.HEADING_TEXT);
    this.heading.setOrigin(0.5, 0);
    this.heading.setY(50);

    this.button = new Button(this, { shortcut: 'esc', label: 'Menu', actionFn: () => { this.gotoScene(Constants.SCENES.MENU_SCENE) } });
  }

  resize() {
    this.heading.setX(this.cameras.main.width / 2);
    this.button.setPosition(this.cameras.main.width / 2, this.cameras.main.height - ((this.button.height / 2) + 10));
  }
}


// import Constants from '../constants.js';
// import BaseScene from './BaseScene.js';

// export default class ScrollingQuoteScene extends BaseScene {
//   constructor(config) {
//     if (!config) { config = {} }
//     config.key = Constants.SCENES.SCROLLING_QUOTE_SCENE;
//     super(config);

//     this.quoteText = undefined;
//   }

//   createScene() {
//     const quote = "The only way to do great work is to love what you do. - Steve Jobs";
//     this.quoteText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height, quote, Constants.STYLES.HEADING_TEXT);
//     this.quoteText.setOrigin(0.5, 1); // Center the text horizontally and align its bottom with the given y position

//     this.createScrollingAnimation();
//   }

//   createScrollingAnimation() {
//     this.tweens.add({
//       targets: this.quoteText,
//       y: -this.quoteText.height, // Target y position is above the top of the screen
//       ease: 'Linear', // Linear easing for constant scroll speed
//       duration: 10000, // Duration of the scroll in milliseconds
//       repeat: 0, // No repeat
//       onComplete: () => {
//         // Optional: what to do when the scroll animation completes
//         console.log('Quote has finished scrolling');
//       },
//     });
//   }

//   resize() {
//     // Ensure the quote remains centered during resizing
//     this.quoteText.setX(this.cameras.main.width / 2);
//   }
// }