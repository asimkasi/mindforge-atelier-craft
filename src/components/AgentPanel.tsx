
import { useState } from "react";
import { Code, Check, X } from "lucide-react";

const agents = [
  { name: "Dream Weaver", description: "Generates app ideas/drafts." },
  { name: "Master Builder", description: "Designs the architecture." },
  { name: "Aesthetic Artist", description: "Creates UI/UX mockups." },
  { name: "Code Sage", description: "Generates clean code." },
  { name: "Quality Guardian", description: "Tests and checks the output." },
  { name: "Deployment Master", description: "Runs/deploys generated apps." },
];

const llms = [
  { key: "openai", label: "OpenAI" },
  { key: "deepseek", label: "DeepSeek" },
  { key: "lmstudio", label: "LM Studio" },
  { key: "openrouter", label: "OpenRouter" },
  { key: "mock", label: "Mock Mode" }
];

const AgentPanel = () => {
  const [selectedLLM, setSelectedLLM] = useState("mock");
  const [upgradeRequests, setUpgradeRequests] = useState([
    { agent: "Aesthetic Artist", text: "Try Material You style for buttons." },
    { agent: "Quality Guardian", text: "Integrate Playwright for UI tests." }
  ]);

  const handleLLMChange = (llm: string) => setSelectedLLM(llm);

  return (
    <section className="p-6 flex flex-col gap-7">
      <div>
        <div className="font-semibold text-lg">LLM Router</div>
        <div className="flex flex-wrap gap-2 mt-2">
          {llms.map(llm => (
            <button
              key={llm.key}
              onClick={() => handleLLMChange(llm.key)}
              className={`px-3 py-1 rounded border text-sm transition flex items-center gap-2 ${
                selectedLLM === llm.key
                  ? "bg-primary text-primary-foreground font-bold border-primary"
                  : "bg-muted text-muted-foreground border-border"
              }`}
            >
              <Code size={16} /> {llm.label}
            </button>
          ))}
        </div>
        <div className="pt-3">
          <span className="text-xs font-mono">
            {selectedLLM === "mock"
              ? "No external API calls (safe demo mode)"
              : `Active LLM: ${llms.find(l => l.key === selectedLLM)?.label}`}
          </span>
        </div>
      </div>
      <div>
        <div className="font-semibold text-lg mb-1">Agents</div>
        <ul className="space-y-2">
          {agents.map(agent => (
            <li key={agent.name} className="flex items-center gap-2">
              <span className="block w-3 h-3 bg-primary inline-block rounded-full opacity-70" />
              <div>
                <span className="font-semibold">{agent.name}</span>
                <span className="block text-xs -mt-1 text-muted-foreground">{agent.description}</span>
              </div>
            </li>
          ))}
        </ul>
        {/* EXTENSIONS/PLUGINS */}
        <div className="mt-6">
          <div className="font-semibold text-md mb-2">Plugins</div>
          <div className="border rounded p-3 bg-muted text-muted-foreground text-sm"> 
            <span>Plug new agents in <span className="font-mono text-xs">/agents</span> — support for Data Analyst, Marketing Bot, etc. coming soon.</span>
          </div>
        </div>
        <div className="mt-5">
          <div className="font-semibold text-md mb-2">Agent Ideas</div>
          <ul className="list-disc pl-4 space-y-1">
            {upgradeRequests.map((req, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="text-green-500 w-4 h-4" />
                <span className="font-mono text-xs">{req.agent}</span>
                <span className="italic text-xs">{req.text}</span>
                <button
                  className="ml-2 text-xs text-muted-foreground p-1 hover:text-destructive"
                  onClick={() =>
                    setUpgradeRequests(reqs => reqs.filter((_, j) => j !== i))
                  }
                  title="Dismiss suggestion"
                >
                  <X className="w-3 h-3" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <button className="rounded bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 font-semibold shadow transition">
          Export Generated App (ZIP)
        </button>
        <button className="rounded bg-card hover:bg-background border border-border text-muted-foreground px-4 py-2 font-semibold shadow transition text-sm">
          Plugin/Extension Docs
        </button>
      </div>
    </section>
  );
};

export default AgentPanel;
