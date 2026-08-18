"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

type Message = {
  id: string | number;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  sender?: string;
  created_at?: string;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Message[]>([]);

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedMessage, setSelectedMessage] =
    useState<Message | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  // =========================
  // AUTHENTICATION
  // =========================

  async function checkUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      router.replace("/admin/login");
      return;
    }

    await loadData();

    setChecking(false);
  }

  // =========================
  // LOAD DATA
  // =========================

  async function loadData() {
    setLoading(true);

    try {
      const contactResult = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      const chatResult = await supabase
        .from("chat_messages")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (contactResult.error) {
        console.error(
          "Contact messages error:",
          contactResult.error
        );
      }

      if (chatResult.error) {
        console.error(
          "Chat messages error:",
          chatResult.error
        );
      }

      setMessages(contactResult.data || []);
      setChats(chatResult.data || []);
    } catch (error) {
      console.error("Loading data error:", error);
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // DELETE CONTACT MESSAGE
  // =========================

  async function deleteContact(id: string | number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete contact error:", error);

      alert(
        "Could not delete the message. Please check Supabase permissions."
      );

      return;
    }

    setMessages((current) =>
      current.filter((message) => message.id !== id)
    );

    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  }

  // =========================
  // DELETE CHAT MESSAGE
  // =========================

  async function deleteChat(id: string | number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this chat message?"
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("chat_messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete chat error:", error);

      alert(
        "Could not delete the chat message. Please check Supabase permissions."
      );

      return;
    }

    setChats((current) =>
      current.filter((chat) => chat.id !== id)
    );
  }

  // =========================
  // LOGOUT
  // =========================

  async function logout() {
    await supabase.auth.signOut();

    router.replace("/admin/login");
  }

  // =========================
  // SEARCH
  // =========================

  const filteredMessages = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return messages;
    }

    return messages.filter((item) => {
      const content = [
        item.name,
        item.email,
        item.subject,
        item.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return content.includes(value);
    });
  }, [messages, search]);

  // =========================
  // LOADING SCREEN
  // =========================

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="text-center">
          <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />

          <p className="text-lg text-slate-400">
            Checking authentication...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // DASHBOARD
  // =========================

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-white md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <header className="mb-10">

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-400">
                RAOOFTECH
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                Admin Dashboard
              </h1>

              <p className="mt-3 max-w-xl text-slate-400">
                Manage your website messages and conversations
                from one secure dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={loadData}
                disabled={loading}
                className="rounded-xl border border-cyan-500/30 bg-slate-900 px-5 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Refreshing..." : "↻ Refresh"}
              </button>

              <button
                onClick={logout}
                className="rounded-xl border border-red-500/30 bg-slate-900 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/10"
              >
                Logout
              </button>

            </div>
          </div>
        </header>

        {/* STATISTICS */}
        <section className="grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <p className="text-sm font-medium text-slate-400">
              Contact Messages
            </p>

            <p className="mt-3 text-4xl font-black text-cyan-400">
              {messages.length}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Messages received through contact form
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <p className="text-sm font-medium text-slate-400">
              Chat Messages
            </p>

            <p className="mt-3 text-4xl font-black text-cyan-400">
              {chats.length}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Conversations from website chat
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <p className="text-sm font-medium text-slate-400">
              Website Status
            </p>

            <p className="mt-3 text-xl font-black text-green-400">
              ● Online
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Dashboard is connected
            </p>
          </div>

        </section>

        {/* CONTACT MESSAGES */}
        <section className="mt-12">

          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-2xl font-black">
                Contact Messages
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredMessages.length} message
                {filteredMessages.length === 1 ? "" : "s"}
                found
              </p>
            </div>

            <div className="relative w-full md:w-96">

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search name, email, subject..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />

            </div>

          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px] text-left">

                <thead className="bg-slate-800/70">

                  <tr>
                    <th className="p-4 text-sm font-bold">
                      Name
                    </th>

                    <th className="p-4 text-sm font-bold">
                      Email
                    </th>

                    <th className="p-4 text-sm font-bold">
                      Subject
                    </th>

                    <th className="p-4 text-sm font-bold">
                      Message
                    </th>

                    <th className="p-4 text-sm font-bold">
                      Date
                    </th>

                    <th className="p-4 text-sm font-bold">
                      Actions
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {filteredMessages.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t border-slate-800 transition hover:bg-slate-800/40"
                    >

                      <td className="p-4 font-semibold">
                        {item.name || "-"}
                      </td>

                      <td className="p-4 text-sm text-slate-400">
                        {item.email || "-"}
                      </td>

                      <td className="p-4">
                        {item.subject || "-"}
                      </td>

                      <td className="max-w-xs p-4 text-sm text-slate-400">
                        <div className="truncate">
                          {item.message || "-"}
                        </div>
                      </td>

                      <td className="whitespace-nowrap p-4 text-xs text-slate-500">
                        {item.created_at
                          ? new Date(
                              item.created_at
                            ).toLocaleString()
                          : "-"}
                      </td>

                      <td className="p-4">

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              setSelectedMessage(item)
                            }
                            className="rounded-lg border border-cyan-500/30 px-3 py-2 text-sm font-bold text-cyan-400 transition hover:bg-cyan-500/10"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              deleteContact(item.id)
                            }
                            className="rounded-lg border border-red-500/30 px-3 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                  {filteredMessages.length === 0 && (

                    <tr>

                      <td
                        colSpan={6}
                        className="p-12 text-center"
                      >
                        <p className="text-lg font-semibold text-slate-400">
                          No messages found
                        </p>

                        <p className="mt-2 text-sm text-slate-600">
                          Try another search.
                        </p>
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </section>

        {/* CHAT MESSAGES */}
        <section className="mt-12">

          <div className="mb-6">

            <h2 className="text-2xl font-black">
              Chat Messages
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Website chat conversations
            </p>

          </div>

          <div className="space-y-4">

            {chats.map((chat) => (

              <div
                key={chat.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
              >

                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                  <div className="min-w-0">

                    <p className="font-bold text-cyan-400">
                      {chat.sender || "Visitor"}
                    </p>

                    <p className="mt-3 break-words text-slate-300">
                      {chat.message || "-"}
                    </p>

                    {chat.created_at && (
                      <p className="mt-3 text-xs text-slate-500">
                        {new Date(
                          chat.created_at
                        ).toLocaleString()}
                      </p>
                    )}

                  </div>

                  <button
                    onClick={() =>
                      deleteChat(chat.id)
                    }
                    className="self-start rounded-lg border border-red-500/30 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

            {chats.length === 0 && (

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">

                <p className="font-semibold text-slate-400">
                  No chat messages yet.
                </p>

              </div>

            )}

          </div>

        </section>

      </div>

      {/* MESSAGE DETAILS MODAL */}
      {selectedMessage && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedMessage(null)}
        >

          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
                  Message Details
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  Contact Message
                </h3>

              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                ×
              </button>

            </div>

            <div className="mt-8 space-y-5">

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Name
                </p>

                <p className="mt-2 font-semibold">
                  {selectedMessage.name || "-"}
                </p>

              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email
                </p>

                <p className="mt-2 break-all font-semibold text-cyan-400">
                  {selectedMessage.email || "-"}
                </p>

              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Subject
                </p>

                <p className="mt-2 font-semibold">
                  {selectedMessage.subject || "-"}
                </p>

              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Message
                </p>

                <p className="mt-3 whitespace-pre-wrap break-words leading-7 text-slate-300">
                  {selectedMessage.message || "-"}
                </p>

              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Date
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {selectedMessage.created_at
                    ? new Date(
                        selectedMessage.created_at
                      ).toLocaleString()
                    : "-"}
                </p>

              </div>

            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">

              <button
                onClick={() =>
                  deleteContact(selectedMessage.id)
                }
                className="rounded-xl border border-red-500/30 px-5 py-3 font-bold text-red-400 transition hover:bg-red-500/10"
              >
                Delete Message
              </button>

              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}