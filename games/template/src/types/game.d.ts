interface Window {
    game: Phaser.Game;
    innerWidthPrevious: number;
    innerHeightPrevious: number;
}

interface AudioModel {
    musicOn: boolean;
    bgMusicPlaying: boolean;
    musicPaused: boolean;
}

interface Globals {
    model: AudioModel;
    bgMusic: any;
    player: any;
    score: number;
}

namespace Phaser {
    interface Game {
        globals: Globals;
    }
}

interface Element {
    value: any;
}