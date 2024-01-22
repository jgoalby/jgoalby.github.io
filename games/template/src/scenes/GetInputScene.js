export default class InputScene extends Phaser.Scene {
  constructor(deps) {
    super('Input');
    this.deps = deps;
    this.text;
    this.textBounds;
    this.nameInputElement;
  }

  preload() {
  }

  create() {
    console.log("In create of GetInputScene");
    this.text = this.add.text(0, 0, 'Please enter your name!', {
      color: 'white',
      fontSize: '20px ',
    });
    this.text.setOrigin(0.5, 0.5);

    this.textBounds = this.text.getBounds();

    const dom = document.createElement('div');
    const input = document.createElement('input');
    input.name = 'nameField';
    input.placeholder = 'Enter your name';
    const button = document.createElement('input');
    button.type = 'button';
    button.name = 'playButton';
    button.value = "Let's Play";

    dom.append(input, button);

    this.nameInputElement = this.add.dom(0, 0, dom);

    this.nameInputElement.addListener('click');

    this.nameInputElement.on('click', (event) => {
      if (event.target.name === 'playButton') {
        const inputText = this.nameInputElement.getChildByName('nameField');
        this.sys.game.globals.player = inputText.value;
        if (inputText.value !== '') {
          this.nameInputElement.removeListener('click');
          this.nameInputElement.setVisible(false);
          this.scene.start('Menu');
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

    /*this.tweens.add({
      targets: this.nameInputElement,
      y: 300,
      duration: 3000,
      ease: 'Power3',
    });*/

    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  resize() {
    console.log("In resize of GetInputScene");

    this.text.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
    this.nameInputElement.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2 + this.textBounds.height + 5);
  }
}
