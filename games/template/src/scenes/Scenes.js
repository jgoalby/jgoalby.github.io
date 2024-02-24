import BootScene from './BootScene.js';
import PreloaderScene from './PreloaderScene.js';
import InputScene from './GetInputScene.js';
import MenuScene from './MenuScene.js';
import OptionsScene from './OptionsScene.js';
import CreditsScene from './CreditsScene.js';
import LeaderboardScene from './LeaderboardScene.js';
import InstructionsScene from './InstructionsScene.js';
import GameScene from './GameScene.js';
import GameOverScene from './GameOverScene.js';

const BOOT_SCENE         = 'Boot';
const PRELOADER_SCENE    = 'Preloader';
const INPUT_SCENE        = 'Input';
const MENU_SCENE         = 'Menu';
const OPTIONS_SCENE      = 'Options';
const CREDITS_SCENE      = 'Credits';
const LEADERBOARD_SCENE  = 'Leaderboard';
const INSTRUCTIONS_SCENE = 'Instructions';
const GAME_SCENE         = 'Game';
const GAMEOVER_SCENE     = 'GameOver';

export default class Scenes {
  static get BOOT_SCENE()         { return BOOT_SCENE; }
  static get PRELOADER_SCENE()    { return PRELOADER_SCENE; }
  static get INPUT_SCENE()        { return INPUT_SCENE; }
  static get MENU_SCENE()         { return MENU_SCENE; }
  static get OPTIONS_SCENE()      { return OPTIONS_SCENE; }
  static get CREDITS_SCENE()      { return CREDITS_SCENE; }
  static get LEADERBOARD_SCENE()  { return LEADERBOARD_SCENE; }
  static get INSTRUCTIONS_SCENE() { return INSTRUCTIONS_SCENE; }
  static get GAME_SCENE()         { return GAME_SCENE; }
  static get GAMEOVER_SCENE()     { return GAMEOVER_SCENE; }
  
  static create(game) {
    // Add all of the scenes here
    game.scene.add(this.BOOT_SCENE,         new BootScene());
    game.scene.add(this.PRELOADER_SCENE,    new PreloaderScene());
    game.scene.add(this.INPUT_SCENE,        new InputScene());
    game.scene.add(this.MENU_SCENE,         new MenuScene());
    game.scene.add(this.OPTIONS_SCENE,      new OptionsScene());
    game.scene.add(this.CREDITS_SCENE,      new CreditsScene());
    game.scene.add(this.LEADERBOARD_SCENE,  new LeaderboardScene());
    game.scene.add(this.INSTRUCTIONS_SCENE, new InstructionsScene());
    game.scene.add(this.GAME_SCENE,         new GameScene());
    game.scene.add(this.GAMEOVER_SCENE,     new GameOverScene());

    // Start the first scene
    game.scene.start(this.BOOT_SCENE);
  }
}
