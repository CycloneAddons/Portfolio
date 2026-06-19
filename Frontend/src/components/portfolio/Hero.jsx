import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ArrowUpRight,
  Linkedin,
  Instagram,
  MessageSquare,
  Youtube,
} from "lucide-react";
import data from "../../data.json";
import { FaDiscord } from "react-icons/fa";
const socialIconMap = {
  Github,
  Linkedin,
  MessageSquare,
  Instagram,
  Discord: FaDiscord,
  Youtube,
};

export default function Hero() {

  const { defaultName, alternateName, roles, description, socials } = data.hero;

  const [displayText, setDisplayText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const [displayName, setDisplayName] = useState(defaultName);
  const [isGlitchActive, setIsGlitchActive] = useState(false);

  useEffect(() => {
    let currentIsCyclone = false;
    let lastTargetName = defaultName;
    let scrambleInterval = null;
    let timer = null;

    const triggerGlitchScramble = () => {
      if (document.hidden) return;
      setIsGlitchActive(true);

      const targetText = currentIsCyclone ? defaultName : alternateName;
      lastTargetName = targetText;
      currentIsCyclone = !currentIsCyclone;

      const chars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
      let iterations = 0;

      if (scrambleInterval) clearInterval(scrambleInterval);

      scrambleInterval = setInterval(() => {
        if (document.hidden) {
          if (scrambleInterval) clearInterval(scrambleInterval);
          setDisplayName(targetText);
          setIsGlitchActive(false);
          return;
        }

        setDisplayName((prev) => {
          return targetText
            .split("")
            .map((char, index) => {
              if (index < iterations) {
                return char;
              }
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        });

        iterations += 0.55;
        if (iterations >= targetText.length) {
          if (scrambleInterval) clearInterval(scrambleInterval);
          setDisplayName(targetText);
          setIsGlitchActive(false);
        }
      }, 35);
    };

    const startTimer = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (!document.hidden) {
          triggerGlitchScramble();
        }
      }, 4000);
    };

    const stopTimer = () => {
      if (timer) clearInterval(timer);
      if (scrambleInterval) clearInterval(scrambleInterval);
      setDisplayName(lastTargetName);
      setIsGlitchActive(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (!document.hidden) {
      startTimer();
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopTimer();
    };
  }, [defaultName, alternateName]);

  useEffect(() => {
    document.title = `${displayName} — Software Engineer & Founder`;
  }, [displayName]);

  useEffect(() => {
    let timer;
    const activeRole = roles[roleIdx];

    if (!isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(activeRole.substring(0, displayText.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);

      if (displayText === activeRole) {
        timer = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(50);
        }, 2000);
      }
    } else {
      timer = setTimeout(() => {
        setDisplayText(activeRole.substring(0, displayText.length - 1));
      }, 40);

      if (displayText === "") {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
        setTypingSpeed(150);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIdx, typingSpeed, roles]);

  return (
    <div id="top" className="relative pt-32 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-7xl px-6 pb-20"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none select-none relative whitespace-nowrap ${isGlitchActive ? "animate-glitch" : ""}`}
              data-text={displayName}
            >
              {(() => {
                const parts = displayName.split(" ");
                if (parts.length > 1) {
                  return (
                    <>
                      {parts[0]}{" "}
                      <span className="text-brand-gradient">
                        {parts.slice(1).join(" ")}
                      </span>
                    </>
                  );
                }
                return <span>{displayName}</span>;
              })()}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1.5 min-h-[24px]"
            >
              <span className="font-mono text-xs sm:text-sm text-white/40 uppercase tracking-widest leading-none select-none">
                I&apos;m a
              </span>
              <div className="flex items-center leading-none whitespace-nowrap">
                <span className="font-mono text-xs sm:text-sm font-semibold text-brand-gradient uppercase tracking-widest leading-none">
                  {displayText}
                </span>
                <span className="inline-block w-[1.5px] h-[12px] bg-[#4f8cff] ml-1 animate-pulse shrink-0" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/55"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4f8cff] to-[#87c6e8] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(79,140,255,0.25)]"
              >
                Contact Me
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                My Projects
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-8 flex items-center gap-3.5"
            >
              {socials.map((s, idx) => {
                const IconComponent = socialIconMap[s.icon] || Github;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-all hover:border-[#4f8cff]/30 hover:text-white hover:bg-white/[0.06]"
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-5 flex items-center justify-center relative py-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,140,255,0.18),transparent_65%)] pointer-events-none" />

            <div className="relative h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] rounded-full border border-white/5 bg-white/[0.01] flex items-center justify-center p-2.5">
              <div className="relative h-full w-full rounded-full overflow-hidden border border-white/15 bg-black/40 shadow-[0_0_40px_rgba(79,140,255,0.15)] flex items-center justify-center">
                <img
                  src="/avatar.png"
                  alt="Cyclone Addons Avatar"
                  className="h-[105%] w-[105%] object-cover"
                  loading="eager"
                />
              </div>

              <div className="absolute top-[15%] -left-1.5 h-3.5 w-3.5 rounded-full bg-[#4f8cff] shadow-[0_0_12px_rgba(79,140,255,0.8)] animate-pulse" />
              <div
                className="absolute bottom-[20%] -right-1 h-4 w-4 rounded-full bg-[#87c6e8] shadow-[0_0_15px_rgba(135,198,232,0.8)] animate-pulse"
                style={{ animationDelay: "0.7s" }}
              />
              <div
                className="absolute bottom-[8%] left-[20%] h-3 w-3 rounded-full bg-[#4f8cff] shadow-[0_0_10px_rgba(79,140,255,0.8)] animate-pulse"
                style={{ animationDelay: "1.4s" }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
