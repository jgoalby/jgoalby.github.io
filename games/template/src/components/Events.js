let _instance = null;

class EventDispatcher extends Phaser.Events.EventEmitter {
  constructor() {
    super();       
  }

  // Single instance of the event dispatcher.
  static get instance() {
    // CHeck if we already have one made.
    if (_instance == null) {
      // Create a new instance.
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
