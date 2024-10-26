import Constants from '../constants.js';
import Enemy from '../components/Enemy.js';
import Path from '../components/Paths.js';
import BaseScene from './BaseScene.js';

export default class GameScene extends BaseScene {
  constructor(config) {
    if (!config) { config = {} }
    config.key = config.key || Constants.SCENES.GAME_SCENE;
    super(config);

    this.colliders = [];
    this.reloaded = true;
    this.paths = {};
    this.toRespawn = 0;
    this.enemyGroup = [];
    this.scoreNumber = 0;
  }

  create() {
    this.addSound();
    this.addMap();
    this.addPaths();
    this.addPlayerTank();
    this.addEnemies();
    this.addAnimation();
    this.setControllers();
    this.setCamera();
    this.setColliders();
    this.createScoreBox();
    this.createHealthBox();

    this.respawnInterval = setInterval(() => {
      this.respawn();
    }, 10000);

    this.regenerateHealth = setInterval(() => {
      if (this.playerTankContainer && this.playerTankContainer.health < 500) {
        this.playerTankContainer.health += 5;
        this.health.setText(`Health: ${this.playerTankContainer.health}`);
      }
    }, 2000);
  }

  addSound() {
    // Make sure we have the audio plugin.
    if (this.AUDIO_PLUGIN) {
      this.AUDIO_PLUGIN.playMusic();
    }

    this.fire = this.sound.add('fire', {
      volume: 0.5,
    });
  }

  addMap() {
    this.map = this.make.tilemap({
      key: 'map1',
    });
    const street = this.map.addTilesetImage('street', 'tile1', 32, 32, 0, 0);
    const components = this.map.addTilesetImage('_Example', 'build', 32, 32, 0, 0);
    this.map.createLayer('grass', components);
    this.map.createLayer('misc', components);
    this.curbs = this.map.createLayer('street', street);
    this.boundary = this.map.createLayer('boundary', street);
    this.buildings = this.map.createLayer('building', components);
    this.colliders.push(this.curbs, this.boundary, this.buildings);

    this.add.sprite(350, 420, 'enemy')
      .setScale(0.3, 0.3)
      .setTint(0x706f6f);
    this.add.sprite(390, 440, 'enemyTankBarrel')
      .setScale(0.3, 0.3)
      .setTint(0x706f6f);
  }

  addPlayerTank() {
    this.player = this.physics.add.sprite(0, 0, 'player').setScale(0.3, 0.3);
    this.player.setMass(100);
    this.playerTankContainer = this.add.container(1700, 2200, [this.player]).setSize(64, 64);
    this.playerTankContainer.depth = 2;
    this.playerTankContainer.health = 500;
    this.physics.world.enable(this.playerTankContainer);

    this.playerTankBarrel = this.physics.add.sprite(100, 100, 'playerTankBarrel').setScale(0.3, 0.3).setOrigin(0.5, 0.7);
    this.playerTankBarrel.depth = 10;

    this.physics.add.collider(this.playerTankContainer, this.curbs);
    this.physics.add.collider(this.playerTankContainer, this.buildings);
  }

  addPaths() {
    this.newPathInstance = new Path(this.add.graphics());
    this.paths = this.newPathInstance.getAllPaths();
  }

  addEnemies() {
    for (const key in this.paths) {
      if (this.paths[key]) {
        this.createEnemyTank(this.paths[key]);
      }
    }
  }

  addAnimation() {
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }

  setControllers() {
    this.arrows = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      e: Phaser.Input.Keyboard.KeyCodes.E,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
    this.mouse = this.input.mousePointer;
    this.input.setPollAlways();

    this.input.on(Phaser.Input.Events.POINTER_OVER, () => {
      this.fireAtEnemy();
    });
    this.input.keyboard.on('keydown-SPACE', () => {
      this.fireAtEnemy();
    });
  }

  setColliders() {
    this.colliders.forEach(object => {
      object.setCollisionByProperty({
        collides: true,
      });
    });
  }

  setCamera() {
    this.camera = this.cameras.main;
    this.camera.startFollow(this.playerTankContainer)
      .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
      .zoomTo(0.8, 1000);
  }

  createScoreBox() {
    this.createBox(-130, -60, 150);
    this.score = this.createText(-130, -60, `Score: ${this.scoreNumber}`);
  }

  createHealthBox() {
    this.createBox(1150, -60, 200);
    this.health = this.createText(1150, -60, `Health: ${this.playerTankContainer.health}`);
  }

  createBox(x, y, width) {
    const box = this.add.graphics();
    box.fillStyle(0x222222, 0.8);
    box.fillRoundedRect(x, y, width, 50, 7);
    box.setScrollFactor(0, 0);
    box.depth = 20;
    return box;
  }

  createText(x, y, newtext) {
    const text = this.add.text(x, y, newtext, {
      font: '40px gothic',
      color: '#ffffff',
    });
    text.setStroke('#000', 4);
    text.setShadow(2, 2, '#333333', 2, true, true);
    text.setScrollFactor(0, 0);
    text.depth = 20;
    return text;
  }

  createEnemyTank(path) {
    const newEnemy = new Enemy(this, this.scene, path);
    newEnemy.follow(this.newPathInstance.pathSetting);
    this.physics.add.collider(this.playerTankContainer, newEnemy);
    this.enemyGroup.push(newEnemy);
  }

  respawn() {
    Object.keys(this.paths).forEach(path => {
      this.createEnemyTank(this.paths[path]);
    });
  }

  rotateBarrel() {
    // We need to convert the barrel position to screen coordinates
    var barrelScreenX = (this.playerTankBarrel.body.x - this.camera.worldView.x) * this.camera.zoom;
    var barrelScreenY = (this.playerTankBarrel.body.y - this.camera.worldView.y) * this.camera.zoom;

    const rotate = Phaser.Math.Angle.Between(barrelScreenX, barrelScreenY, this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY);
    this.playerTankBarrel.rotation = rotate + Math.PI / 2;
  }

  explode(x, y) {
    const explosion = this.add.sprite(x, y, 'explosion');
    explosion.play('explode');
    explosion.once('animationcomplete', () => {
      explosion.destroy();
      explosion.removeAllListeners();
    });
  }

  fireAtEnemy() {
    const { x } = this.playerTankBarrel;
    const { y } = this.playerTankBarrel;
    const newBullet = this.physics.add.sprite(x, y, 'bullet')
      .setScale(0.45, 0.45)
      .setOrigin(0.5, 0.5)
      .setSize(1, 30)
      .setOffset(65, 50);

    newBullet.rotation += this.playerTankBarrel.rotation;
    newBullet.depth = 1;
    newBullet.mass = 0;
    this.physics.add.collider(newBullet, this.buildings, function () {
      this.explode(newBullet.x, newBullet.y);
      newBullet.destroy(true);
    }, null, this);

    this.physics.add.collider(newBullet, this.boundary, function () {
      this.explode(newBullet.x, newBullet.y);
      newBullet.destroy(true);
    }, null, this);

    this.enemyGroup.forEach(enemy => {
      this.physics.add.collider(newBullet, enemy, function () {
        this.explode(newBullet.x, newBullet.y);
        newBullet.destroy(true);
        enemy.health -= 20;
        if (enemy.health <= 0) {
          this.scoreNumber += 10;
          this.score.setText(`Score: ${this.scoreNumber}`);
          this.toRespawn += 1;
          enemy.destroy(true);
          enemy.removeAllListeners();
          enemy.turret.setActive(false);
          enemy.turret.setTint(0x706f6f);
        }
      }, null, this);
    });

    // Make sure we have the audio plugin.
    if (this.AUDIO_PLUGIN) {
      this.AUDIO_PLUGIN.playSound(this.fire);
    }
    this.physics.moveTo(newBullet, this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY, 500);
  }

  updatePlayerHealth() {
    this.playerTankContainer.health -= 4;
    this.health.setText(`Health: ${this.playerTankContainer.health}`);
    if (this.playerTankContainer.health <= 0) {
      this.playerTankContainer.destroy(true);
    }
  }

  gameOver() {
    this.registry.destroy();
    this.events.off();
    clearInterval(this.respawnInterval);
    clearInterval(this.regenerateHealth);
    this.DATA_PLUGIN.score = this.scoreNumber;
    this.scoreNumber = 0;
    this.colliders = [];
    this.enemyGroup = [];
    this.toRespawn = 0;
    this.scene.start(Constants.SCENES.GAMEOVER_SCENE);
  }

  update() {
    if (this.playerTankContainer.health <= 0) {
      this.gameOver();
      return;
    }

    this.enemyGroup.forEach(enemy => {
      if (enemy && enemy.body) {
        if (this.scoreNumber >= 70) { enemy.update(600); } else if (this.scoreNumber >= 120) { enemy.update(800); } else { enemy.update(400); }
      }
    });

    this.playerTankContainer.body.velocity.x = 0;
    this.playerTankContainer.body.velocity.y = 0;
    this.playerTankContainer.body.angularVelocity = 0;

    this.playerTankBarrel.x = this.playerTankContainer.x;
    this.playerTankBarrel.y = this.playerTankContainer.y;
    this.rotateBarrel();

    const speed = 200;
    const velocityX = Math.cos(this.playerTankContainer.rotation) * speed;
    const velocityY = Math.sin(this.playerTankContainer.rotation) * speed;

    if (this.arrows.left.isDown) {
      this.playerTankBarrel.body.angularVelocity = -200;
    } else if (this.arrows.right.isDown) {
      this.playerTankBarrel.body.angularVelocity = 200;
    }

    let boost = 1;
    if (this.keys.e.isDown) {
      boost = 1.5;
    }

    if (this.keys.w.isDown) {
      this.playerTankContainer.body.velocity.y = -velocityX * boost;
      this.playerTankContainer.body.velocity.x = velocityY * boost;
    }
    if (this.keys.s.isDown) {
      this.playerTankContainer.body.velocity.y = velocityX * boost;
      this.playerTankContainer.body.velocity.x = -velocityY * boost;
    }
    if (this.keys.a.isDown) {
      this.playerTankContainer.body.angularVelocity = -200;
    }
    if (this.keys.d.isDown) {
      this.playerTankContainer.body.angularVelocity = 200;
    }
  }
}
