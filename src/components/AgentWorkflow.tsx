import PhaseTimeline from "./PhaseTimeline";
import IdeaInput from "./IdeaInput";
import PhaseReview from "./PhaseReview";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Phases
const phases = [
  { key: "idea", label: "App Idea", agent: "Dream Weaver" },
  { key: "draft", label: "Concept Draft", agent: "Dream Weaver" },
  { key: "plan", label: "Technical Plan", agent: "Master Builder" },
  { key: "ui", label: "UI/UX Mockup", agent: "Aesthetic Artist" },
  { key: "code", label: "Code Generation", agent: "Code Sage" },
  { key: "qa", label: "Review/Test", agent: "Quality Guardian" },
  { key: "deploy", label: "Deploy/Run", agent: "Deployment Master" }
];

const AGENT_COLORS: Record<string, string> = {
  "Dream Weaver": "bg-indigo-100 text-indigo-700",
  "Master Builder": "bg-emerald-100 text-emerald-700",
  "Aesthetic Artist": "bg-pink-100 text-pink-600",
  "Code Sage": "bg-blue-100 text-blue-700",
  "Quality Guardian": "bg-yellow-100 text-yellow-700",
  "Deployment Master": "bg-gray-100 text-gray-700"
};

type Output = { title: string; content: string };

const exampleOutputs: Record<string, Output> = {
  "draft": { title: "Concept Draft", content: "A desktop-first app where users describe ideas, and AI generates full-stack applications via modular agents with memory and local deployment." },
  "plan": { title: "Technical Plan", content: "- Frontend: Vite + React + Tailwind\n- Modular agent backend (Dream Weaver, Master Builder, etc)\n- LLM router abstraction\n- In-memory logs, plugin ready, mock mode switch" },
  "ui": { title: "UI Mockup", content: "(UI wireframe: Clean dashboard with workflow & memory panels, agent sidebar controls, phase progress visualizer)" },
  "code": { title: "Code Summary", content: "// Each agent module in `/agents` folder\n// Example: agent/dream-weaver.ts handles idea → draft\n// Main workflow engine coordinates phases\n// Pluggable LLM router used by all agents\n" },
  "qa": { title: "QA/Testing", content: "Code passes tests and linting; workflows tested via mock and real modes; plugin system validates extensions." },
  "deploy": { title: "Deployment", content: "App runs fully locally; ZIP export of generated code is enabled." }
};

const LLM_OPTIONS = [
  { key: "openai", label: "OpenAI" },
  { key: "lmstudio", label: "LM Studio" },
];

const SYSTEM_PROMPTS: Record<string, string> = {
  idea: "User is submitting an app idea. Respond with a friendly acknowledgement.",
  draft: "Draft a concise app product/concept description from the user input.",
  plan: "Plan a technical stack and architecture for this app.",
  ui: "Describe a UI/UX mockup for this app idea.",
  code: "Summarize how code modules and structure would be generated.",
  qa: "Suggest quality assurance and testing tasks for this project.",
  deploy: "Describe how to deploy/run/export the app.",
};

const defaultOutputs = {}; // We'll set each phase's output dynamically

const AgentWorkflow = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [idea, setIdea] = useState<string>("");
  const [feedback, setFeedback] = useState<Record<number, string>>({});
  const [appIdeaId, setAppIdeaId] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<Record<string, Output>>(defaultOutputs);
  const [loading, setLoading] = useState(false);
  const [llm, setLLM] = useState(LLM_OPTIONS[0].key); // default OpenAI
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // Fetch recent logs from project_logs
    const fetchLogs = async () => {
      const { data, error } = await supabase.from("project_logs").select("*").order("created_at", { ascending: false }).limit(10);
      if (!error && data) setLogs(data);
    };
    fetchLogs();
  }, [currentPhase]);

  // 1. Send request to edge function for each agent phase and store outputs/logs in Supabase
  const handleGenerateOutput = async (phaseIdx: number, inputIdea: string, prevOutputs: Record<string, Output>) => {
    const phase = phases[phaseIdx];
    setLoading(true);
    try {
      // Compose prompt for agent
      const prevOutputStr = Object.values(prevOutputs)
        .map(o => o.content)
        .join("\n");
      const thisPrompt = phaseIdx === 0 ? inputIdea : prevOutputStr + "\n" + idea;

      // Real LLM call via edge function
      const fnResp = await fetch("/functions/v1/generate-agent-output", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: thisPrompt,
          llm,
          system: SYSTEM_PROMPTS[phase.key],
        }),
      });
      const fnData = await fnResp.json();

      if (!fnResp.ok || !fnData.content) {
        throw new Error(fnData.error || "LLM error");
      }

      // Save output locally for fast UI
      const thisOutput: Output = {
        title: phase.label,
        content: fnData.content,
      };
      setOutputs((o) => ({ ...o, [phase.key]: thisOutput }));

      // 2. Write outputs & logs to Supabase for persistent memory
      if (phaseIdx === 0) {
        // Insert app idea and save ID
        const { data, error } = await supabase
          .from("app_ideas")
          .insert({ title: inputIdea.trim(), description: fnData.content })
          .select()
          .maybeSingle();
        if (!error && data) setAppIdeaId(data.id);
        await supabase.from("project_logs").insert({
          event: `Submitted app idea: "${inputIdea.trim()}"`,
          log_level: "info"
        });
      } else if (appIdeaId) {
        await supabase.from("agent_outputs").insert({
          agent_name: phase.agent,
          app_idea_id: appIdeaId,
          content: fnData.content,
          phase: phase.key,
        });
        await supabase.from("project_logs").insert({
          event: `Phase complete: ${phase.label}`,
          log_level: "info"
        });
      }
      // Refresh logs view
      const { data: logsData } = await supabase.from("project_logs").select("*").order("created_at", { ascending: false }).limit(10);
      if (logsData) setLogs(logsData);

      setLoading(false);
      return thisOutput;
    } catch (err: any) {
      setLoading(false);
      throw err;
    }
  };

  // Advance phase and handle LLM calls/storage
  const advancePhase = async () => {
    if (loading) return;
    try {
      const phaseIdx = currentPhase;
      const prevOutputs = outputs;

      const genOut = await handleGenerateOutput(phaseIdx, idea, prevOutputs);

      if (currentPhase < phases.length - 1) setCurrentPhase((p) => p + 1);
    } catch (e) {
      // Optionally notify error
      alert("Error generating output: " + (e.message || e));
    }
  };

  // Feedback handling - stays local, but could be sent to Supabase
  const handleFeedback = (val: string) => {
    setFeedback(fdbk => ({ ...fdbk, [currentPhase]: val }));
  };

  const restart = () => {
    setCurrentPhase(0);
    setIdea("");
    setFeedback({});
    setAppIdeaId(null);
    setOutputs({});
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="mb-4 flex items-center gap-3">
        <PhaseTimeline phases={phases} current={currentPhase} />
        <div className="ml-auto flex gap-2">
          <select value={llm} onChange={e => setLLM(e.target.value)}
            className="px-2 py-1 rounded border text-sm bg-muted"
            aria-label="Choose LLM provider"
          >
            {LLM_OPTIONS.map(o => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
          <span className="text-xs text-muted-foreground">LLM mode: <b>{LLM_OPTIONS.find(x=>x.key===llm)?.label}</b></span>
        </div>
      </div>
      <div className="bg-card border rounded-xl shadow-sm p-6 space-y-5 transition-all">
        <div className="flex gap-3 items-center">
          <span className="text-2xl font-semibold">{phases[currentPhase].label}</span>
          <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${AGENT_COLORS[phases[currentPhase].agent]}`}>{phases[currentPhase].agent}</span>
        </div>
        {currentPhase === 0 && (
          <IdeaInput
            value={idea}
            onChange={e => setIdea(e.target.value)}
            onSubmit={advancePhase}
          />
        )}
        {currentPhase > 0 && (
          <PhaseReview
            phase={phases[currentPhase]}
            output={outputs[phases[currentPhase].key]}
            feedback={feedback[currentPhase]}
            onFeedbackChange={handleFeedback}
          />
        )}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-end">
          {currentPhase < phases.length - 1 && (
            <button
              type="button"
              disabled={loading || (currentPhase === 0 && !idea.trim())}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded font-bold transition disabled:bg-muted disabled:text-muted-foreground"
              onClick={advancePhase}
            >
              {loading ? (
                <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>
              ) : "Approve & Continue"}
            </button>
          )}
          <button
            className="text-xs text-muted-foreground underline ml-auto"
            onClick={restart}
          >
            Start Over
          </button>
        </div>
      </div>
      {/* Project logs synced live from Supabase */}
      <div className="bg-muted rounded p-4 mt-2">
        <div className="font-semibold mb-2 text-xs text-muted-foreground">Recent Project Logs (live Supabase sync)</div>
        <ul className="text-xs font-mono space-y-1">
          {logs.length === 0 && <li>No logs yet.</li>}
          {logs.map(l => (
            <li key={l.id}>{l.created_at?.slice(0,19).replace('T',' ')} — <b>{l.event}</b> <span className="italic text-muted-foreground">({l.log_level})</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AgentWorkflow;
