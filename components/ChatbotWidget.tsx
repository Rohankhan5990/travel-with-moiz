"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/whatsapp";
import { Loader2, SendHorizontal } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** Public asset: `public/chatbot.png`. */
const CHATBOT_ICON_SRC = "/chatbot.png";

type Role = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: Role;
  text: string;
};

type ChatApiSource = {
  title: string;
  chunk_id: string;
  score: number;
};

function normalizeApiBase(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  return raw.trim().replace(/\/+$/, "");
}

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "",
};

function WelcomeAssistantMessage() {
  return (
    <div className="mr-auto w-full max-w-[95%]" role="status">
      <div
        className={cn(
          "rounded-2xl border border-amber-500/15 bg-slate-800/95 px-3 py-3 shadow-inner shadow-black/15 ring-1 ring-white/5",
        )}
      >
        <p className="text-[0.875rem] font-bold leading-snug tracking-tight text-amber-100">
          🌍 Welcome to Travel With Moiz!
        </p>
        <div className="my-2 h-px bg-slate-600/35" aria-hidden />
        <p className="text-[0.8125rem] font-medium leading-snug text-white">
          Your travel assistant is online ✨
        </p>
        <p className="mt-2 text-[0.8125rem] leading-snug text-slate-400">
          Ask me about tours, destinations, pricing, itineraries, hotels, and
          travel plans across Pakistan.
        </p>
      </div>
    </div>
  );
}

function splitAssistantText(text: string): { body: string; sources: string[] } {
  const sep = /\n\nSources:\n/;
  const match = sep.exec(text);
  if (!match) return { body: text, sources: [] };
  const body = text.slice(0, match.index).trimEnd();
  const rest = text.slice(match.index + match[0].length);
  const sources = rest
    .split("\n")
    .map((l) => l.replace(/^[•\-]\s*/, "").trim())
    .filter(Boolean);
  return { body, sources };
}

function AssistantMessage({ text }: { text: string }) {
  const { body, sources } = useMemo(() => splitAssistantText(text), [text]);

  return (
    <div className="mr-auto max-w-[95%]">
      <div
        className={cn(
          "rounded-2xl border border-amber-500/15 bg-slate-800/95 px-3.5 py-3 text-[0.9375rem] leading-relaxed text-slate-100 shadow-inner shadow-black/20",
          "ring-1 ring-white/5",
        )}
      >
        <p className="whitespace-pre-wrap">{body}</p>
        {sources.length > 0 ? (
          <div className="mt-3 border-t border-slate-600/50 pt-3">
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-amber-200/80">
              From your FAQs
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {sources.map((line, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400/70" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ChatbotWidget() {
  const apiBase = normalizeApiBase(process.env.NEXT_PUBLIC_CHAT_API_URL);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const togglePanel = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        setMessages((msgs) => (msgs.length ? msgs : [WELCOME_MESSAGE]));
      }
      return next;
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || !apiBase || loading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = (await res.json()) as {
        answer?: string;
        error?: string;
        sources?: ChatApiSource[];
      };

      if (!res.ok) {
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }

      const answer = data.answer?.trim();
      if (!answer) {
        throw new Error("Empty reply from assistant");
      }

      let full = answer;
      if (data.sources?.length) {
        const lines = data.sources
          .slice(0, 5)
          .map((s) => `• ${s.title} (${s.score})`);
        full += `\n\nSources:\n${lines.join("\n")}`;
      }

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", text: full },
      ]);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Something went wrong. Try again.";
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: `Sorry — ${msg}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [apiBase, input, loading]);

  if (!apiBase) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="travel-chat-panel"
        aria-label={
          open ? "Close tour assistant chat" : "Open tour assistant chat"
        }
        onClick={togglePanel}
        className={cn(
          "fixed z-[55] flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl shadow-black/35 ring-1 ring-black/10 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300/70 sm:h-14 sm:w-14",
          "bottom-[6rem] right-4 sm:bottom-[6.25rem] sm:right-5",
          "max-[480px]:bottom-[11rem] max-[480px]:right-4",
        )}
      >
        <Image
          src={CHATBOT_ICON_SRC}
          alt=""
          width={52}
          height={52}
          className="h-8 w-8 object-contain sm:h-9 sm:w-9"
        />
      </button>

      {open ? (
        <div
          id="travel-chat-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Travel with Moiz chat"
          className={cn(
            "fixed bottom-[11rem] right-4 z-[56] flex max-h-[min(72vh,32rem)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-amber-500/25 bg-slate-950/96 shadow-2xl shadow-black/60 backdrop-blur-xl sm:bottom-[11.25rem] sm:right-5",
            "max-[480px]:bottom-[15.5rem]",
          )}
        >
          <header className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-4 py-3.5">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-900/95 ring-2 ring-amber-300/35 shadow-md shadow-black/50">
              <Image
                src={CHATBOT_ICON_SRC}
                alt="Tour assistant"
                width={48}
                height={48}
                className="h-full w-full object-contain p-1"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.95rem] font-black tracking-tight text-white">
                {brand.name}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.42em] text-amber-300">
                  Explore Pakistan · Assistant
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-2 py-0.5 text-[10px] font-semibold text-emerald-300/95">
                  <span
                    className="relative flex h-1.5 w-1.5"
                    aria-hidden
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Online
                </span>
              </div>
            </div>
          </header>

          <div
            ref={scrollRef}
            className="flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-950/40 px-3 py-4"
          >
            {messages.map((m) => {
              if (m.role === "user") {
                return (
                  <div
                    key={m.id}
                    className={cn(
                      "ml-auto max-w-[92%] rounded-2xl border border-amber-400/25 bg-gradient-to-br from-slate-800/90 to-slate-900/90 px-3.5 py-3 text-[0.9375rem] leading-relaxed whitespace-pre-wrap text-slate-50 shadow-md shadow-black/20",
                    )}
                  >
                    {m.text}
                  </div>
                );
              }
              if (m.id === "welcome") {
                return <WelcomeAssistantMessage key={m.id} />;
              }
              return <AssistantMessage key={m.id} text={m.text} />;
            })}
            {loading ? (
              <div className="mr-auto flex max-w-[92%] items-center gap-2 rounded-2xl border border-slate-600/40 bg-slate-800/80 px-4 py-3 text-sm text-slate-300">
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-amber-300" aria-hidden />
                Finding an answer…
              </div>
            ) : null}
          </div>

          <footer className="border-t border-white/10 bg-slate-950/95 px-3 py-3">
            <div className="flex gap-2">
              <label htmlFor="travel-chat-input" className="sr-only">
                Message
              </label>
              <input
                id="travel-chat-input"
                type="text"
                value={input}
                disabled={loading}
                placeholder="Ask about destinations, tours, booking…"
                className="min-h-11 flex-1 rounded-xl border border-slate-600/60 bg-slate-900/80 px-3.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/25 disabled:opacity-60"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void sendMessage();
                  }
                }}
              />
              <button
                type="button"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                onClick={() => void sendMessage()}
                className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300/70 bg-slate-900 text-white transition hover:bg-amber-300 hover:text-emerald-950 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-slate-900 disabled:hover:text-white"
              >
                <SendHorizontal className="h-5 w-5" aria-hidden strokeWidth={2} />
              </button>
            </div>
          </footer>
        </div>
      ) : null}
    </>
  );
}
