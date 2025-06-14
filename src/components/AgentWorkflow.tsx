
import PhaseTimeline from "./PhaseTimeline";
import IdeaInput from "./IdeaInput";
import PhaseReview from "./PhaseReview";
import { useState } from "react";
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

const AgentWorkflow = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [idea, setIdea] = useState<string>("");
  const [feedback, setFeedback] = useState<Record<number, string>>({});
  const [appIdeaId, setAppIdeaId] = useState<string | null>(null);

  // Store output as user progresses
  const [outputs, setOutputs] = useState<Record<string, Output>>({ ...exampleOutputs });

  // Handle phase advancement and Supabase writes
  const advancePhase = async () => {
    if (currentPhase === 0) {
      // Store idea in Supabase
      const { data, error } = await supabase
        .from("app_ideas")
        .insert({ title: idea.trim(), description: "", created_at: new Date().toISOString() })
        .select()
        .maybeSingle();
      if (!error && data) {
        setAppIdeaId(data.id);
        // Log idea creation
        await supabase.from("project_logs").insert({
          event: `Submitted app idea: "${idea.trim()}"`,
          log_level: "info"
        });
      }
    } else if (appIdeaId) {
      // Insert phase output into agent_outputs
      const key = phases[currentPhase].key;
      const out = outputs[key] || exampleOutputs[key];
      if (out) {
        await supabase.from("agent_outputs").insert({
          agent_name: phases[currentPhase].agent,
          app_idea_id: appIdeaId,
          content: out.content,
          phase: key
        });
        // Log phase completion
        await supabase.from("project_logs").insert({
          event: `Completed phase: ${phases[currentPhase].label}`,
          log_level: "info"
        });
      }
    }
    if (currentPhase < phases.length - 1) setCurrentPhase((p) => p + 1);
  };

  // Handle feedback/revision for phase
  const handleFeedback = (val: string) => {
    setFeedback((fdbk) => ({ ...fdbk, [currentPhase]: val }));
  };

  // Restart workflow, optionally clearing backend data
  const restart = () => {
    setCurrentPhase(0);
    setIdea("");
    setFeedback({});
    setAppIdeaId(null);
    setOutputs({ ...exampleOutputs });
  };

  // Example: Fetch existing ideas (demonstration)
  // (not UI-exposed in this snippet, but here's sample fetch logic)
  // useEffect(() => {
  //   supabase.from("app_ideas").select("*").then(console.log);
  // }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="mb-4">
        <PhaseTimeline phases={phases} current={currentPhase} />
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
              disabled={currentPhase === 0 && !idea.trim()}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded font-bold transition disabled:bg-muted disabled:text-muted-foreground"
              onClick={advancePhase}
            >
              Approve & Continue
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
      {/* Example: Manual fetch to verify backend sync */}
      <div className="hidden">
        {/* 
        // Example (for dev): Show recently inserted ideas, outputs, project logs
        // <AppIdeasViewer />
        // <AgentOutputsViewer />
        // <ProjectLogsViewer />
        */}
      </div>
    </div>
  );
};

export default AgentWorkflow;

