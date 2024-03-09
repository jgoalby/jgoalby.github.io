import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

export default class GenAIPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
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

async function chatCompletions({token, body}) {
  console.log("Before fetch");
  console.log("Token" + token);

  const strToken = "" + token;
  console.log("strToken" + strToken);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${strToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  console.log("After fetch");
  console.log(response);

  return response;
};

async function doSomething() {
  console.log(window.game.globals.player);

  const response = await chatCompletions({
    token: window.game.globals.player,
    body: {
      model: 'gpt-3.5-turbo',
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
  
  console.log("before data");
  const data = await response.json();
  console.log(data);
  const text = data.choices[0].message.content;
  console.log(text);
}
