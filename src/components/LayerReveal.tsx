import { useState, type ReactNode } from "react";
import { MicroLabel } from "./MicroLabel";
import { cn } from "@/lib/utils";

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

  return (
    <div className="w-full">
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            onReveal?.();
          }}
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
      >
        <div className="overflow-hidden">
          <div className="border-t border-line pt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
