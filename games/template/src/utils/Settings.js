export default class Settings {
  constructor() {
    // The music option is on or off defined by the user.
    this._musicOption = true;
  }

  set musicOption(value)  { this._musicOption = value; }
  get musicOption()       { return this._musicOption; }
  toggleMusicOption()     { this.musicOption = !this.musicOption; }
}
