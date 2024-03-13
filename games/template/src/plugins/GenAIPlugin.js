import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

const LOCAL_STORAGE_OPENAI_TOKEN = 'OpenAIToken';
const OPENAI_TOKEN_PREFIX = 'sk-';
const OPENAI_MODEL = 'gpt-3.5-turbo';

export default class GenAIPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
  }

  async test() {
    let openAIToken = localStorage.getItem(LOCAL_STORAGE_OPENAI_TOKEN);

    // TODO: This is just temp as its a way to get token, need to change at some point.
    const userToken = String(window.game.globals.player);

    // The OpenAI token begins with this, so make sure before using.
    if (userToken.startsWith(OPENAI_TOKEN_PREFIX)) {
      openAIToken = userToken;
      localStorage.setItem(LOCAL_STORAGE_OPENAI_TOKEN, openAIToken);
    }

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
