import { useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MicroLabel } from "@/components/MicroLabel";
import { InstallAppButton } from "@/components/InstallAppButton";
import { useStore, currentStreak } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";
import { NODE_BY_ID, TAGS } from "@/data/nodes";

export const Route = createFileRoute("/you")({
  head: () => ({
    meta: [
      { title: "You — Unknown" },
      { name: "description", content: "Streak, stats, reading list, glossary, and backup." },
    ],
  }),
  component: YouScreen,
});

function YouScreen() {
  const hydrated = useHydrated();
  const state = useStore();
  const streak = hydrated ? currentStreak(state.streakDays) : 0;
  const learned = Object.values(state.gotIt).filter(Boolean).length;
  const inReview = Object.keys(state.review).length;
  const mastered = Object.values(state.review).filter((r) => r.box >= 4).length;
  const bookmarked = Object.entries(state.bookmarks)
    .filter(([, v]) => v)
    .map(([id]) => NODE_BY_ID[id])
    .filter(Boolean);

  return (
    <div className="px-5 pt-8 pb-10 space-y-12">
      <header>
        <MicroLabel>You</MicroLabel>
        <h1 className="mt-2 font-serif text-4xl text-ink">Your practice</h1>
      </header>

      <Section title="Streak">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-6xl text-accent leading-none">{streak}</span>
          <MicroLabel>consecutive days</MicroLabel>
        </div>
        <div className="mt-5 flex gap-1">
          {last14Days().map((d) => {
            const on = state.streakDays.includes(d);
            return (
              <div key={d} title={d} className={`h-2 flex-1 ${on ? "bg-accent" : "bg-line"}`} />
            );
          })}
        </div>
      </Section>

      <Section title="Stats">
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Learned" value={learned} />
          <Stat label="In review" value={inReview} />
          <Stat label="Mastered" value={mastered} />
        </div>
      </Section>

      <Interests />

      <Section title="Bookmarks">
        {bookmarked.length === 0 ? (
          <p className="text-sm text-ink-soft">Star ideas from any node to save them here.</p>
        ) : (
          <ul className="space-y-1">
            {bookmarked.map((n) => (
              <li key={n.id}>
                <Link
                  to="/node/$id"
                  params={{ id: n.id }}
                  className="block border-b border-line py-3"
                >
                  <span className="font-serif text-lg text-ink">{n.title}</span>
                  <MicroLabel className="ml-2">{n.author}</MicroLabel>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <ReadingList />
      <Glossary />
      <Scratchpad />
      <Offline />
      <Backup />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-6">
      <MicroLabel>{title}</MicroLabel>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-line p-3">
      <p className="font-mono text-3xl text-ink leading-none">{value}</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
        {label}
      </p>
    </div>
  );
}

function Interests() {
  const navigate = useNavigate();
  const interests = useStore((s) => s.interests);
  const toggleInterest = useStore((s) => s.toggleInterest);
  const redoOnboarding = useStore((s) => s.redoOnboarding);

  return (
    <Section title="Interests">
      <p className="text-sm text-ink-soft">
        These decide what shows up first under "For you" on the Map.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {TAGS.map((tag) => {
          const active = interests.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleInterest(tag)}
              className={`min-h-11 border px-3 py-2 font-serif text-sm ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => {
          redoOnboarding();
          navigate({ to: "/onboarding" });
        }}
        className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:text-accent"
      >
        Redo onboarding
      </button>
    </Section>
  );
}

function last14Days(): string[] {
  const out: string[] = [];
  const d = new Date();
  for (let i = 13; i >= 0; i--) {
    const x = new Date(d);
    x.setDate(d.getDate() - i);
    out.push(x.toISOString().slice(0, 10));
  }
  return out;
}

function ReadingList() {
  const list = useStore((s) => s.readingList);
  const add = useStore((s) => s.addReading);
  const remove = useStore((s) => s.removeReading);
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  return (
    <Section title="Reading list">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!label.trim()) return;
          add({ label: label.trim(), url: url.trim() || undefined });
          setLabel("");
          setUrl("");
        }}
        className="space-y-2"
      >
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Title or topic"
          className="w-full border-b border-line bg-transparent py-2 text-base focus:border-ink focus:outline-none"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL (optional)"
          className="w-full border-b border-line bg-transparent py-2 text-sm text-ink-soft focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          className="border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
        >
          Add
        </button>
      </form>
      <ul className="mt-4 space-y-2">
        {list.map((item) => (
          <li
            key={item.id}
            className="flex items-baseline justify-between gap-3 border-b border-line py-2"
          >
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="font-serif text-base text-ink hover:text-accent"
              >
                {item.label}
              </a>
            ) : (
              <span className="font-serif text-base text-ink">{item.label}</span>
            )}
            <button
              onClick={() => remove(item.id)}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-accent"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Glossary() {
  const list = useStore((s) => s.glossary);
  const add = useStore((s) => s.addGlossary);
  const remove = useStore((s) => s.removeGlossary);
  const [term, setTerm] = useState("");
  const [def, setDef] = useState("");
  const [q, setQ] = useState("");
  const filtered = q.trim()
    ? list.filter((g) => (g.term + " " + g.definition).toLowerCase().includes(q.toLowerCase()))
    : list;
  return (
    <Section title="Glossary">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search terms…"
        className="w-full border-b border-line bg-transparent py-2 text-sm focus:border-ink focus:outline-none"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!term.trim() || !def.trim()) return;
          add({ term: term.trim(), definition: def.trim() });
          setTerm("");
          setDef("");
        }}
        className="mt-3 space-y-2"
      >
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Term"
          className="w-full border-b border-line bg-transparent py-2 text-base focus:border-ink focus:outline-none"
        />
        <textarea
          value={def}
          onChange={(e) => setDef(e.target.value)}
          placeholder="Definition"
          className="w-full border-b border-line bg-transparent py-2 text-sm focus:border-ink focus:outline-none"
          rows={2}
        />
        <button
          type="submit"
          className="border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
        >
          Add term
        </button>
      </form>
      <ul className="mt-4 space-y-3">
        {filtered.map((g) => (
          <li key={g.id} className="border-b border-line pb-3">
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-lg text-ink">{g.term}</span>
              <button
                onClick={() => remove(g.id)}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft hover:text-accent"
              >
                Remove
              </button>
            </div>
            <p className="mt-1 text-sm text-ink-soft">{g.definition}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Scratchpad() {
  const value = useStore((s) => s.scratchpad);
  const set = useStore((s) => s.setScratchpad);
  return (
    <Section title="Scratchpad">
      <textarea
        value={value}
        onChange={(e) => set(e.target.value)}
        rows={6}
        placeholder="Half-formed thoughts, connections, quotes…"
        className="w-full border border-line bg-paper p-3 font-serif text-base leading-relaxed focus:border-ink focus:outline-none"
      />
    </Section>
  );
}

function Offline() {
  return (
    <Section title="Offline">
      <InstallAppButton />
    </Section>
  );
}

function Backup() {
  const exportJSON = useStore((s) => s.exportJSON);
  const importJSON = useStore((s) => s.importJSON);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const onExport = () => {
    const data = exportJSON();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `unknown-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImport = async (f: File) => {
    const text = await f.text();
    const ok = importJSON(text);
    setMsg(ok ? "Imported." : "Import failed — not valid JSON.");
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <Section title="Backup">
      <p className="text-sm text-ink-soft">
        All progress lives in this browser. Export to keep it.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={onExport}
          className="border border-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
        >
          Export JSON
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink hover:border-ink"
        >
          Import
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onImport(f);
            e.target.value = "";
          }}
        />
      </div>
      {msg && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{msg}</p>
      )}
    </Section>
  );
}
