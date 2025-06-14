
const PhaseReview = ({
  phase,
  output,
  feedback,
  onFeedbackChange,
}: {
  phase: { key: string; label: string; agent: string };
  output?: { title: string; content: string };
  feedback?: string;
  onFeedbackChange: (val: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <div>
        {output ? (
          <>
            <div className="font-semibold text-muted-foreground mb-1">{output.title}</div>
            <div className="rounded bg-muted p-4 font-mono text-sm whitespace-pre-wrap">{output.content}</div>
          </>
        ) : (
          <div className="italic text-muted-foreground">Output coming soon...</div>
        )}
      </div>
      {/* Feedback/Revision section */}
      <div className="pt-1">
        <label className="block text-sm font-semibold mb-1">Feedback (optional):</label>
        <textarea
          value={feedback || ""}
          onChange={e => onFeedbackChange(e.target.value)}
          placeholder={`Any feedback for the ${phase.agent} on this phase?`}
          className="w-full border border-input rounded px-3 py-2 text-sm focus:ring-2 focus:ring-accent transition"
          rows={2}
        />
      </div>
    </div>
  );
};

export default PhaseReview;
