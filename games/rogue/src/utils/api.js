/* eslint-disable import/no-unresolved */

//import 'regenerator-runtime/runtime';

export default class Api {
  static basePostUrl() {
    return 'https://cors-anywhere.herokuapp.com/https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/nLw10P9I0j6eCcGMXLVN/scores/';
  }

  static baseGetUrl() {
    return 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/nLw10P9I0j6eCcGMXLVN/scores/';
  }

  static async post(name, score) {
  }

  static async get() {
  }
}
