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
    BASIC_SCENE: string;
}

interface PluginInfoProxy {
    INIT_SETUP_KEY: string;
    INIT_SETUP_MAPPING: string;
    EVENT_KEY: string;
    EVENT_MAPPING: string;
    SETTINGS_KEY: string;
    SETTINGS_MAPPING: string;
    SERVICE_WORKER_KEY: string;
    SERVICE_WORKER_MAPPING: string;
    WINDOW_KEY: string;
    WINDOW_MAPPING: string;
    CONSOLE_KEY: string;
    CONSOLE_MAPPING: string;
    NOTIFICATION_KEY: string;
    NOTIFICATION_MAPPING: string;
    INTROSPECT_KEY: string;
    INTROSPECT_MAPPING: string;
    CACHE_KEY: string;
    CACHE_MAPPING: string;
    STYLES_KEY: string;
    STYLES_MAPPING: string;
    AUDIO_KEY: string;
    AUDIO_MAPPING: string;
    REFLECTION_KEY: string;
    REFLECTION_MAPPING: string;
    SHORTCUTS_KEY: string;
    SHORTCUTS_MAPPING: string;
    GENAI_KEY: string;
    GENAI_MAPPING: string;
    FIREBASE_KEY: string;
    FIREBASE_MAPPING: string;
    UNIT_TEST_KEY: string;
    UNIT_TEST_MAPPING: string;
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
