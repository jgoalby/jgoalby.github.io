import Constants from '../constants.js';
import BaseScene from './BaseScene.js';

export default class LoginScene extends BaseScene {
  constructor(config) {
    if (!config) { config = {} }
    config.key = Constants.SCENES.LOGIN_SCENE;
    super(config);

    this.text = null;
    this.textBounds = null;
    this.nameInputElement = null;
  }

  preload() {
  }

  createScene() {
    this.text = this.add.text(0, 0, 'Please enter your name!', {
      color: 'white',
      fontSize: '20px ',
    });
    this.text.setOrigin(0.5);
    this.textBounds = this.text.getBounds();

    const dom = document.createElement('div');
    const input = document.createElement('input');
    input.name = 'nameField';
    input.placeholder = 'Enter your name';

    // Have the text field have focus on showing the scene.
    input.autofocus = true;

    // Have the enter key trigger the button click.
    input.addEventListener('keyup', (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementsByName('playButton')[0].click();
      }
    });

    const button = document.createElement('input');
    button.type = 'button';
    button.name = 'playButton';
    button.value = "Let's Play";

    const genNameButton = document.createElement('input');
    genNameButton.type = 'button';
    genNameButton.name = 'genUsernameButton';
    genNameButton.value = "Random Name";

    dom.append(input, button, genNameButton);

    this.nameInputElement = this.add.dom(0, 0, dom);

    this.nameInputElement.addListener('click');

    this.nameInputElement.on('click', (event) => {
      if (event.target.name === 'genUsernameButton') {
        const inputText = this.nameInputElement.getChildByName('nameField');
        inputText.value = this.generateUsername();
      }

      if (event.target.name === 'playButton') {
        const inputText = this.nameInputElement.getChildByName('nameField');
        this.sys.game.globals.player = inputText.value;

        if (inputText.value !== '') {
          this.nameInputElement.removeListener('click');
          this.nameInputElement.setVisible(false);          
          this.gotoScene(Constants.SCENES.MENU_SCENE);
        } else {
          this.nameInputElement.scene.tweens.add({
            targets: this.text,
            alpha: 0.2,
            duration: 250,
            ease: 'Power3',
            yoyo: true,
          });
        }
      }
    });
  }

  generateUsername() {
    const colors  = ['Amethyst', 'Bronze', 'Canary', 'Denim', 'Emerals', 'Fuchsia', 'Gold', 'Honeydew', 'Indigo', 'Jade',  'Khaki',  'Lime',  'Maroon',  'Nickel',  'Olive',  'Purple',  'Quartz', 'Red',  'Sapphire',  'Teal',  'Ultramarine',  'Violet',  'White',  'Xanadu',  'Yellow',  'Zaffre'];
    const animals = ['Alpaca', 'Butterfly', 'Chameleon', 'Dolphin', 'Eagle', 'Flamingo', 'Gecko', 'Hummingbird', 'Iguana', 'Jellyfish', 'Kingfisher', 'Ladybug', 'Mockingbird', 'Narwhal', 'Octopus', 'Panda', 'Quail', 'Roadrunner', 'Starfish', 'Tiger', 'Unicorn', 'Viper', 'Walrus', 'Xerinae', 'Yak', 'Zebra'];

    const randColor  = colors[Math.round(Math.random()  * (colors.length - 1))];
    const randAnimal = animals[Math.round(Math.random() * (animals.length - 1))];

    return randColor + randAnimal;
  }

  resize() {
    const halfWidth = this.cameras.main.width / 2;
    const halfHeight = this.cameras.main.height / 2;
    this.text.setPosition(halfWidth, halfHeight);
    this.nameInputElement.setPosition(halfWidth, halfHeight + this.textBounds.height + 5);
  }
}
