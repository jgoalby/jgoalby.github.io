interface Window {
    game: Phaser.Game;
    innerWidthPrevious: number;
    innerHeightPrevious: number;
}

interface Globals {
    player: any;
    bgMusic: any;
}

namespace Phaser {
    interface Game {
        globals: Globals;
    }
}

interface Element {
    value: any;
}