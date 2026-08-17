"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <a href="#" className="text-2xl font-black tracking-tight">
          Raoof<span className="text-cyan-400">Tech</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#services" className="text-sm text-slate-300 transition hover:text-cyan-400">
            Services
          </a>
          <a href="#about" className="text-sm text-slate-300 transition hover:text-cyan-400">
            About
          </a>
          <a href="#projects" className="text-sm text-slate-300 transition hover:text-cyan-400">
            Projects
          </a>
          <a href="#blog" className="text-sm text-slate-300 transition hover:text-cyan-400">
            Blog
          </a>
          <a href="#contact" className="text-sm text-slate-300 transition hover:text-cyan-400">
            Contact
          </a>
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 md:block"
        >
          Start a Project
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="text-2xl md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            <a href="#services" onClick={() => setOpen(false)}>
              Services
            </a>
            <a href="#about" onClick={() => setOpen(false)}>
              About
            </a>
            <a href="#projects" onClick={() => setOpen(false)}>
              Projects
            </a>
            <a href="#blog" onClick={() => setOpen(false)}>
              Blog
            </a>
            <a href="#contact" onClick={() => setOpen(false)}>
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}