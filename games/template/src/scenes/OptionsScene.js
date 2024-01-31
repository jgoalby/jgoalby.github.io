import Button from '../components/ButtonCallback.js';
import CheckBoxButton from '../components/CheckBoxButton.js';
import Scenes from './Scenes.js';

export default class OptionsScene extends Phaser.Scene {
  constructor(deps) {
    super('Options');
    this.deps = deps;
    this.heading = null;
    this.button = null;
    this.musicCheckBox = null;
  }

  create() {
    this.heading = this.add.text(0, 0, 'Options', {
      fontSize: '32px',
      color: '#fff',
    });
    this.heading.setOrigin(0.5, 0);
    this.heading.setY(50);

    this.musicCheckBox = new CheckBoxButton(this, 0, 0, 'checkedBox', 'box', 'Music Enabled',
                                            () => { this.getMusicState() },
                                            (checked) => { this.setMusicState(checked) });

    this.button = new Button(this, 0, 0, 'normalButton', 'hoverButton', 'Menu', () => { this.gotoMainMenu() });

    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  getMusicState() {
    return this.sys.game.globals.audio.musicOptionOn;
  }

  setMusicState(checked) {
    console.log("setting music state", checked);
    const { audio } = this.sys.game.globals;
    audio.musicOptionOn = checked;

    if (checked) {
      audio.resumeMusic();
    } else {
      audio.pauseMusic();
    }
  }

  gotoMainMenu() {
    this.scale.off('resize', this.resize, this);
    this.scene.start(Scenes.MENU_SCENE);
  }

  resize() {
    this.heading.setX(this.cameras.main.width / 2);
    this.musicCheckBox.setPosition(this.cameras.main.width / 4, this.heading.y + 50);
    this.button.setPosition(this.cameras.main.width / 2, this.cameras.main.height - ((this.button.height / 2) + 10));
  }
}
