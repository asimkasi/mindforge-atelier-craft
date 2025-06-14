
import { Check, ArrowRight } from "lucide-react";

type Phase = {
  key: string;
  label: string;
  agent: string;
};

const PhaseTimeline = ({
  phases,
  current
}: {
  phases: Phase[];
  current: number;
}) => {
  return (
    <ol className="flex gap-2 sm:gap-6 items-center justify-start">
      {phases.map((phase, idx) => (
        <li key={phase.key} className="flex items-center gap-1">
          {/* Node */}
          <div className={`w-7 h-7 rounded-full flex items-center justify-center
            text-sm font-semibold
            ${idx < current
              ? "bg-primary text-primary-foreground"
              : idx === current
              ? "bg-accent text-accent-foreground ring-2 ring-primary"
              : "bg-muted text-muted-foreground"
            } transition-all`}>
            {idx < current ? <Check size={18} /> : idx + 1}
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold">{phase.label}</span>
            <span className="text-[10px] text-muted-foreground font-mono">{phase.agent}</span>
          </div>
          {/* Connector */}
          {idx < phases.length - 1 && (
            <ArrowRight size={22} className="mx-1 text-muted-foreground" />
          )}
        </li>
      ))}
    </ol>
  );
};

export default PhaseTimeline;
