import Constants from '../constants.js';
import GenAIUI from '../lib/genaiui.js';
import BasePlugin from './BasePlugin.js'

// Key used for local storage of the OpenAI API key.
const LOCAL_STORAGE_OPENAI_TOKEN = 'OpenAIToken';

// The OpenAI Token begins with these characters.
const OPENAI_TOKEN_PREFIX = 'sk-';

// Updated GPT 3.5 Turbo. The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats
// and a fix for a bug which caused a text encoding issue for non-English language function calls. Returns a maximum
// of 4,096 output tokens. 16,385 tokens context. Up to Sep 2021.
const OPENAI_MODEL_3_5_TURBO_0125 = 'gpt-3.5-turbo-0125';

// GPT-4 Turbo model featuring improved instruction following, JSON mode, reproducible outputs, parallel function
// calling, and more. Returns a maximum of 4,096 output tokens. 128,000 tokens context. Up to Apr 2023.
const OPENAI_MODEL_4_1106 = 'gpt-4-1106-preview';

// GPT-4 Turbo. The latest GPT-4 model intended to reduce cases of “laziness” where the model doesn’t complete a task.
// Returns a maximum of 4,096 output tokens. 128,000 tokens context. Up to Dec 2023.
const OPENAI_MODEL_4_0125 = 'gpt-4-0125-preview';

// The actual model we are choosing to use.
const OPENAI_MODEL = OPENAI_MODEL_3_5_TURBO_0125;

// Constants that only this plugin uses.
const CATEGORY                   = 'genai';
const OPEN_AI_TOKEN_OPTION       = 'openAITokenOption';
const OPEN_AI_TOKEN_OPTION_DESC  = 'Paste Open AI Token';
const INPUT_OPTION               = 'inputOption';
const INPUT_OPTION_DESC          = 'GenAI Input Enabled';

const pluginSettings = {
  CLEAR_CACHE: {
    category: CATEGORY,
    name: OPEN_AI_TOKEN_OPTION,
    description: OPEN_AI_TOKEN_OPTION_DESC,
    value: undefined,
    type: Constants.SETTINGS_TYPES.paste
  },
  INPUT_OPTION:{
    category: CATEGORY,
    name: INPUT_OPTION,
    description: INPUT_OPTION_DESC,
    value: false,
    type: Constants.SETTINGS_TYPES.boolean
  }
}

export default class GenAIPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    this.genAIUI = new GenAIUI();
  }

  /**
   * Get the plugin settings.
   * 
   * @returns {Object} The plugin settings.
   */
  getPluginSettings() { return pluginSettings; }

  /**
   * A setting changed. We look to see if it for us and act appropriately.
   * 
   * @param {any} setting The setting.
   */
  onSettingChanged(setting) {
    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === INPUT_OPTION)) {
      // True means setting is set and we want to show the gui otherwise hide.
      if (setting.value) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  /**
   * Show the console.
   */
  show() {
    // Each of these check to make sure there is a change before doing anything.
    // This method can be called from the options menu or directly.
    this.genAIUI.showUI();
    if (this.settings) {
      this.settings.setValue(CATEGORY, INPUT_OPTION, true);
    }
  }

  /**
   * Hide the console.
   */
  hide() {
    // Each of these check to make sure there is a change before doing anything.
    // This method can be called from the options menu or directly.
    this.genAIUI.hideUI();
    if (this.settings) {
      this.settings.setValue(CATEGORY, INPUT_OPTION, false);
    }
  }

  /**
   * Toggle the gui.
   */
  toggle() {
    // Call appropriate function internally so we get the setting changed event.
    if (this.genAIUI.isUIVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Action happened in settings.
   * 
   * @param {any} setting The setting that has changed.
   */
  async onSettingAction(setting) {
    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === OPEN_AI_TOKEN_OPTION)) {
      // The token will be passed as part of the settings.
      const openAIToken = setting.value;

      // Before doing anything with the value, make sure it exists
      if (openAIToken) {
        // The OpenAI token begins with this, so make sure before using.
        if (openAIToken.startsWith(OPENAI_TOKEN_PREFIX)) {
          localStorage.setItem(LOCAL_STORAGE_OPENAI_TOKEN, openAIToken);

          this.customevent.emit(Constants.EVENTS.NOTIFICATION, { notificationText: `OpenAI Token read successfully` });
        } else {
          this.customevent.emit(Constants.EVENTS.NOTIFICATION, { notificationText: `OpenAI Token incorrect format` });
        }
      }
    }
  }

  async test() {
    let openAIToken = localStorage.getItem(LOCAL_STORAGE_OPENAI_TOKEN);

    console.log("TOKEN: " + openAIToken);

    if (openAIToken) {
      const response = await this.chatCompletions({
        token: openAIToken,
        body: {
          model: OPENAI_MODEL,
          "messages": [
            {
              "role": "system",
              "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."
            },
            {
              "role": "user",
              "content": "Compose a poem that explains the concept of recursion in programming."
            }
          ]
        },
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.choices[0].message.content;
        console.log(text);
      } else {
        console.log("Not ok from chat completion.");
        console.log(`${response.status} - ${response.statusText}`)
      }
    }
  }

  async chatCompletions({token, body}) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return response;
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.GENAI_KEY, 
      plugin: this, 
      start: true,
      mapping: Constants.PLUGIN_INFO.GENAI_PLUGIN,
    }
  }
}
