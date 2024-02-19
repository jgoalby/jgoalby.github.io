interface Window {
    game: Phaser.Game;
    innerWidthPrevious: number;
    innerHeightPrevious: number;
}

interface Globals {
    player: any;
    score: number;
}

namespace Phaser {
    interface Game {
        globals: Globals;
    }
    interface Scene {
        settings: import('../plugins/SettingsPlugin').SettingsPlugin;
        customevent: import('../plugins/EventPlugin').default;
        introspect: import('../plugins/IntrospectPlugin').default;
        audio: import('../plugins/AudioPlugin').default;
        firebase: import('../plugins/FirebasePlugin').default;
    }
}

namespace Phaser.Plugins {
    interface BasePlugin {
        getVersion(): string;
    }
}

interface Element {
    value: any;
}

interface Console {
    log2DivHasBeenInitialized: boolean;
    log2div_enabled: boolean;
}

declare class CheckBoxButton extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number, checked: string, unchecked: string, text: string, getState: () => boolean, setState: (boolean) => void);
}
