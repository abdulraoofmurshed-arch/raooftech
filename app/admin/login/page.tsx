"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();

  const [messages, setMessages] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      await loadData();
      setChecking(false);
    }

    checkUser();
  }, [router]);

  async function loadData() {
    const { data: contactData } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: chatData } = await supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: false });

    setMessages(contactData || []);
    setChats(chatData || []);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
              RaoofTech
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-slate-400">
              Manage your website messages and conversations.
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-red-500/30 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/10"
          >
            Logout
          </button>
        </div>

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

        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-bold">
            Contact Messages
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-slate-900">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Message</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-800"
                  >
                    <td className="p-4">
                      {item.name}
                    </td>

                    <td className="p-4 text-slate-400">
                      {item.email}
                    </td>

                    <td className="p-4">
                      {item.subject || "-"}
                    </td>

                    <td className="max-w-md p-4 text-slate-400">
                      {item.message}
                    </td>
                  </tr>
                ))}

                {messages.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-8 text-center text-slate-500"
                    >
                      No messages yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-bold">
            Chat Messages
          </h2>

          <div className="space-y-4">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <p className="text-sm font-bold text-cyan-400">
                  {chat.sender}
                </p>

                <p className="mt-2 text-slate-300">
                  {chat.message}
                </p>
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
