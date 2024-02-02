interface Window {
    game: Phaser.Game;
    innerWidthPrevious: number;
    innerHeightPrevious: number;
}

interface Globals {
    audio: import('../utils/Audio').default;
    settings: import('../utils/Settings').default;
    player: any;
    score: number;
}

namespace Phaser {
    interface Game {
        globals: Globals;
    }
    interface Scene {
        firebase: import('../plugins/FirebasePlugin').default;
        settings: import('../plugins/SettingsPlugin').SettingsPlugin;
    }
}

interface Element {
    value: any;
}


declare class CheckBoxButton extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number, checked: string, unchecked: string, text: string, getState: () => boolean, setState: (boolean) => void);
}
