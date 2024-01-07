export default class Constants {
    static get GAME_WIDTH() {
        return 800;
    }
    
    static get GAME_HEIGHT() {
        return 600;
    }
    
    static get GAME_BACKGROUND_COLOR() {
        return '#000';
    }
    
    static get GAME_TYPE() {
        return Phaser.AUTO;
    }
    
    static get GAME_PARENT() {
        return 'game';
    }
    
    static get GAME_TITLE() {
        return 'Game';
    }
    
    static get ASSETS_PATH() {
        return './src/Assets/';
    }
}
