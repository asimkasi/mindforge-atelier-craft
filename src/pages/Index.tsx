
import AgentWorkflow from "../components/AgentWorkflow";
import AgentPanel from "../components/AgentPanel";
import AgentMemory from "../components/AgentMemory";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Title */}
      <header className="py-6 px-8 bg-background border-b border-border flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">ThinkTank AI</h1>
          <div className="text-sm text-muted-foreground font-mono">A fully local, self-hosted AI app builder</div>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold bg-muted px-3 py-1 rounded shadow border text-xs">Private Mode</span>
        </div>
      </header>
      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left - Workflow/phases/memory (responsive, scrollable) */}
        <aside className="hidden xl:flex flex-col w-80 border-r border-border bg-card p-0 overflow-y-auto">
          <AgentMemory />
        </aside>
        {/* Center - Main workflow */}
        <main className="flex-1 px-0 sm:px-6 pt-8 pb-6 overflow-y-auto">
          <AgentWorkflow />
        </main>
        {/* Right - Agent settings/controls */}
        <aside className="w-[320px] min-w-[260px] max-w-[380px] border-l border-border bg-card p-0 hidden lg:flex flex-col overflow-y-auto">
          <AgentPanel />
        </aside>
      </div>
    </div>
  );
};

export default Index;
