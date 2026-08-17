"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

type Message = {
  sender: "bot" | "user";
  text: string;
};

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Welcome to RaoofTech! How can we help you today?",
    },
  ]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMessage = text.trim();

    setMessages((current) => [
      ...current,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    const { error } = await supabase
  .from("chat_messages")
  .insert({
    message: userMessage,
    sender: "user",
  } as never);

    if (error) {
      console.error("Chat error:", error);
    }

    setTimeout(() => {
      let reply =
        "Thanks for contacting RaoofTech! Our team will be happy to help you.";

      const lowerMessage = userMessage.toLowerCase();

      if (
        lowerMessage.includes("cyber") ||
        lowerMessage.includes("security")
      ) {
        reply =
          "🛡️ We provide cybersecurity solutions for businesses, systems and digital infrastructure.";
      } else if (
        lowerMessage.includes("web") ||
        lowerMessage.includes("website")
      ) {
        reply =
          "💻 We build modern, responsive and high-performance websites.";
      } else if (lowerMessage.includes("it")) {
        reply =
          "⚡ We provide IT solutions and technical support for modern businesses.";
      } else if (
        lowerMessage.includes("price") ||
        lowerMessage.includes("pricing")
      ) {
        reply =
          "💰 Our pricing depends on your project requirements. Contact us and tell us what you need.";
      }

      setMessages((current) => [
        ...current,
        {
          sender: "bot",
          text: reply,
        },
      ]);

      setLoading(false);
    }, 700);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(message);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-2xl text-slate-950 shadow-2xl shadow-cyan-400/20 transition hover:scale-110"
        aria-label="Open chat"
      >
        {open ? "×" : "💬"}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 p-5">
            <div>
              <p className="font-bold text-white">
                RaoofTech
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400" />

                <span className="text-xs text-slate-400">
                  Online
                </span>
              </div>
            </div>

            <span className="text-2xl">
              🤖
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    msg.sender === "user"
                      ? "rounded-br-md bg-cyan-400 text-slate-950"
                      : "rounded-bl-md bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-800 px-4 py-3 text-sm text-slate-400">
                  Typing...
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="space-y-2 pt-2">

                <button
                  onClick={() =>
                    sendMessage("I need Web Development")
                  }
                  className="w-full rounded-xl border border-slate-700 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  💻 Web Development
                </button>

                <button
                  onClick={() =>
                    sendMessage("I need Cybersecurity")
                  }
                  className="w-full rounded-xl border border-slate-700 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  🛡️ Cybersecurity
                </button>

                <button
                  onClick={() =>
                    sendMessage("I need IT Solutions")
                  }
                  className="w-full rounded-xl border border-slate-700 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  ⚡ IT Solutions
                </button>

                <button
                  onClick={() =>
                    sendMessage("I want to know the pricing")
                  }
                  className="w-full rounded-xl border border-slate-700 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  💰 Pricing
                </button>

              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-800 bg-slate-900 p-4"
          >
            <div className="flex gap-2">

              <input
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Type your message..."
                className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />

              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="rounded-xl bg-cyan-400 px-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-40"
              >
                ↑
              </button>

            </div>
          </form>

        </div>
      )}
    </>
  );
}