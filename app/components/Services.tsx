const services = [
  {
    number: "01",
    icon: "💻",
    title: "Web Development",
    description:
      "Modern, fast and responsive websites built to turn visitors into customers.",
  },
  {
    number: "02",
    icon: "🛡️",
    title: "Cybersecurity",
    description:
      "Security solutions designed to protect systems, networks and sensitive data.",
  },
  {
    number: "03",
    icon: "⚡",
    title: "IT Solutions",
    description:
      "Reliable technology solutions that make businesses faster and more productive.",
  },
  {
    number: "04",
    icon: "📱",
    title: "App Development",
    description:
      "Powerful mobile and web applications designed around your business needs.",
  },
  {
    number: "05",
    icon: "☁️",
    title: "Cloud Solutions",
    description:
      "Modern cloud infrastructure designed for scalability, reliability and performance.",
  },
  {
    number: "06",
    icon: "🔧",
    title: "Technical Support",
    description:
      "Professional technical assistance to keep your digital operations running smoothly.",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-28">

        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
            What We Do
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            Technology solutions
            <span className="block text-slate-500">
              built for the future.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            From websites and applications to cybersecurity and IT,
            RaoofTech helps businesses build, protect and grow their digital
            presence.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.number}
              className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-7 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-cyan-400">
                  {service.number}
                </span>

                <span className="text-4xl transition duration-300 group-hover:scale-110">
                  {service.icon}
                </span>
              </div>

              <h3 className="mt-10 text-2xl font-bold">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {service.description}
              </p>

              <div className="mt-8 text-sm font-semibold text-cyan-400">
                Learn more →
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}