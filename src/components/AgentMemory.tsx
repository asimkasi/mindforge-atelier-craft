
import { Folder, FileCode, Search } from "lucide-react";

const fakeLogs = [
  { agent: "Dream Weaver", entry: "User described: 'Photo Gallery with AI tags'" },
  { agent: "Master Builder", entry: "Built plan: React FE, Express BE, SQLite" },
  { agent: "Aesthetic Artist", entry: "UI theme: Pastel cards, sidebar nav" },
  { agent: "Code Sage", entry: "Generated React+Express template code" },
];

const AgentMemory = () => {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="px-5 pt-6 pb-2 flex items-center gap-2 text-xl font-bold">
        <Folder className="mr-1 text-primary" size={21} />
        Agent Memory & Logs
      </div>
      <div className="border-b mx-5 mb-2"></div>
      <div className="flex-1 px-5 overflow-y-auto">
        {fakeLogs.map((log, i) => (
          <div key={i} className="flex items-start gap-2 mb-4">
            <FileCode className="text-muted-foreground mt-1" size={16} />
            <div>
              <div className="text-xs text-muted-foreground font-mono">{log.agent}</div>
              <div className="text-sm">{log.entry}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t text-xs text-muted-foreground flex items-center gap-2 bg-muted/50 mt-auto">
        <Search className="w-4 h-4" />
        Session memory — stored locally for privacy. <span className="ml-auto">v0.1</span>
      </div>
    </div>
  );
};

export default AgentMemory;
