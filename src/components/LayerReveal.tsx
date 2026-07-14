import { useState, type ReactNode } from "react";
import { MicroLabel } from "./MicroLabel";

export function LayerReveal({
  label,
  children,
  onReveal,
}: {
  label: string;
  children: ReactNode;
  onReveal?: () => void;
}) {
  const [open, setOpen] = useState(false);
  if (open) {
    return (
      <div className="mt-8 border-t border-line pt-6 animate-in fade-in duration-500">
        {children}
      </div>
    );
  }
  return (
    <button
      onClick={() => {
        setOpen(true);
        onReveal?.();
      }}
      className="mt-8 flex w-full items-center justify-between border-t border-b border-line py-4 text-left transition-colors hover:bg-line/40"
    >
      <MicroLabel className="text-accent">{label}</MicroLabel>
      <span className="font-mono text-lg text-accent">↓</span>
    </button>
  );
}
