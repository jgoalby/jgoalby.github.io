interface Window {
    game: Phaser.Game;
    pluginManager: Phaser.Plugins.PluginManager;
    innerWidthPrevious: number;
    innerHeightPrevious: number;

    // The following are used in the service worker self, which is Window it seems.
    clientObject: any;
    sendCacheMessages: boolean;
    sendMessage: any;
}

declare const esprima: typeof import('esprima');

interface Globals {
    player: any;
    score: number;
}

namespace Phaser {
    interface Game {
        globals: Globals;
    }
    interface Scene {
        initsetup: InitSetupPlugin;
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

interface ButtonOptions {
    label?: string;
    actionFn?: () => void;
    setting?: any;
}

interface CheckBoxButtonOptions {
    label?: string;
    numvalues?: number;
    setting?: any;
}

interface NumberTextInputOptions {
    label?: string;
    setting?: any;
}

interface NotificationOptions {
    notificationText: string;
    level?: string;
    onCompleteFn?: (any) => void;
}

interface NotificationEvent {
    notificationText: string;
    level?: string;
}

declare class CheckBoxButton extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number, checked: string, unchecked: string, text: string, getState: () => boolean, setState: (boolean) => void);
}

type InitSetupPlugin = import('../plugins/InitSetupPlugin').default;
type FirebasePlugin = import('../plugins/FirebasePlugin').default;
type ServiceWorkerPlugin = import('../plugins/ServiceWorkerPlugin').default;
type ConsolePlugin = import('../plugins/ConsolePlugin').default;
type NotificationPlugin = import('../plugins/NotificationPlugin').default;
type EventPlugin = import('../plugins/EventPlugin').default;
type SettingsPlugin = import('../plugins/SettingsPlugin').default;
type IntrospectPlugin = import('../plugins/IntrospectPlugin').default;
type CachePlugin = import('../plugins/CachePlugin').default;
type AudioPlugin = import('../plugins/AudioPlugin').default;
