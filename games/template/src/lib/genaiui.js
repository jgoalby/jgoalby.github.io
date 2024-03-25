import BaseUI from './baseui.js';

// Single place to change the project name if needed.
const PROJECT_NAME               = 'GenAIUI';

// Base project prefix for IDs etc.
const BASE_PROJECT_ID            = PROJECT_NAME.toLowerCase();

// Defaults for boolean options so they are easy to change. If you are a user you can change these via options.
const DEFAULT_SHOW_CONTAINER      = false;

export default class GenAIUI extends BaseUI {
  constructor(options) {
    // If the options parameter is not set, then set it to an empty object so we do not fail later.
    if (!options) { options = {}; }

    options.baseProjectId = options.baseProjectId || BASE_PROJECT_ID;
    options.showContainer = options.showContainer || DEFAULT_SHOW_CONTAINER;

    super(options);
  }

  getDefaultShowContainer() {
    return DEFAULT_SHOW_CONTAINER;
  }

  getContainerID() {
    return this.genContainerId;
  }
}
