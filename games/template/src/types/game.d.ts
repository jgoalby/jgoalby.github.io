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
        settings: SettingsPlugin;
        customevent: EventPlugin;
        introspect: IntrospectPlugin;
        audio: AudioPlugin;
        firebase: FirebasePlugin;
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

type FirebasePlugin = import('../plugins/FirebasePlugin').default;
type ConsolePlugin = import('../plugins/ConsolePlugin').default;
type EventPlugin = import('../plugins/EventPlugin').default;
type SettingsPlugin = import('../plugins/SettingsPlugin').default;
type IntrospectPlugin = import('../plugins/IntrospectPlugin').default;
type AudioPlugin = import('../plugins/AudioPlugin').default;
