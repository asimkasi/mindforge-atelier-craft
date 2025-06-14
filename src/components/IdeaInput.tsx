
import { useRef } from "react";

const IdeaInput = ({
  value,
  onChange,
  onSubmit
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-3"
    >
      <label className="text-lg font-medium">What app do you want to build?</label>
      <input
        ref={inputRef}
        autoFocus
        type="text"
        placeholder="e.g. Project manager for biologists"
        className="border border-input rounded px-4 py-3 font-mono text-base focus:ring-2 focus:ring-primary transition"
        value={value}
        onChange={onChange}
      />
      <button
        type="submit"
        className="self-start mt-2 text-sm bg-primary text-primary-foreground font-bold px-4 py-2 rounded hover:bg-primary/90 transition"
        disabled={!value.trim()}
      >
        Submit Idea
      </button>
    </form>
  );
};

export default IdeaInput;
