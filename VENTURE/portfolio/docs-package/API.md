# API Reference — `generate-agent-output` Edge Function

Source: `supabase/functions/generate-agent-output/index.ts` (Deno, `std@0.168.0` HTTP server).

This is the app's only backend endpoint. It is a thin **LLM router**: the frontend sends a prompt plus a provider key, the function forwards a chat-completion request to the chosen provider, normalizes the response, and returns just the generated text.

---

## Endpoint

```
POST /functions/v1/generate-agent-output
Content-Type: application/json
```

- Deployed as a Supabase Edge Function; locally it runs via `supabase functions serve generate-agent-output`.
- The function code itself performs **no authentication or input sanitization** — any JSON body reaching it is processed. (Hosted Supabase projects gate function invocation with JWT/apikey checks by default; the function adds nothing on top.)
- **CORS:** every response carries `Access-Control-Allow-Origin: *` and `Access-Control-Allow-Headers: authorization, x-client-info, apikey, content-type`. An `OPTIONS` preflight returns an empty 200 response with those headers.

## Request body

```json
{
  "prompt": "string — the user/composed prompt (required in practice)",
  "llm": "openai | lmstudio | openrouter",
  "system": "string — optional system prompt"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `prompt` | string | effectively yes | Sent as the `user` message. Not validated; a missing prompt is forwarded as-is to the provider. |
| `llm` | string | yes | Anything other than the three known values (including omission) returns the 400 error below. |
| `system` | string | no | When present, prepended as a `system` message before the user message. |

The frontend (`src/components/AgentWorkflow.tsx`) composes `prompt` as: the raw idea for phase 1, or the concatenation of all previous phases' outputs plus the idea for later phases, and sends a per-phase `system` prompt.

## The three provider modes

| `llm` value | Upstream URL | Model (hardcoded) | Auth header |
|---|---|---|---|
| `openai` | `https://api.openai.com/v1/chat/completions` | `gpt-4o` | `Authorization: Bearer $OPENAI_API_KEY` |
| `lmstudio` | `$LM_STUDIO_BASE_URL/v1/chat/completions` (default `http://localhost:1234`) | `TheBloke/Mixtral-8x7B-Instruct-v0.1-GPTQ` | none |
| `openrouter` | `https://openrouter.ai/api/v1/chat/completions` | `deepseek/deepseek-chat-v3-0324:free` | `Authorization: Bearer $OPENROUTER_API_KEY` |

All three use the OpenAI-compatible chat-completions shape:

```json
{
  "model": "<hardcoded per mode>",
  "messages": [
    { "role": "system", "content": "<system, if provided>" },
    { "role": "user", "content": "<prompt>" }
  ]
}
```

No `temperature`, `max_tokens`, or streaming options are set — provider defaults apply, and the call is non-streaming.

**LM Studio caveat:** the request originates from wherever the *function* runs. The `localhost:1234` default is only reachable when the function is served locally next to LM Studio; a cloud-deployed edge function cannot reach a developer machine's localhost.

## Responses

### Success — `200`

```json
{ "content": "<the model's message text>" }
```

Exactly one field. `content` is `choices[0].message.content` from the provider response. This response carries `Content-Type: application/json` plus the CORS headers.

### Error — `400` (unknown provider)

```json
{ "error": "Unknown LLM" }
```

Returned when `llm` is not one of `openai` / `lmstudio` / `openrouter`.

### Error — `500` (upstream returned non-OK)

```json
{
  "error": "<provider error message, or 'Upstream error (<status>): ...'>",
  "status": 502,
  "responseText": "<first 512 chars of the raw provider response>",
  "parseError": null
}
```

- `error` prefers the provider's own `error.message` (or `error`) field when the body parsed as JSON; otherwise it falls back to `Upstream error (<status>)`.
- `status` is the **upstream** HTTP status; the function's own status is 500.
- `parseError` is a string only if the body looked like JSON but failed to parse; otherwise `null`.

### Error — `500` (provider returned no usable content)

```json
{
  "error": "LLM provider returned no content or wrong output format.",
  "status": 200,
  "responseText": "<first 512 chars of the raw provider response>",
  "parseError": null
}
```

Returned when the upstream call succeeded but `choices[0].message.content` is missing — e.g. a non-JSON body, an empty body, or an unexpected schema.

### Error — `500` (unhandled exception)

```json
{ "error": "<String(err)>" }
```

Catch-all for anything thrown inside the handler (e.g. an unparseable request body or a network failure reaching the provider). The function never returns an empty error body by design: the upstream response is always read as text first, JSON-parsed only if it looks like JSON, and diagnostics are echoed back in the error payload.

**Implementation note:** the error responses set only the CORS headers (no explicit `Content-Type`); bodies are JSON strings regardless. Clients should key off HTTP status plus the presence of `content` vs `error` — which is exactly what the frontend does (`if (!fnResp.ok || !fnData.content) throw ...`).

## Environment variables

| Variable | Used by mode | Required | Default |
|---|---|---|---|
| `OPENAI_API_KEY` | `openai` | yes, for that mode (an unset key produces an upstream 401, surfaced as the 500 upstream-error shape) | — |
| `OPENROUTER_API_KEY` | `openrouter` | yes, for that mode (same failure behavior) | — |
| `LM_STUDIO_BASE_URL` | `lmstudio` | no | `http://localhost:1234` |

Set them as Supabase function secrets (`supabase secrets set NAME=value`) for deployed use, or as shell environment variables for local serving.

## Example call

```sh
curl -sS -X POST "$FUNCTIONS_ORIGIN/functions/v1/generate-agent-output" \
  -H "Content-Type: application/json" \
  -d '{
    "llm": "openrouter",
    "system": "Plan a technical stack and architecture for this app.",
    "prompt": "Project manager for biologists"
  }'
# → {"content":"..."}
```

---

*This document is a portfolio sample: professional documentation written for the author's own open prototype project, shown as an example of the codebase-documentation service.*
