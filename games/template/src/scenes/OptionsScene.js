import Button from '../components/Button.js';

export default class OptionsScene extends Phaser.Scene {
  constructor(deps) {
    super('Options');
    this.deps = deps;
  }

  updateAudio() {
    const { audio } = this.sys.game.globals;

    if (audio.musicOn === false) {
      this.musicButton.setTexture('box');
      audio.pauseMusic();
    } else {
      this.musicButton.setTexture('checkedBox');
      audio.resumeMusic();
    }
  }

  create() {
    this.add.text(500, 100, 'Options', {
      fontSize: 40,
    });
    this.musicButton = this.add.image(500, 200, 'checkedBox');
    this.musicText = this.add.text(550, 190, 'Music Enabled', {
      fontSize: 24,
    });

    this.musicButton.setInteractive();

    const { audio } = this.sys.game.globals;

    this.musicButton.on('pointerdown', () => {
      audio.musicOn = !audio.musicOn;
      this.updateAudio();
    });

    new Button(this, 180, 510, 'normalButton', 'hoverButton', 'Menu', 'Menu', {
      x: 0.7,
      y: 0.7,
    });

    this.updateAudio();
  }
}
