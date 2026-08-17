"use client";

import { FormEvent, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "");
    const message = String(formData.get("message") || "");

    if (!name || !email || !message) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const { error: supabaseError } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          email,
          subject,
          message,
        },
      ]);

    if (supabaseError) {
      console.error("Supabase Error:", supabaseError);
      setError("Something went wrong. Please try again.");
    } else {
      setSuccess("Your message has been sent successfully!");
      form.reset();
    }

    setLoading(false);
  }

  return (
    <section
      id="contact"
      className="border-t border-slate-800 bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6 py-28">

        <div className="grid gap-16 lg:grid-cols-2">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
              Contact RaoofTech
            </p>

            <h2 className="mt-5 text-4xl font-black md:text-6xl">
              Let&apos;s build
              <span className="block text-cyan-400">
                something great.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
              Have a project, business idea or technology challenge?
              Tell us about it and let&apos;s create the right solution.
            </p>

            <div className="mt-10 space-y-6">

              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="mt-1 font-semibold text-white">
                  hello@raooftech.com
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Response Time</p>
                <p className="mt-1 font-semibold text-white">
                  Within 24 hours
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Services</p>
                <p className="mt-1 font-semibold text-white">
                  IT • Cybersecurity • Web Development
                </p>
              </div>

            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 md:p-10"
          >

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="text-sm text-slate-400">
                  Name *
                </label>

                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400">
                  Email *
                </label>

                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
                />
              </div>

            </div>

            <div className="mt-6">
              <label className="text-sm text-slate-400">
                Subject
              </label>

              <input
                name="subject"
                type="text"
                placeholder="How can we help?"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <div className="mt-6">
              <label className="text-sm text-slate-400">
                Message *
              </label>

              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tell us about your project..."
                className="mt-2 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            {success && (
              <div className="mt-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
                ✅ {success}
              </div>
            )}

            {error && (
              <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}