export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">

        <div>
          <div className="mb-7 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            🚀 Technology • IT • Cybersecurity
          </div>

          <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            We build
            <span className="block text-cyan-400">
              digital futures.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
            RaoofTech creates powerful digital solutions, modern websites
            and cybersecurity services for businesses ready to grow.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#services"
              className="rounded-xl bg-cyan-400 px-7 py-4 text-center font-bold text-slate-950 transition hover:scale-105 hover:bg-cyan-300"
            >
              Explore Services →
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-slate-700 px-7 py-4 text-center font-semibold transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Talk to Us
            </a>
          </div>

          <div className="mt-12 flex gap-10 border-t border-slate-800 pt-8">
            <div>
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-slate-500">Digital Support</p>
            </div>

            <div>
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm text-slate-500">Security Focus</p>
            </div>

            <div>
              <p className="text-2xl font-bold">∞</p>
              <p className="text-sm text-slate-500">Ideas</p>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative mx-auto aspect-square max-w-lg overflow-hidden rounded-[40px] border border-cyan-400/20 bg-slate-900/60 p-8 shadow-2xl">

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10" />

            <div className="relative flex h-full flex-col justify-between">

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  RAOOFTECH / SYSTEM
                </span>

                <span className="h-3 w-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
                  <p className="text-xs text-slate-500">
                    SECURITY STATUS
                  </p>
                  <p className="mt-2 text-2xl font-bold text-green-400">
                    PROTECTED
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
                    <p className="text-3xl">🛡️</p>
                    <p className="mt-3 font-semibold">Cybersecurity</p>
                  </div>

                  <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
                    <p className="text-3xl">⚡</p>
                    <p className="mt-3 font-semibold">IT Solutions</p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-slate-500">
                Building tomorrow&apos;s technology.
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}