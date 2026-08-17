export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div className="lg:col-span-2">
            <div className="text-2xl font-black">
              Raoof<span className="text-cyan-400">Tech</span>
            </div>

            <p className="mt-5 max-w-md leading-7 text-slate-400">
              Modern technology, cybersecurity and IT solutions
              for businesses ready to grow in the digital world.
            </p>

            <p className="mt-6 text-sm text-slate-600">
              Technology with purpose.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">
              Company
            </h3>

            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <a
                href="#about"
                className="block transition hover:text-cyan-400"
              >
                About
              </a>

              <a
                href="#services"
                className="block transition hover:text-cyan-400"
              >
                Services
              </a>

              <a
                href="#projects"
                className="block transition hover:text-cyan-400"
              >
                Projects
              </a>

              <a
                href="#blog"
                className="block transition hover:text-cyan-400"
              >
                Blog
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <a
                href="#contact"
                className="block transition hover:text-cyan-400"
              >
                Contact Us
              </a>

              <a
                href="mailto:hello@raooftech.com"
                className="block transition hover:text-cyan-400"
              >
                hello@raooftech.com
              </a>

              <a
                href="#"
                className="block transition hover:text-cyan-400"
              >
                LinkedIn
              </a>

              <a
                href="#"
                className="block transition hover:text-cyan-400"
              >
                GitHub
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} RaoofTech. All rights reserved.
          </p>

          <p>
            Built with Next.js & Supabase
          </p>

        </div>

      </div>
    </footer>
  );
}