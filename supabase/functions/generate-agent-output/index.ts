
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const openAiKey = Deno.env.get("OPENAI_API_KEY");
const openRouterKey = Deno.env.get("OPENROUTER_API_KEY");
const lmStudioBase = Deno.env.get("LM_STUDIO_BASE_URL") || "http://localhost:1234"; // default LM Studio address

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, llm, system } = await req.json();
    let apiUrl = "";
    let headers: any = {};
    let body: object;

    if (llm === "openai") {
      apiUrl = "https://api.openai.com/v1/chat/completions";
      headers = {
        Authorization: `Bearer ${openAiKey}`,
        "Content-Type": "application/json"
      };
      body = {
        model: "gpt-4o",
        messages: [
          ...(system ? [{ role: "system", content: system }] : []),
          { role: "user", content: prompt }
        ],
      };
    } else if (llm === "lmstudio") {
      apiUrl = `${lmStudioBase}/v1/chat/completions`;
      headers = { "Content-Type": "application/json" };
      body = {
        model: "TheBloke/Mixtral-8x7B-Instruct-v0.1-GPTQ",
        messages: [
          ...(system ? [{ role: "system", content: system }] : []),
          { role: "user", content: prompt }
        ],
      };
    } else if (llm === "openrouter") {
      apiUrl = "https://openrouter.ai/api/v1/chat/completions";
      headers = {
        Authorization: `Bearer ${openRouterKey}`,
        "Content-Type": "application/json"
      };
      body = {
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          ...(system ? [{ role: "system", content: system }] : []),
          { role: "user", content: prompt }
        ],
      };
    } else {
      return new Response(JSON.stringify({ error: "Unknown LLM" }), { status: 400, headers: corsHeaders });
    }

    const resp = await fetch(apiUrl, { method: "POST", headers, body: JSON.stringify(body) });

    // Always first read response as text, then try to parse as JSON
    let responseText = await resp.text();
    let data: any = null;
    let parseError: string | null = null;
    try {
      // Only try JSON parse if text looks like JSON (avoid blank string errors)
      if (responseText.trim().startsWith("{") || responseText.trim().startsWith("[")) {
        data = JSON.parse(responseText);
      }
    } catch (e) {
      parseError = String(e);
    }

    // Validation: always return well-formed error JSON if not ok or empty/invalid
    if (!resp.ok) {
      // Log errors with text for diagnostics
      const errorMsg = (data?.error?.message || data?.error || `Upstream error (${resp.status}): ${parseError ? parseError : ''}`) as string;
      return new Response(
        JSON.stringify({
          error: errorMsg,
          status: resp.status,
          responseText: responseText.slice(0, 512),
          parseError,
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    // No usable data or output from provider
    if (!data || !data.choices || !data.choices[0]?.message?.content) {
      let errMsg = "LLM provider returned no content or wrong output format.";
      return new Response(
        JSON.stringify({
          error: errMsg,
          status: resp.status,
          responseText: responseText.slice(0, 512),
          parseError
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Success case: return content as expected
    const content = data.choices[0].message.content;
    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    // Always return error as JSON, never as empty response
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: corsHeaders }
    );
  }
});
