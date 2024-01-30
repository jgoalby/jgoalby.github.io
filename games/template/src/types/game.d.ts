interface Window {
    game: Phaser.Game;
    innerWidthPrevious: number;
    innerHeightPrevious: number;
}

interface Globals {
    audio: import('../utils/Audio').default;
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
