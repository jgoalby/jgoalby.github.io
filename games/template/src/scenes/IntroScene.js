import Button from '../components/Button.js';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  create() {
    const text = this.add.text(10, 10, '', {
      font: '32px',
      color: '#ffffff',
    });

    text.setText([
      'Objectives\n',
      '1. Kill As many enemies as you can',
      '2. Keep your distance from the enemy',
      '\nControls\n',
      '- Use the mouse pointer to point to an enemy tank',
      '- Use left click or Space button to fire',
      '- Use W, S, A and D buttons to move around',
      '- Use E to boost speed',
      '- Rotate the tank turret around with the mouse',
      '\nTips\n',
      '- Your health will fill back up every two seconds',
      '- The enemy tanks will detect you faster \nas your score increases',
      '\n\nGood Luck!',
    ]);

    new Button(this, 580, 580, 'normalButton', 'hoverButton', 'Chicken Out', 'Menu', {
      x: 0.7,
      y: 0.7,
    });

    new Button(this, 980, 580, 'normalButton', 'hoverButton', 'Lets Go!', 'Game', {
      x: 0.7,
      y: 0.7,
    });
  }
}
