import Constants from '../constants.js';
import Button from '../components/Button.js';
import BaseScene from './BaseScene.js';

export default class LeaderboardScene extends BaseScene {
  constructor() {
    super(Constants.SCENES.LEADERBOARD_SCENE);

    this.dom = null;
    this.button = null;
  }

  createScene() {
    this.heading = this.add.text(0, 0, 'Leaderboard', Constants.STYLES.HEADING_TEXT);
    this.heading.setOrigin(0.5);
    this.heading.setY(50);

    const tableElement = document.createElement('table');
    const headercontainer = document.createElement('tr');
    const header1 = document.createElement('th');
    header1.innerText = 'Name';
    const header2 = document.createElement('th');
    header2.innerText = 'Score';
    headercontainer.append(header1, header2);

    tableElement.append(headercontainer);

    const arrayOfusers = [];
    arrayOfusers.push({ user: 'Player One', score: 12000 });
    arrayOfusers.push({ user: 'Player Two', score: 50000 });
    arrayOfusers.push({ user: 'Player Three', score: 12300 });
    arrayOfusers.push({ user: 'Player Four', score: 43000 });
    arrayOfusers.push({ user: 'Player Five', score: 5000 });
    arrayOfusers.push({ user: 'Player Six', score: 14500 });
    arrayOfusers.push({ user: 'Player Seven', score: 33500 });
    arrayOfusers.push({ user: 'Player Eight', score: 2150000 });
    arrayOfusers.push({ user: 'Player Nine', score: 53000 });
    arrayOfusers.push({ user: 'Player Ten', score: 72000 });
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
    this.dom = this.add.dom(0, 0, tableElement);
    this.dom.setOrigin(0.5, 0);
    this.dom.setY(this.heading.y + this.heading.height + 20);

    this.button = new Button(this, { label: 'Menu', actionFn: () => { this.gotoScene(Constants.SCENES.MENU_SCENE) } });
  }

  resize() {
    this.heading.setX(this.cameras.main.width / 2);
    this.dom.setX(this.cameras.main.width / 2);
    this.button.setPosition(this.cameras.main.width / 2, this.cameras.main.height - ((this.button.height / 2) + 10));
  }
}
