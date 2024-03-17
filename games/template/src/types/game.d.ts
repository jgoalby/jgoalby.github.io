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

interface ScenesProxy {
    BOOT_SCENE: string;
    PRELOADER_SCENE: string;
    LOGIN_SCENE: string;
    MENU_SCENE: string;
    OPTIONS_SCENE: string;
    CREDITS_SCENE: string;
    LEADERBOARD_SCENE: string;
    INSTRUCTIONS_SCENE: string;
    GAME_SCENE: string;
    GAMEOVER_SCENE: string;
    EXAMPLE_SCENE: string;
}

// The _PLUGIN is used for mapping the plugin in Scenes.

interface PluginInfoProxy {
    INIT_SETUP_KEY: string;
    INIT_SETUP_PLUGIN: string;
    EVENT_KEY: string;
    EVENT_PLUGIN: string;
    SETTINGS_KEY: string;
    SETTINGS_PLUGIN: string;
    SERVICE_WORKER_KEY: string;
    SERVICE_WORKER_PLUGIN: string;
    WINDOW_KEY: string;
    WINDOW_PLUGIN: string;
    CONSOLE_KEY: string;
    CONSOLE_PLUGIN: string;
    NOTIFICATION_KEY: string;
    NOTIFICATION_PLUGIN: string;
    INTROSPECT_KEY: string;
    INTROSPECT_PLUGIN: string;
    CACHE_KEY: string;
    CACHE_PLUGIN: string;
    STYLES_KEY: string;
    STYLES_PLUGIN: string;
    AUDIO_KEY: string;
    AUDIO_PLUGIN: string;
    REFLECTION_KEY: string;
    REFLECTION_PLUGIN: string;
    SHORTCUTS_KEY: string;
    SHORTCUTS_PLUGIN: string;
    GENAI_KEY: string;
    GENAI_PLUGIN: string;
    FIREBASE_KEY: string;
    FIREBASE_PLUGIN: string;
    UNIT_TEST_KEY: string;
    UNIT_TEST_PLUGIN: string;
    DATA_KEY: string;
    DATA_PLUGIN: string;
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
    shortcut? : string;
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
type WindowPlugin = import('./WindowPlugin.js').default;
type ConsolePlugin = import('../plugins/ConsolePlugin').default;
type NotificationPlugin = import('../plugins/NotificationPlugin').default;
type EventPlugin = import('../plugins/EventPlugin').default;
type SettingsPlugin = import('../plugins/SettingsPlugin').default;
type IntrospectPlugin = import('../plugins/IntrospectPlugin').default;
type CachePlugin = import('../plugins/CachePlugin').default;
type StylesPlugin = import('../plugins/StylesPlugin.js').default;
type ReflectionPlugin = import('../plugins/ReflectionPlugin.js').default;
type ShortcutsPlugin = import('../plugins/ShortcutsPlugin.js').default;
type GenAIPlugin = import('../plugins/GenAIPlugin.js').default;
type AudioPlugin = import('../plugins/AudioPlugin').default;
type UnitTestPlugin = import('../plugins/UnitTestPlugin.js').default;
