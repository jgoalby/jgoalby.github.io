import Button from '../components/Button.js';

export default class MenuScene extends Phaser.Scene {
  constructor(deps) {
    super('Menu');
    this.deps = deps;
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(this.cameras.main.width / 2, this.cameras.main.height / 2 - offset * 100, this.cameras.main.width, this.cameras.main.height),
    );
  }

  create() {
    this.sys.game.globals.audio.resumeMusic();

    this.gameButton = new Button(this, 100, 200, 'normalButton', 'hoverButton', 'Play', 'Intro', {
      x: 0.7,
      y: 0.7,
    });
    this.centerButton(this.gameButton, 1.2);

    this.optionsButton = new Button(this, 300, 200, 'normalButton', 'hoverButton', 'Options', 'Options', {
      x: 0.7,
      y: 0.7,
    });
    this.centerButton(this.optionsButton);

    this.creditsButton = new Button(this, 300, 200, 'normalButton', 'hoverButton', 'Credits', 'Credits', {
      x: 0.7,
      y: 0.7,
    });
    this.centerButton(this.creditsButton, -1.2);

    this.leaderboardButton = new Button(this, 300, 200, 'normalButton', 'hoverButton', 'Top 10 Players', 'Leaderboard', {
      x: 0.7,
      y: 0.7,
    });
    this.centerButton(this.leaderboardButton, -2.4);
  }
}
