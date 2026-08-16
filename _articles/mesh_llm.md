---
layout: default
title: "Mesh LLM"
date: 2026-08-15
---

## What is Mesh LLM?

I became aware of Mesh LLM with the recent release of [Buzz](https://buzz.xyz/) from Jack Dorsey's Block Company.  Buzz provides a shared compute feature using the [Mesh LLM](https://github.com/Mesh-LLM/mesh-llm/) project.  Members of a relay can share LLM compute with each other.

There's an [introduction blog post](https://engineering.block.xyz/blog/buzz-sharing-compute-powered-by-meshllm) on the Buzz website.

There's a video [here](https://conffab.com/presentation/what-if-you-never-needed-an-api-key-again-building-a-mesh-llm-from-spare-compute/?gl=nlhvzUAbn1Ac) from Michael Neale of Block.

You can do some cool things with Buzz using Mesh LLM:
- Share models with other users that may not have as capable hardware
- Provide mixture of experts by having multiple models respond
- Distribute inference so that huge models can be split over machines

Buzz is a really easy way to setup a local model and have it instantly usable.

It looks like Buzz disables the Mesh LLM web console. The [source](https://github.com/block/buzz) is available if you want to enable the feature yourself.  Change `desktop/src-tauri/Cargo.toml` `mesh-llm-host-runtime` features to:

```bash
features = ["dynamic-native-runtime", "web-ui"]
```

However there are still 2 ports exposed by Buzz for REST requests.  There's port 9337 and port 3131.  Port 9337 is an OpenAI compatible port.  Port 3131 is the management API, and where the web console would normally be available.

## Port 3131 Example Requests

From the public API reference:

```bash
curl -s http://127.0.0.1:3131/api/status | jq
curl -s http://127.0.0.1:3131/api/models | jq
curl -s http://127.0.0.1:3131/api/runtime | jq
curl -s http://127.0.0.1:3131/api/runtime/intents | jq
curl -s http://127.0.0.1:3131/api/runtime/activity | jq
curl -s http://127.0.0.1:3131/api/diagnostics | jq
curl -s http://127.0.0.1:3131/api/plugins | jq
```

And some more routes shown in the source:

```bash
GET     /api/discover
GET     /api/diagnostics
GET     /api/status
GET     /api/models
GET     /api/runtime
GET     /api/runtime/events
GET     /api/runtime/endpoints
GET     /api/runtime/processes
GET     /api/runtime/stages
GET     /api/runtime/intents
GET     /api/runtime/activity
GET     /api/search
GET     /api/plugins
GET     /api/plugins/endpoints
GET     /api/plugins/providers
GET     /api/model-interests
GET     /api/model-targets

GET/POST/DELETE /mcp
```

## Port 9337 OpenAI

Documented OpenAI-compatible API  The official MeshLLM documentation gives the base URL as `http://localhost:9337/v1` and explicitly says a placeholder API key such as dummy is sufficient for clients that require one. To see what Buzz currently makes available through the mesh:

```bash
curl -s http://127.0.0.1:9337/v1/models | jq
```

To make a request, first grab one of those model IDs:
```bash
MODEL="$(
  curl -s http://127.0.0.1:9337/v1/models |
  jq -r '.data[0].id'
)"

echo "$MODEL"
```

Then:

```bash
curl -s http://127.0.0.1:9337/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer dummy' \
  -d "$(jq -n \
    --arg model "$MODEL" \
    '{
      model: $model,
      messages: [
        {role: "user", content: "Explain what MeshLLM is in one sentence."}
      ]
    }')" |
jq
```

Streaming is supported through the same endpoint by setting "stream": true. Tool calling and structured-output support depend on the particular model being routed to.

For reference:

- [MeshLLM OpenAI-Compatible API — models, chat completions, streaming, tool calling, etc.](https://meshllm.cloud/docs/pages/openai-compatible-api/)
- [MeshLLM API Reference — the 3131 management API.](https://meshllm.cloud/docs/pages/api-reference/)
