"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
};

type ChatMessage = {
  id: number;
  sender: string;
  message: string;
  created_at: string;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    await loadData();
    setLoading(false);
  }

  async function loadData() {
    const { data: contactData } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: chatData } = await supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: false });

    setContacts((contactData || []) as ContactMessage[]);
    setChats((chatData || []) as ChatMessage[]);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />
          <p className="mt-4 text-slate-400">
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
              RaoofTech
            </p>

            <h1 className="mt-1 text-2xl font-black">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-red-500/30 px-5 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
          >
            Logout
          </button>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <h2 className="text-3xl font-black">
            Welcome back 👋
          </h2>

          <p className="mt-2 text-slate-400">
            Manage your RaoofTech website from one place.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Contact Messages
              </span>

              <span className="text-2xl">
                📩
              </span>
            </div>

            <p className="mt-4 text-4xl font-black text-cyan-400">
              {contacts.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Chat Messages
              </span>

              <span className="text-2xl">
                💬
              </span>
            </div>

            <p className="mt-4 text-4xl font-black text-cyan-400">
              {chats.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Website
              </span>

              <span className="text-2xl">
                🌐
              </span>
            </div>

            <p className="mt-4 text-xl font-black text-green-400">
              ● Online
            </p>
          </div>

        </div>

        {/* Contact Messages */}
        <section className="mt-12">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">
                Contact Messages
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Messages sent through your website.
              </p>
            </div>

            <button
              onClick={loadData}
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              ↻ Refresh
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">

            <table className="w-full min-w-[850px] text-left">

              <thead className="bg-slate-900">
                <tr>
                  <th className="p-4 text-sm text-slate-400">
                    Name
                  </th>

                  <th className="p-4 text-sm text-slate-400">
                    Email
                  </th>

                  <th className="p-4 text-sm text-slate-400">
                    Subject
                  </th>

                  <th className="p-4 text-sm text-slate-400">
                    Message
                  </th>

                  <th className="p-4 text-sm text-slate-400">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>

                {contacts.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-800 transition hover:bg-slate-900/50"
                  >

                    <td className="p-4 font-semibold">
                      {item.name}
                    </td>

                    <td className="p-4 text-slate-400">
                      {item.email}
                    </td>

                    <td className="p-4">
                      {item.subject || "-"}
                    </td>

                    <td className="max-w-sm p-4 text-slate-400">
                      {item.message}
                    </td>

                    <td className="p-4 text-sm text-slate-500">
                      {new Date(
                        item.created_at
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

            {contacts.length === 0 && (
              <div className="p-10 text-center text-slate-500">
                📭 No contact messages yet.
              </div>
            )}

          </div>

        </section>

        {/* Chat Messages */}
        <section className="mt-12">

          <div className="mb-5">
            <h2 className="text-2xl font-black">
              Chat Messages
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recent conversations from the website chatbot.
            </p>
          </div>

          <div className="space-y-4">

            {chats.map((chat) => (
              <div
                key={chat.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
              >

                <div className="flex items-center justify-between">

                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-400">
                    {chat.sender}
                  </span>

                  <span className="text-xs text-slate-600">
                    {new Date(
                      chat.created_at
                    ).toLocaleString()}
                  </span>

                </div>

                <p className="mt-4 leading-7 text-slate-300">
                  {chat.message}
                </p>

              </div>
            ))}

            {chats.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-500">
                💬 No chat messages yet.
              </div>
            )}

          </div>

        </section>

      </div>

    </main>
  );
}