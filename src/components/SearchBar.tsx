import { useState, useMemo, useId } from "react";
import { Link } from "@tanstack/react-router";
import { NODES } from "@/data/nodes";
import { MicroLabel } from "./MicroLabel";
import MiniSearch from "minisearch";

const miniSearch = new MiniSearch({
  fields: ["title", "author", "thesis", "layer0", "layer1", "layer2"],
  storeFields: ["id", "title", "author", "year"],
});

miniSearch.addAll(NODES);

export function SearchBar() {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const listboxId = useId();

  const trimmed = q.trim();
  const results = useMemo(() => {
    if (trimmed.length < 2) return [];
    return miniSearch.search(trimmed, { prefix: true, fuzzy: 0.2 }).slice(0, 8);
  }, [trimmed]);

  const showPanel = focused && trimmed.length >= 2;
  const hasResults = results.length > 0;

  return (
    <div className="relative">
      <label htmlFor="lattice-search" className="sr-only">
        Search ideas, authors, and themes
      </label>
      <input
        id="lattice-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder="Search ideas, authors, themes…"
        role="combobox"
        aria-expanded={showPanel}
        aria-controls={listboxId}
        aria-autocomplete="list"
        autoComplete="off"
        className="w-full border-b border-line bg-transparent py-3 font-serif text-lg text-ink placeholder:text-ink-soft/60 transition-colors duration-[var(--duration-fast)] focus:border-ink focus-visible:outline-none"
      />

      {/* Announces result count to screen readers without moving focus. */}
      <p className="sr-only" role="status" aria-live="polite">
        {showPanel
          ? hasResults
            ? `${results.length} result${results.length === 1 ? "" : "s"} for ${trimmed}`
            : `No results for ${trimmed}`
          : ""}
      </p>

      {showPanel && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className="absolute inset-x-0 top-full z-20 mt-2 border border-line bg-paper shadow-[var(--shadow-raised)]"
        >
          {hasResults ? (
            results.map((n) => (
              <Link
                key={n.id}
                to="/node/$id"
                params={{ id: n.id }}
                role="option"
                aria-selected={false}
                onClick={() => setQ("")}
                className="block border-b border-line px-4 py-3 outline-none last:border-b-0 hover:bg-line/40 focus-visible:bg-line/40"
              >
                <div className="font-serif text-base text-ink">{n.title}</div>
                <MicroLabel className="mt-1 block">
                  {n.author} · {n.year}
                </MicroLabel>
              </Link>
            ))
          ) : (
            <div className="px-4 py-4">
              <p className="font-serif text-base text-ink">No matches for “{trimmed}.”</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                Try an author, a title, or a theme like “compounding”
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
