import Data from './data.js';

export default class Globals {
  static globals;

  static create() {
    Globals.globals = {
      player: '',
      score: 0,
      data: new Data(),
    };
    return Globals.globals;
  }

  /**
   * Get a global value.
   *
   * @param {string} valueName The name of the value to get.
   * @returns {any | undefined} The value requested or undefined.
   */
  static getInstance(valueName) {
    if (Globals.globals) {
      if (valueName in Globals.globals) {
        return Globals.globals[valueName];
      } else {
        return undefined;
      }
    }

    return undefined;
  }
}
