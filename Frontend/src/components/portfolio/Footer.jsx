import React from "react";
import { ArrowUp, Mail, ExternalLink, Heart, Github, Linkedin, Instagram, Youtube } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/CycloneAddons",
      label: "GitHub",
      color: "hover:text-white hover:border-white/30 hover:bg-white/5",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/cycloneaddons/",
      label: "LinkedIn",
      color: "hover:text-[#0077b5] hover:border-[#0077b5]/30 hover:bg-[#0077b5]/5",
    },
    {
      icon: FaDiscord,
      href: "https://zenkaix.dev/invite",
      label: "Discord",
      color: "hover:text-[#5865F2] hover:border-[#5865F2]/30 hover:bg-[#5865F2]/5",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/cycloneaddons",
      label: "Instagram",
      color: "hover:text-[#e1306c] hover:border-[#e1306c]/30 hover:bg-[#e1306c]/5",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@CycloneAddons",
      label: "YouTube",
      color: "hover:text-[#ff0000] hover:border-[#ff0000]/30 hover:bg-[#ff0000]/5",
    },
  ];

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const projects = [
    { label: "Battery Protector", href: "https://github.com/CycloneAddons/Battery-Protector" },
    { label: "Neolize", href: "#work" },
    { label: "Cybrox Cloud", href: "https://github.com/CycloneAddons/Cybrox-Cloud-Bot" },
  ];

  return (
    <footer className="relative border-t border-white/[0.06] bg-black/40 backdrop-blur-md overflow-hidden">
      {}
      <div className="absolute bottom-0 left-1/4 -translate-x-1/2 -z-10 h-72 w-72 rounded-full bg-[#4f8cff]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-12 right-1/4 translate-x-1/2 -z-10 h-72 w-72 rounded-full bg-[#87c6e8]/5 blur-[120px] pointer-events-none" />

      {}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4f8cff]/20 to-transparent animate-pulse" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        {}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-16">
          {}
          <div className="md:col-span-2 space-y-5">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-flex items-center gap-2.5"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/15 bg-black/40 shadow-inner group transition-transform duration-300 hover:scale-105">
                <img
                  src="/avatar.png"
                  alt="Cyclone Addons Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-display text-base font-semibold tracking-tight">
                Cyclone Addons
                <span className="text-[#87c6e8] font-light"> · Deepesh</span>
              </span>
            </a>
            <p className="text-xs sm:text-sm leading-relaxed text-white/50 max-w-sm">
              Building scalable backend infrastructures, Discord integrations, and computer vision systems. Empowering developers with custom software solutions.
            </p>
            {}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {socialLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className={`flex h-8 w-8 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-white/50 transition-all duration-300 ${item.color} hover:scale-105`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
              <a
                href="mailto:cycloneaddons@zenkaix.dev"
                aria-label="Email"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-white/50 transition-all duration-300 hover:text-white hover:border-white/20 hover:bg-white/[0.05] hover:scale-105"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(link.href.substring(1));
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="group inline-flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-[#4f8cff]"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/20 group-hover:bg-[#4f8cff] transition-all group-hover:scale-125 mr-1" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
              Featured Work
            </h4>
            <ul className="space-y-2">
              {projects.map((proj, idx) => (
                <li key={idx}>
                  {proj.href.startsWith("#") ? (
                    <a
                      href={proj.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(proj.href.substring(1));
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="group inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-[#4f8cff]"
                    >
                      {proj.label}
                    </a>
                  ) : (
                    <a
                      href={proj.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-[#4f8cff]"
                    >
                      {proj.label}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {}
        <div className="my-10 h-[1px] w-full bg-white/[0.05]" />

        {}
        <div className="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-1.5 sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2 font-mono text-[10px] text-white/30">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              All systems operational
            </div>
            <div className="font-mono text-[10px] text-white/30">
              &copy; {new Date().getFullYear()} Cyclone Addons (Deepesh). All rights reserved.
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/30">
              Crafted with <Heart className="h-3 w-3 text-rose-500 fill-rose-500 animate-pulse" /> by Deepesh
            </div>

            {}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="group flex h-8 w-8 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-white/50 transition-all duration-300 hover:text-white hover:border-[#4f8cff]/30 hover:bg-[#4f8cff]/5 hover:scale-105"
            >
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
