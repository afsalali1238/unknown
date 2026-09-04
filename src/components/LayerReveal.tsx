import { useState, type ReactNode } from "react";
import { MicroLabel } from "./MicroLabel";
import { cn } from "@/lib/utils";

/**
 * A progressively-revealed layer: a labelled bar that expands into its
 * content once the reader asks for it (PRODUCT-BRIEF §7.2 — layers are
 * gated, never dumped at once).
 *
 * `open` is optionally controlled. The node page passes it so that narration
 * (AudioBar's onReachLayer1/2) can expand a layer just before reading into
 * it. Before this was controllable, those callbacks only flipped a flag in
 * the parent — the panel itself stayed collapsed while its sentences were
 * read aloud and highlighted inside an `overflow-hidden` 0fr grid row.
 */
export function LayerReveal({
  label,
  children,
  onReveal,
  open: controlledOpen,
}: {
  label: string;
  children: ReactNode;
  onReveal?: () => void;
  open?: boolean;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;

  return (
    <div className="w-full">
      {!open && (
        <button
          onClick={() => {
            setInternalOpen(true);
            onReveal?.();
          }}
          aria-expanded={false}
          className="mt-8 flex w-full items-center justify-between border-y border-line py-4 text-left transition-colors hover:bg-line/40"
        >
          <MicroLabel className="text-accent">{label}</MicroLabel>
          <span className="font-mono text-lg text-accent">↓</span>
        </button>
      )}
      <div
        className={cn(
          "grid transition-all duration-500 ease-in-out",
          open ? "mt-8 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line pt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
