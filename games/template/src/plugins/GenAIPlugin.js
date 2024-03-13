import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

const LOCAL_STORAGE_OPENAI_TOKEN = 'OpenAIToken';
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

const pluginSettings = {
  CLEAR_CACHE: {
    category: CATEGORY,
    name: OPEN_AI_TOKEN_OPTION,
    description: OPEN_AI_TOKEN_OPTION_DESC,
    value: undefined,
    type: Constants.SETTINGS_TYPES.paste
  }
}

export default class GenAIPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
  }

  /**
   * Get the plugin settings.
   * 
   * @returns {Object} The plugin settings.
   */
  getPluginSettings() { return pluginSettings; }

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
      plugin: GenAIPlugin, 
      start: true,
      mapping: Constants.PLUGIN_INFO.GENAI_MAPPING,
    }
  }
}
