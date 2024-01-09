export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, normal, hover, text, targetScene, scaleButton = null) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, normal).setInteractive();

    if (scaleButton) {
      this.button.setScale(scaleButton.x, scaleButton.y);
    }

    this.text = this.scene.add.text(0, 0, text, { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      this.scene.scene.start(targetScene);
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(hover);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(normal);
    });

    this.scene.add.existing(this);
  }
}

/*

Alternative way of doing a button:

function pointerOver(gameObjet, hex = 0xEFF0F1) {
    gameObjet.on('pointerover', function () {
        this.setTint(hex);
    });
    pointerOut(gameObjet);
}

function pointerOut(gameObjet) {
    gameObjet.on('pointerout', function () {
        this.clearTint();
    });
}

function pointerUp(res = () => { }, gameObjet) {
    gameObjet.on('pointerup', () => {
        res();
    });
}

export {
    pointerOver,
    pointerOut,
    pointerUp
}

*/