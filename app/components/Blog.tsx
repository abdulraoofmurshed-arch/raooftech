const posts = [
  {
    category: "Cybersecurity",
    date: "Aug 16, 2026",
    title: "Why Cybersecurity Matters for Modern Businesses",
    description:
      "Learn why protecting digital systems and business data should be a priority from day one.",
  },
  {
    category: "Technology",
    date: "Aug 12, 2026",
    title: "Building a Strong Digital Presence",
    description:
      "Discover the key elements every modern business needs to succeed online.",
  },
  {
    category: "IT",
    date: "Aug 08, 2026",
    title: "How Technology Can Improve Your Business",
    description:
      "Explore practical ways technology can increase productivity and simplify everyday operations.",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="border-t border-slate-800 bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-6 py-28">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
              RaoofTech Blog
            </p>

            <h2 className="mt-5 text-4xl font-black md:text-6xl">
              Ideas, insights &
              <span className="block text-slate-500">
                technology.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-slate-400">
            Technology insights, cybersecurity tips and practical ideas for
            building better digital businesses.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group rounded-3xl border border-slate-800 bg-slate-950 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-400">
                  {post.category}
                </span>

                <span className="text-slate-600">
                  {post.date}
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-bold leading-tight">
                {post.title}
              </h3>

              <p className="mt-5 leading-7 text-slate-400">
                {post.description}
              </p>

              <button className="mt-8 font-semibold text-cyan-400 transition group-hover:text-cyan-300">
                Read Article →
              </button>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}