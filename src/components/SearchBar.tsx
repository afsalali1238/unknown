import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { NODES } from "@/data/nodes";
import { MicroLabel } from "./MicroLabel";

export function SearchBar() {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const results = q.trim().length >= 2
    ? NODES.filter((n) => {
        const s = (n.title + " " + n.author + " " + n.thesis + " " + n.layer0).toLowerCase();
        return s.includes(q.toLowerCase());
      }).slice(0, 8)
    : [];

  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder="Search ideas, authors, themes…"
        className="w-full border-b border-line bg-transparent py-3 font-serif text-lg text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
      />
      {focused && results.length > 0 && (
        <div className="absolute inset-x-0 top-full z-20 mt-2 border border-line bg-paper shadow-sm">
          {results.map((n) => (
            <Link
              key={n.id}
              to="/node/$id"
              params={{ id: n.id }}
              onClick={() => setQ("")}
              className="block border-b border-line px-4 py-3 last:border-b-0 hover:bg-line/40"
            >
              <div className="font-serif text-base text-ink">{n.title}</div>
              <MicroLabel className="mt-1 block">
                {n.author} · {n.year}
              </MicroLabel>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
