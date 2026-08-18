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

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      router.replace("/admin/login");
      return;
    }

    await loadData();
    setChecking(false);
  }

  async function loadData() {
    setLoading(true);

    try {
      const contactResult = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      const chatResult = await supabase
        .from("chat_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (contactResult.error) {
        console.error(
          "Contact messages error:",
          JSON.stringify(contactResult.error, null, 2)
        );
      }

      if (chatResult.error) {
        console.error(
          "Chat messages error:",
          JSON.stringify(chatResult.error, null, 2)
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

  async function deleteContact(id: string | number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Could not delete the message.");
      console.error(error);
      return;
    }

    setMessages((current) =>
      current.filter((message) => message.id !== id)
    );
  }

  async function deleteChat(id: string | number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this chat message?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("chat_messages")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Could not delete the chat message.");
      console.error(error);
      return;
    }

    setChats((current) =>
      current.filter((chat) => chat.id !== id)
    );
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  const filteredMessages = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return messages;

    return messages.filter((item) =>
      [
        item.name,
        item.email,
        item.subject,
        item.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [messages, search]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-lg text-slate-400">
          Checking authentication...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-5 text-white md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
              RAOOFTECH
            </p>

            <h1 className="mt-3 text-4xl font-black md:text-5xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-slate-400">
              Manage your website messages and conversations.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="rounded-xl border border-cyan-500/30 px-5 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-500/10 disabled:opacity-50"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>

            <button
              onClick={logout}
              className="rounded-xl border border-red-500/30 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/10"
            >
              Logout
            </button>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Contact Messages
            </p>

            <p className="mt-3 text-4xl font-black text-cyan-400">
              {messages.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Chat Messages
            </p>

            <p className="mt-3 text-4xl font-black text-cyan-400">
              {chats.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Website Status
            </p>

            <p className="mt-3 text-xl font-bold text-green-400">
              ● Online
            </p>
          </div>

        </div>

        {/* SEARCH */}
        <section className="mt-10">

          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <h2 className="text-2xl font-bold">
              Contact Messages
            </h2>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 md:w-80"
            />

          </div>

          {/* CONTACT TABLE */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">

            <table className="w-full min-w-[850px] text-left">

              <thead className="bg-slate-900">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredMessages.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-800 transition hover:bg-slate-900/70"
                  >

                    <td className="p-4 font-semibold">
                      {item.name || "-"}
                    </td>

                    <td className="p-4 text-slate-400">
                      {item.email || "-"}
                    </td>

                    <td className="p-4">
                      {item.subject || "-"}
                    </td>

                    <td className="max-w-sm p-4 text-slate-400">
                      {item.message || "-"}
                    </td>

                    <td className="whitespace-nowrap p-4 text-sm text-slate-500">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleString()
                        : "-"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteContact(item.id)}
                        className="rounded-lg border border-red-500/30 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}

                {filteredMessages.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-10 text-center text-slate-500"
                    >
                      No messages found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* CHAT */}
        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Chat Messages
            </h2>
          </div>

          <div className="space-y-4">

            {chats.map((chat) => (
              <div
                key={chat.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="font-bold text-cyan-400">
                      {chat.sender || "Visitor"}
                    </p>

                    <p className="mt-2 text-slate-300">
                      {chat.message || "-"}
                    </p>

                    {chat.created_at && (
                      <p className="mt-3 text-xs text-slate-500">
                        {new Date(chat.created_at).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteChat(chat.id)}
                    className="shrink-0 rounded-lg border border-red-500/30 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

            {chats.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-500">
                No chat messages yet.
              </div>
            )}

          </div>

        </section>

      </div>
    </main>
  );
}