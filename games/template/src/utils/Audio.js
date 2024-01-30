export default class AudioStatus {
  constructor() {
    // The music option is on or off defined by the user.
    this._musicOptionOn = true;

    // Whether the music is currently playing.
    this._musicPlaying = false;

    // The background music object.
    this._music = null;
  }

  set musicOptionOn(value)  { this._musicOptionOn = value; }
  get musicOptionOn()       { return this._musicOptionOn; }

  set musicPlaying(value)   { this._musicPlaying = value; }
  get musicPlaying()        { return this._musicPlaying; }

  set music(value)          { this._music = value; }
  get music()               { return this._music; }

  toggleMusic() {
    if (this.musicOptionOn) {
      if (this.musicPlaying) {
        this.pauseMusic();
      } else {
        this.resumeMusic();
      }
    }
  }

  pauseMusic() {
    if (this.musicOptionOn) {
      if (this.musicPlaying) {
        if (this.music) {
          this.music.pause();
        }
        this.musicPlaying = false;
      }
    }
  }

  resumeMusic() {
    if (this.musicOptionOn) {
      if (!this.musicPlaying) {
        if (this.music) {
          this.music.resume();
        }
        this.musicPlaying = true;
      }
    }
  }
}
