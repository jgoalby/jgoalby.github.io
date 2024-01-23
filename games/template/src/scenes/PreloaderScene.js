import Constants from '../constants.js';

export default class PreloaderScene extends Phaser.Scene {
  constructor(deps) {
    super('Preloader');
    this.deps = deps;
  }

  preload() {
    const { width, height } = this.cameras.main;

    const name = this.make.text({
      x: 10,
      y: 150,
      text: 'Code by John',
      style: {
        font: '15px monospace',
        color: '#ffffff',
      },
    });

    this.time.delayedCall(10, () => {
      this.tweens.add({
        targets: this.gameLogo,
        alpha: 0,
        duration: 3000,
        ease: 'Power2',
        onComplete: () => {
          this.gameLogo = this.add.image(width / 2, height / 2, 'gameLogo').setOrigin(0.5, 0.5).setScale(2, 2);
        },
      });
    });

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect(450, 450, 350, 18, 7);

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
      percentText.setText(`${value * 100}%`);
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
      this.time.delayedCall(1000, () => {
        name.destroy();
        this.startTitleScene();
      });
    });

    this.load.image('tile1', Constants.ASSETS_PATH + 'tile/city.png');
    this.load.image('build', Constants.ASSETS_PATH + 'tile/Example.png');
    this.load.tilemapTiledJSON('map1', Constants.ASSETS_PATH + 'tile/city.json');

    this.load.image('normalButton', Constants.ASSETS_PATH + 'ui/buttonNormal.png');
    this.load.image('hoverButton', Constants.ASSETS_PATH + 'ui/buttonHighLight.png');
    this.load.image('box', Constants.ASSETS_PATH + 'ui/grey_box.png');
    this.load.image('checkedBox', Constants.ASSETS_PATH + 'ui/blue_boxCheckmark.png');

    this.load.audio('bgMusic', [Constants.ASSETS_PATH + 'audio/intro.mp3']);
    this.load.audio('introVoice', [Constants.ASSETS_PATH + 'audio/intro.mp3']);
    this.load.audio('fire', [Constants.ASSETS_PATH + 'audio/fire.mp3']);
    this.load.audio('enemyFire', [Constants.ASSETS_PATH + 'audio/enemyFire.mp3']);

    this.load.spritesheet('player', Constants.ASSETS_PATH + 'tank/player.png', {
      frameWidth: 256,
      frameHeight: 256,
    });
    this.load.spritesheet('playerTankBarrel', Constants.ASSETS_PATH + 'tank/playerTankBarrel.png', {
      frameWidth: 256,
      frameHeight: 256,
    });
    //this.load.image('playerTankBarrel', Constants.ASSETS_PATH + 'tank/playerTankBarrel.png');

    this.load.spritesheet('bullet', Constants.ASSETS_PATH + 'tank/HeavyShell.png', {
      frameWidth: 256,
      frameHeight: 256,
    });
    //this.load.image('bullet', Constants.ASSETS_PATH + 'tank/HeavyShell.png');

    this.load.spritesheet('explosion', Constants.ASSETS_PATH + 'tank/explosion.png', {
      frameWidth: 60,
      frameHeight: 60,
    });

    this.load.spritesheet('enemy', Constants.ASSETS_PATH + 'tank/enemy.png', {
      frameWidth: 256,
      frameHeight: 256,
    });
    this.load.spritesheet('enemyTankBarrel', Constants.ASSETS_PATH + 'tank/enemyTankBarrel.png', {
      frameWidth: 256,
      frameHeight: 256,
    });

    this.load.image('tombstone', Constants.ASSETS_PATH + 'misc/tombstone.png');
  }

  startTitleScene() {
    this.scene.start('Input');
  }

  create() {
    this.sys.game.globals.bgMusic = this.sound.add('bgMusic', {
      volume: 0.5,
      loop: true,
    });
  }
}
