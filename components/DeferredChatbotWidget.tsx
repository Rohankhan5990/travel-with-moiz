"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChatbotWidget = dynamic(
  () => import("@/components/ChatbotWidget").then((module) => module.ChatbotWidget),
  { ssr: false },
);

export function DeferredChatbotWidget() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = () => setReady(true);
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const id = idleWindow.requestIdleCallback(load, { timeout: 4000 });
      return () => idleWindow.cancelIdleCallback?.(id);
    }

    const timeout = window.setTimeout(load, 2500);
    return () => window.clearTimeout(timeout);
  }, []);

  return ready ? <ChatbotWidget /> : null;
}
