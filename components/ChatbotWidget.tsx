"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/whatsapp";
import { Loader2, SendHorizontal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Public asset: `public/chatbot.png`. */
const CHATBOT_ICON_SRC = "/chatbot.png";

type Role = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: Role;
  text: string;
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
          "rounded-xl border border-amber-500/15 bg-slate-800/95 px-2.5 py-2.5 shadow-inner shadow-black/15 ring-1 ring-white/5 sm:rounded-2xl sm:px-3 sm:py-3",
        )}
      >
        <p className="text-[0.8125rem] font-bold leading-snug tracking-tight text-amber-100 sm:text-[0.875rem]">
          🌍 Welcome to Travel With Moiz!
        </p>
        <div className="my-1.5 h-px bg-slate-600/35 sm:my-2" aria-hidden />
        <p className="text-[0.75rem] font-medium leading-snug text-white sm:text-[0.8125rem]">
          Your travel assistant is online ✨
        </p>
        <p className="mt-1.5 text-[0.75rem] leading-snug text-slate-400 sm:mt-2 sm:text-[0.8125rem]">
          Ask me about tours, destinations, pricing, itineraries, hotels, and
          travel plans across Pakistan.
        </p>
      </div>
    </div>
  );
}

const assistantMarkdownComponents: Partial<Components> = {
  p: ({ children }) => (
    <p className="mb-2 text-[0.8125rem] leading-relaxed text-slate-100 last:mb-0 sm:text-[0.9375rem]">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-amber-100">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-slate-200">{children}</em>,
  ul: ({ children }) => (
    <ul className="mb-2 list-disc space-y-1.5 pl-4 text-[0.8125rem] text-slate-100 marker:text-amber-300/90 last:mb-0 sm:text-[0.9375rem]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-2 list-decimal space-y-1.5 pl-4 text-[0.8125rem] text-slate-100 marker:font-medium marker:text-amber-300/90 last:mb-0 sm:pl-5 sm:text-[0.9375rem]">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed [&>p]:mb-0">{children}</li>
  ),
  h1: ({ children }) => (
    <h3 className="mb-2 mt-3 text-[0.92rem] font-bold text-amber-50 first:mt-0 sm:text-[1rem]">
      {children}
    </h3>
  ),
  h2: ({ children }) => (
    <h3 className="mb-2 mt-2.5 text-[0.88rem] font-bold text-amber-50 first:mt-0 sm:text-[0.96rem]">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h3 className="mb-1.5 mt-2 text-[0.8rem] font-semibold text-amber-100/95 first:mt-0 sm:text-[0.875rem]">
      {children}
    </h3>
  ),
  hr: () => (
    <hr className="my-3 border-0 border-t border-slate-600/55" aria-hidden />
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="break-words font-medium text-amber-200 underline decoration-amber-400/45 underline-offset-2 hover:text-amber-50"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-2 border-amber-400/40 pl-3 text-slate-300">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="mb-2 max-w-full overflow-x-auto rounded-lg border border-white/10 bg-slate-950/85 p-2.5 font-mono text-[0.75rem] leading-snug text-slate-100 last:mb-0 [&>code]:block [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0">
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock =
      !!className && String(className).includes("language-");
    if (isBlock) {
      return (
        <code className={cn("block font-mono", className)} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded bg-slate-900/90 px-1 py-[0.05rem] font-mono text-[0.84em]"
        {...props}
      >
        {children}
      </code>
    );
  },
  table: ({ children }) => (
    <div className="my-2 max-w-full overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full border-collapse text-[0.75rem] sm:text-[0.8125rem]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-slate-900/75">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border border-white/15 px-2 py-1.5 text-left font-semibold text-amber-100">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-white/10 px-2 py-1.5 leading-snug text-slate-200">
      {children}
    </td>
  ),
};

function AssistantMessage({ text }: { text: string }) {
  return (
    <div className="mr-auto max-w-[95%]">
      <div
        className={cn(
          "rounded-xl border border-amber-500/15 bg-slate-800/95 px-2.5 py-2.5 text-slate-100 shadow-inner shadow-black/20 ring-1 ring-white/5 sm:rounded-2xl sm:px-3.5 sm:py-3",
        )}
      >
        <div className="assistant-markdown break-words">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={assistantMarkdownComponents}
          >
            {text}
          </ReactMarkdown>
        </div>
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
      };

      if (!res.ok) {
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }

      const answer = data.answer?.trim();
      if (!answer) {
        throw new Error("Empty reply from assistant");
      }

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", text: answer },
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
          "bottom-[6.25rem] right-4 sm:bottom-[7.25rem] sm:right-5",
          "max-[480px]:bottom-[10.75rem]",
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
            "fixed z-[56] flex flex-col overflow-hidden rounded-xl border border-amber-500/25 bg-slate-950/96 shadow-2xl shadow-black/60 backdrop-blur-xl",
            "bottom-[15rem] right-4 max-h-[min(52vh,22.5rem)] w-[min(17.75rem,calc(100vw-2rem))]",
            "max-[480px]:bottom-[14.25rem]",
            "sm:bottom-[11.25rem] sm:right-5 sm:max-h-[min(72vh,32rem)] sm:w-[min(22rem,calc(100vw-2rem))] sm:rounded-2xl",
          )}
        >
          <header className="flex items-center gap-2 border-b border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-2.5 py-2 sm:gap-3 sm:px-4 sm:py-3.5">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-900/95 ring-2 ring-amber-300/35 shadow-md shadow-black/50 sm:h-12 sm:w-12">
              <Image
                src={CHATBOT_ICON_SRC}
                alt="Tour assistant"
                width={48}
                height={48}
                className="h-full w-full object-contain p-[3px] sm:p-1"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.875rem] font-black tracking-tight text-white sm:text-[0.95rem]">
                {brand.name}
              </p>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 sm:mt-1 sm:gap-x-2 sm:gap-y-1">
                <p className="text-[0.52rem] font-bold uppercase tracking-[0.28em] text-amber-300 sm:text-[0.62rem] sm:tracking-[0.42em]">
                  Explore Pakistan · Assistant
                </p>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-[5px] py-[1px] text-[9px] font-semibold text-emerald-300/95 sm:gap-1.5 sm:px-2 sm:py-0.5 sm:text-[10px]">
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
            className="flex flex-1 flex-col gap-2 overflow-y-auto bg-slate-950/40 px-2 py-2.5 sm:gap-3 sm:px-3 sm:py-4"
          >
            {messages.map((m) => {
              if (m.role === "user") {
                return (
                  <div
                    key={m.id}
                    className={cn(
                      "ml-auto max-w-[92%] rounded-xl border border-amber-400/25 bg-gradient-to-br from-slate-800/90 to-slate-900/90 px-3 py-2 text-[0.8125rem] leading-relaxed whitespace-pre-wrap text-slate-50 shadow-md shadow-black/20 sm:rounded-2xl sm:px-3.5 sm:py-3 sm:text-[0.9375rem]",
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
              <div className="mr-auto flex max-w-[92%] items-center gap-1.5 rounded-xl border border-slate-600/40 bg-slate-800/80 px-3 py-2 text-xs text-slate-300 sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-amber-300" aria-hidden />
                Finding an answer…
              </div>
            ) : null}
          </div>

          <footer className="border-t border-white/10 bg-slate-950/95 px-2 py-2 sm:px-3 sm:py-3">
            <div className="flex gap-1.5 sm:gap-2">
              <label htmlFor="travel-chat-input" className="sr-only">
                Message
              </label>
              <input
                id="travel-chat-input"
                type="text"
                value={input}
                disabled={loading}
                placeholder="Ask about destinations, tours, booking…"
                className="min-h-10 flex-1 rounded-lg border border-slate-600/60 bg-slate-900/80 px-2.5 text-[0.8125rem] text-slate-100 placeholder:text-slate-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/25 disabled:opacity-60 sm:min-h-11 sm:rounded-xl sm:px-3.5 sm:text-sm"
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
                className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-lg border border-amber-300/70 bg-slate-900 text-white transition hover:bg-amber-300 hover:text-emerald-950 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-slate-900 disabled:hover:text-white sm:h-11 sm:min-w-11 sm:rounded-xl"
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
