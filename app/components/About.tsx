const stats = [
  { number: "24/7", label: "Digital Support" },
  { number: "100%", label: "Security Focus" },
  { number: "6+", label: "Core Services" },
  { number: "∞", label: "Possibilities" },
];

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-slate-800 bg-slate-900/40"
    >
      <div className="mx-auto max-w-7xl px-6 py-28">

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
              About RaoofTech
            </p>

            <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              Technology with
              <span className="block text-cyan-400">
                purpose.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
              RaoofTech is a technology-focused company dedicated to building
              modern digital experiences, reliable IT solutions and strong
              cybersecurity foundations.
            </p>

            <p className="mt-5 max-w-xl leading-7 text-slate-500">
              We believe technology should not only look good. It should solve
              real problems, protect valuable information and help businesses
              move forward.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-block rounded-xl border border-cyan-400 px-6 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
            >
              Work With Us →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-slate-800 bg-slate-950 p-8"
              >
                <p className="text-4xl font-black text-cyan-400">
                  {stat.number}
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}