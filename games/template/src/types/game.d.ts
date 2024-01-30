interface Window {
    game: Phaser.Game;
    innerWidthPrevious: number;
    innerHeightPrevious: number;
}

interface AudioStatus {
    musicOn: boolean;
    bgMusicPlaying: boolean;
    musicPaused: boolean;
}

interface Globals {
    audioStatus: AudioStatus;
    bgMusic: any;
    player: any;
    score: number;
}

namespace Phaser {
    interface Game {
        globals: Globals;
        firebase: import('../plugins/FirebasePlugin').default;
    }
}

interface Element {
    value: any;
}
