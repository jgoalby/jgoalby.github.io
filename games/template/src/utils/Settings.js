export default class Settings {
  constructor() {
    this._musicOption = true;
    this._soundOption = true;
  }

  set musicOption(value)  { this._musicOption = value; }
  get musicOption()       { return this._musicOption; }
  toggleMusicOption()     { this.musicOption = !this.musicOption; }

  set soundOption(value)  { this._soundOption = value; }
  get soundOption()       { return this._soundOption; }
  toggleSoundOption()     { this.soundOption = !this.soundOption; }
}
