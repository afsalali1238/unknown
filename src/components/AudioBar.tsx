import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";

/**
 * Real narration via the browser's Web Speech API (SpeechSynthesis).
 * No external TTS service, no cost, works offline once the page is loaded.
 * Reads the on-page [data-sentence] spans in order, speaks them one at a
 * time, and highlights the active sentence as it is spoken.
 */
export function AudioBar({ sentenceCount }: { sentenceCount: number }) {
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState(0);
  const [supported, setSupported] = useState(true);
  const ttsRate = useStore((s) => s.ttsRate);
  const idxRef = useRef(0);
  const stoppedRef = useRef(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  function sentenceEls(): HTMLElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>("[data-sentence]")).sort(
      (a, b) => Number(a.dataset.sentence) - Number(b.dataset.sentence),
    );
  }

  function highlight(active: number) {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sentenceEls().forEach((el) => {
      const i = Number(el.dataset.sentence);
      el.dataset.active = i === active ? "1" : "0";
      if (i === active) {
        el.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  }

  function clearHighlight() {
    sentenceEls().forEach((el) => (el.dataset.active = "0"));
  }

  function speakFrom(start: number) {
    const els = sentenceEls();
    if (start >= els.length) {
      finish();
      return;
    }
    stoppedRef.current = false;
    const u = new SpeechSynthesisUtterance(els[start].textContent ?? "");
    u.rate = ttsRate;
    u.onstart = () => {
      idxRef.current = start;
      setIdx(start);
      highlight(start);
    };
    u.onend = () => {
      if (stoppedRef.current) return;
      const next = start + 1;
      if (next < els.length) speakFrom(next);
      else finish();
    };
    window.speechSynthesis.speak(u);
  }

  function finish() {
    setPlaying(false);
    setIdx(0);
    idxRef.current = 0;
    clearHighlight();
  }

  function stop() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    stoppedRef.current = true;
    window.speechSynthesis.cancel();
  }

  function toggle() {
    if (!supported) return;
    if (playing) {
      setPlaying(false);
      stop();
      clearHighlight();
    } else {
      setPlaying(true);
      speakFrom(idxRef.current);
    }
  }

  // Stop speech if the component unmounts (leaving the node screen).
  useEffect(() => stop, []);

  const total = Math.max(1, sentenceCount);
  const pct = playing ? ((idx + 1) / total) * 100 : (idx / total) * 100;

  return (
    <div className="fixed bottom-[64px] inset-x-0 z-30 border-t border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        <button
          onClick={toggle}
          disabled={!supported}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-paper disabled:opacity-40"
          aria-label={playing ? "Pause narration" : "Play narration"}
        >
          {playing ? (
            <span className="font-mono text-xs">❚❚</span>
          ) : (
            <span className="ml-0.5 font-mono text-xs">▶</span>
          )}
        </button>
        <div className="flex-1">
          <div className="relative h-[2px] w-full bg-line">
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-200"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            <span>{supported ? "Listen" : "Audio not supported"}</span>
            <span>
              {Math.min(idx + (playing ? 1 : 0), total)} / {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
