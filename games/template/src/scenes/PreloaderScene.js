import Constants from '../constants.js';
import BaseScene from './BaseScene.js';
import Scenes from './Scenes.js';

export default class PreloaderScene extends BaseScene {
  constructor() {
    super('Preloader');
    this.splash_landscape = null;
    this.splash_portrait = null;
    this.continueText = null;
  }

  preload() {
    const { width, height } = this.cameras.main;

    // Make the logo fully transparent initially so we can fade it in.
    this.splash_landscape = this.add.image(width / 2, height / 2, 'splash_landscape').setOrigin(0.5).setScale(2);
    this.splash_landscape.alpha = 0; 
    this.splash_portrait = this.add.image(width / 2, height / 2, 'splash_portrait').setOrigin(0.5).setScale(1);
    this.splash_portrait.alpha = 0; 

    // Fade the logo in over a period of time.
    this.time.delayedCall(10, () => {
      this.tweens.add({
        targets: this.isLandscape() ? this.splash_landscape : this.splash_portrait,
        alpha: 1,
        duration: 5000,
        ease: 'Power2'
      });
    });

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect(450, 450, 350, 18, 7);

    var continueMessage = '';
    if (this.sys.game.device.os.desktop){
      continueMessage = 'Press any key to continue';
    }
    else{
      continueMessage = 'Tap to continue';
    }

    this.continueText = this.make.text({
      x: 0,
      y: 0,
      text: continueMessage,
      style: {
        font: '30px monospace',
        color: '#ffffff',
      },
    });
    this.continueText.setOrigin(0.5, 0.5);

    const loadingText = this.make.text({
      x: width / 1.9,
      y: 420,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 1.9,
      y: 460,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 1.9,
      y: 490,
      text: '',
      style: {
        font: '20px monospace',
        color: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${Math.floor(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRoundedRect(450, 450, 300 * value, 18, 6);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.input.keyboard.once('keydown', () => {
        this.gotoScene(Scenes.INPUT_SCENE);
      });
      this.input.once(Phaser.Input.Events.POINTER_DOWN, () => {
        this.gotoScene(Scenes.INPUT_SCENE);
      });
    });

    this.load.image('tile1', Constants.GENERAL.ASSETS_PATH + 'tile/city.png');
    this.load.image('build', Constants.GENERAL.ASSETS_PATH + 'tile/Example.png');
    this.load.tilemapTiledJSON('map1', Constants.GENERAL.ASSETS_PATH + 'tile/city.json');

    this.load.image('normalButton', Constants.GENERAL.ASSETS_PATH + 'ui/buttonNormal.png');
    this.load.image('hoverButton', Constants.GENERAL.ASSETS_PATH + 'ui/buttonHighLight.png');
    this.load.image('uncheckedBox', Constants.GENERAL.ASSETS_PATH + 'ui/grey_box.png');
    this.load.image('checkedBox', Constants.GENERAL.ASSETS_PATH + 'ui/blue_boxCheckmark.png');

    this.load.audio('bgMusic', [Constants.GENERAL.ASSETS_PATH + 'audio/intro.mp3']);
    this.load.audio('fire', [Constants.GENERAL.ASSETS_PATH + 'audio/fire.mp3']);
    this.load.audio('enemyFire', [Constants.GENERAL.ASSETS_PATH + 'audio/enemyFire.mp3']);

    this.load.spritesheet('player', Constants.GENERAL.ASSETS_PATH + 'tank/player.png', {
      frameWidth: 256,
      frameHeight: 256,
    });
    this.load.spritesheet('playerTankBarrel', Constants.GENERAL.ASSETS_PATH + 'tank/playerTankBarrel.png', {
      frameWidth: 256,
      frameHeight: 256,
    });
    //this.load.image('playerTankBarrel', Constants.GENERAL.ASSETS_PATH + 'tank/playerTankBarrel.png');

    this.load.spritesheet('bullet', Constants.GENERAL.ASSETS_PATH + 'tank/HeavyShell.png', {
      frameWidth: 256,
      frameHeight: 256,
    });
    //this.load.image('bullet', Constants.GENERAL.ASSETS_PATH + 'tank/HeavyShell.png');

    this.load.spritesheet('explosion', Constants.GENERAL.ASSETS_PATH + 'tank/explosion.png', {
      frameWidth: 60,
      frameHeight: 60,
    });

    this.load.spritesheet('enemy', Constants.GENERAL.ASSETS_PATH + 'tank/enemy.png', {
      frameWidth: 256,
      frameHeight: 256,
    });
    this.load.spritesheet('enemyTankBarrel', Constants.GENERAL.ASSETS_PATH + 'tank/enemyTankBarrel.png', {
      frameWidth: 256,
      frameHeight: 256,
    });

    this.load.image('tombstone', Constants.GENERAL.ASSETS_PATH + 'misc/tombstone.png');

    this.load.image('kenny', Constants.GENERAL.ASSETS_PATH + 'misc/kennyBlue.png')
  }

  create_scene() {
    // Make sure the audio plugin is enabled before accessing it.
    if (this.audio) {
      // Add the background music. Audio plugin takes care of volume.
      this.audio.addMusic(this.sound.add('bgMusic'));
    }
  }

  resize() {
    this.splash_landscape.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
    this.splash_portrait.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
    this.continueText.setPosition(this.cameras.main.width / 2, this.cameras.main.height - ((this.continueText.height / 2) + 10));
  }
}
