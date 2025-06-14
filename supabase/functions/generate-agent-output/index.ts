
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

    let data: any = null;
    let parseError = null;
    let responseText = "";

    // Try to parse as JSON, otherwise fallback and include text for debug.
    try {
      if (resp.headers.get("content-type")?.includes("application/json")) {
        data = await resp.json();
      } else {
        responseText = await resp.text();
        parseError = "Provider returned non-JSON: " + responseText.slice(0, 256); // log up to 256 chars
      }
    } catch (e) {
      parseError = String(e);
      try {
        responseText = await resp.text(); // capture whatever was received
      } catch {}
    }

    if (!resp.ok) {
      // Try to extract API error message if available
      const errorMsg =
        data?.error?.message ||
        data?.error ||
        (parseError ? `Invalid or non-JSON response from LLM provider: ${parseError}` : "Failed to get LLM result");
      return new Response(JSON.stringify({ error: errorMsg }), { status: 500, headers: corsHeaders });
    }

    // Handle empty or malformed provider responses
    if (!data || !data.choices || !data.choices[0]?.message?.content) {
      // If we got fallback text, surface a useful error
      let errMsg = "LLM provider returned no content.";
      if (parseError) {
        errMsg += ` (ParseError: ${parseError})`;
      } else if (responseText) {
        errMsg += ` (Text: ${responseText.slice(0, 256)})`;
      }
      return new Response(JSON.stringify({ error: errMsg }), { status: 500, headers: corsHeaders });
    }

    const content = data.choices[0].message.content;
    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});
