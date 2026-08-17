"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();

  const [messages, setMessages] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [checking, setChecking] = useState(true);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      try {
        const { data, error } = await supabase.auth.getSession();

console.log("SESSION:", data.session);
console.log("AUTH ERROR:", error);

if (!data.session) {
  router.replace("/admin/login");
  return;
}

        if (mounted) {
          setChecking(false);
        }

        loadData();
      } catch (error) {
        console.error("Authentication error:", error);

        if (mounted) {
          setChecking(false);
        }

        router.replace("/admin/login");
      }
    }

    checkUser();

    return () => {
      mounted = false;
    };
  }, [router]);

  async function loadData() {
    setLoadingData(true);

    try {
      const [contactResult, chatResult] = await Promise.all([
        supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false }),

        supabase
          .from("chat_messages")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (contactResult.error) {
        console.error("Contact messages error:", contactResult.error);
      }

      if (chatResult.error) {
        console.error("Chat messages error:", chatResult.error);
      }

      setMessages(contactResult.data || []);
      setChats(chatResult.data || []);
    } catch (error) {
      console.error("Loading data error:", error);
    } finally {
      setLoadingData(false);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" />

          <p className="text-slate-400">
            Checking authentication...
          </p>
        </div>
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
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Contact Messages
            </h2>

            {loadingData && (
              <span className="text-sm text-slate-500">
                Loading...
              </span>
            )}
          </div>

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