
import PhaseTimeline from "./PhaseTimeline";
import IdeaInput from "./IdeaInput";
import PhaseReview from "./PhaseReview";
import { useState } from "react";

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

/**
 * Simulated memory/photos for phased workflow
 */
const exampleOutputs: Record<string, { title: string; content: string }> = {
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
  
  // Handle advancing the phase (approve)
  const advancePhase = () => {
    if (currentPhase < phases.length - 1) setCurrentPhase(p => p + 1);
  };

  // Handle feedback/revision for phase
  const handleFeedback = (val: string) => {
    setFeedback(fdbk => ({ ...fdbk, [currentPhase]: val }));
  };

  // Restart workflow
  const restart = () => {
    setCurrentPhase(0);
    setIdea("");
    setFeedback({});
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Workflow Stepper */}
      <div className="mb-4">
        <PhaseTimeline phases={phases} current={currentPhase} />
      </div>
      {/* CURRENT PHASE PANEL */}
      <div className="bg-card border rounded-xl shadow-sm p-6 space-y-5 transition-all">
        {/* Phase Title and Agent Bubble */}
        <div className="flex gap-3 items-center">
          <span className="text-2xl font-semibold">{phases[currentPhase].label}</span>
          <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${AGENT_COLORS[phases[currentPhase].agent]}`}>{phases[currentPhase].agent}</span>
        </div>
        {/* Idea Input (phase 0) */}
        {currentPhase === 0 && (
          <IdeaInput
            value={idea}
            onChange={e => setIdea(e.target.value)}
            onSubmit={() => {
              if (idea.trim()) advancePhase();
            }}
          />
        )}
        {/* For other phases, show review + feedback */}
        {currentPhase > 0 && (
          <PhaseReview
            phase={phases[currentPhase]}
            output={exampleOutputs[phases[currentPhase].key]}
            feedback={feedback[currentPhase]}
            onFeedbackChange={handleFeedback}
          />
        )}
        {/* Workflow Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-end">
          {/* Approve/advance phase */}
          {currentPhase < phases.length - 1 && (
            <button
              disabled={currentPhase === 0 && !idea.trim()}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded font-bold transition disabled:bg-muted disabled:text-muted-foreground"
              onClick={advancePhase}
            >
              Approve & Continue
            </button>
          )}
          {/* Restart workflow */}
          <button
            className="text-xs text-muted-foreground underline ml-auto"
            onClick={restart}
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentWorkflow;
