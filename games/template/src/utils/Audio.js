export default class Audio {
  constructor() {
    // The music option is on or off defined by the user.
    this._musicOptionOn = true;

    // Whether the music is currently playing.
    this._musicPlaying = false;

    // The background music object.
    this._music = null;
  }

  // TODO: Have a way to set the music volumne

  set musicOptionOn(value)  { this._musicOptionOn = value; }
  get musicOptionOn()       { return this._musicOptionOn; }
  toggleMusicOption()       { this.musicOptionOn = !this.musicOptionOn; }

  set musicPlaying(value)   { this._musicPlaying = value; }
  get musicPlaying()        { return this._musicPlaying; }

  set music(value)          { this._music = value; }
  get music()               { return this._music; }

  toggleMusic() {
    if (this.musicPlaying) {
      // We don't care if the music options is on or off. We still will pause if playing.
      this.pauseMusic();
    } else {
      // This only plays/resumes msuic if the music option is on.
      this.playMusic();
    }
  }

  pauseMusic() {
    if (this.musicPlaying) {
      // Mmake sure the variable contains an object.
      if (this.music) {
        if (this.music.isPlaying) {
          this.music.pause();
        }
      }
      // Make sure the music is not playing even if no music specified.
      this.musicPlaying = false;
    }
  }

  playMusic() {
    if ((this.musicOptionOn) && (!this.musicPlaying)) {
      // We can only resume the music if there is a valid music object.
      if (this.music) {
        if (this.music.isPaused) {
          this.music.resume();
        } else {
          this.music.play();
        }

        // Music is only playing if we could play/resume the music.
        this.musicPlaying = true;
      }
    }
  }
}
