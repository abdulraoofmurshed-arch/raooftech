const projects = [
  {
    number: "01",
    category: "Web Development",
    title: "Business Digital Platform",
    description:
      "A modern digital platform designed to give businesses a powerful online presence.",
    tags: ["Next.js", "UI/UX", "Web"],
  },
  {
    number: "02",
    category: "Cybersecurity",
    title: "Security Monitoring System",
    description:
      "A security-focused platform designed to monitor digital environments and identify potential threats.",
    tags: ["Security", "Monitoring", "IT"],
  },
  {
    number: "03",
    category: "IT Solutions",
    title: "Smart IT Management",
    description:
      "A centralized solution designed to simplify technology management for modern organizations.",
    tags: ["IT", "Cloud", "Management"],
  },
  {
    number: "04",
    category: "Application Development",
    title: "Business Application",
    description:
      "A scalable application concept built to improve productivity and automate everyday workflows.",
    tags: ["App", "Automation", "Technology"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-28">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
              Selected Work
            </p>

            <h2 className="mt-5 text-4xl font-black md:text-6xl">
              Projects that
              <span className="block text-slate-500">
                make an impact.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-slate-400">
            A look at the type of digital products and technology solutions
            RaoofTech can build.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.number}
              className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40"
            >
              <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40">
                <span className="text-7xl font-black text-white/5 transition duration-300 group-hover:text-cyan-400/20">
                  {project.number}
                </span>
              </div>

              <div className="p-8">
                <p className="text-sm font-semibold text-cyan-400">
                  {project.category}
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}