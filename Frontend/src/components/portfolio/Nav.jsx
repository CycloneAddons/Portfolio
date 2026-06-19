import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    ["</> About", "about"],
    ["</> Work", "work"],
    ["</> Experience", "experience"],
    ["</> Contact", "contact"],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-full border border-white/[0.06] px-4 py-2.5 transition-all duration-500 ${scrolled || mobileMenuOpen ? "bg-black/60 backdrop-blur-xl" : "bg-transparent"}`}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 pl-2"
          >
            <div className="relative h-7 w-7 overflow-hidden rounded-full border border-white/15 bg-black/40">
              <img
                src="/avatar.png"
                alt="Cyclone Addons Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-display text-sm font-medium tracking-tight">
              Cyclone Addons<span className="text-white/40"> · Deepesh</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {items.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="rounded-full px-4 py-2 text-sm text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.02] sm:flex"
            >
              Get in touch
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white md:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mx-auto max-w-7xl px-6 mt-3 md:hidden">
          <div className="glass rounded-2xl p-4 flex flex-col gap-1.5 shadow-2xl">
            {items.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="rounded-lg px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center justify-center gap-1.5 rounded-full bg-white py-3 text-sm font-medium text-black sm:hidden"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
