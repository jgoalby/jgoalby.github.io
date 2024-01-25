import Button from '../components/Button.js';

export default class LeaderboardScene extends Phaser.Scene {
  constructor(deps) {
    super('Leaderboard');
    this.deps = deps;
    this.dom = null;
    this.button = null;
  }

  create() {
    const tableElement = document.createElement('table');
    const headercontainer = document.createElement('tr');
    const header1 = document.createElement('th');
    header1.innerText = 'Player Name';
    const header2 = document.createElement('th');
    header2.innerText = 'Player Score';
    headercontainer.append(header1, header2);

    tableElement.append(headercontainer);

    const arrayOfusers = [];
    arrayOfusers.push({ user: 'Player One', score: 12000 });
    arrayOfusers.push({ user: 'Player Two', score: 50000 });
    const sorted = arrayOfusers.sort((a, b) => b.score - a.score);

    for (let i = 0; i < sorted.length; i += 1) {
      if (i >= 10) {
        break;
      }
      const row = document.createElement('tr');
      const data1 = document.createElement('td');
      data1.innerText = arrayOfusers[i].user;
      const data2 = document.createElement('td');
      data2.innerText = String(arrayOfusers[i].score);
      row.append(data1, data2);
      tableElement.append(row);
    }
    this.dom = this.add.dom(600, 200, tableElement);

    this.button = new Button(this, 180, 510, 'normalButton', 'hoverButton', 'Menu', 'Menu');

    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  resize() {
    this.dom.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
    this.button.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2 + 300);
    //this.text.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
    //this.nameInputElement.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2 + this.textBounds.height + 5);
  }
}
