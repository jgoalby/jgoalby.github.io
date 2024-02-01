let _instance = null;

class EventDispatcher extends Phaser.Events.EventEmitter {
  constructor() {
    super();       
  }

  static get instance() {
    if (_instance == null) {
      _instance = new EventDispatcher();
    }
    return _instance;
  }
}

const EVENTS = {
  SETTING_CHANGED: 'SETTING_CHANGED',
};

export {
  EVENTS,
  EventDispatcher
};
