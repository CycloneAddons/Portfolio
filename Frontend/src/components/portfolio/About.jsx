import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Trophy,
  Cpu,
  Database,
  Lock,
  Terminal,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Section from "./Section";
import data from "../../data.json";

const getStoryIcon = (title, description) => {
  const t = title.toLowerCase();
  const d = description.toLowerCase();
  if (t.includes("discord") || t.includes("bot") || d.includes("telegram") || d.includes("discord")) {
    return MessageSquare;
  }
  if (t.includes("ai") || t.includes("talkgpt") || t.includes("neolize") || d.includes("ocr") || d.includes("vision")) {
    return Cpu;
  }
  if (t.includes("database") || d.includes("postgresql") || d.includes("drizzle") || d.includes("mongodb")) {
    return Database;
  }
  if (t.includes("authentication") || t.includes("secure") || d.includes("oauth2") || d.includes("security")) {
    return Lock;
  }
  if (t.includes("battery") || t.includes("software") || d.includes("tauri") || d.includes("windows")) {
    return Terminal;
  }
  if (t.includes("esports") || t.includes("tournament") || d.includes("esports") || t.includes("site") || d.includes("platform")) {
    return Trophy;
  }
  return Award;
};

export default function About() {
  const { story, profileDetails } = data.about;
  const [selectedYear, setSelectedYear] = useState("All");

  const years = ["All", "2020-2023", "2023", "2024", "2025", "2026"];

  const filteredStory = selectedYear === "All"
    ? story
    : story.filter((item) => item.year === selectedYear);

  const listContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  const calculateAge = (dob) => {
    const [day, month, year] = dob.split("/").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthday =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasHadBirthday) age--;

    return age;
  };

  return (
    <Section
      id="about"
      eyebrow="About"
      title="A founder journey, written in code."
      description={`I'm a ${calculateAge(data.hero.dob)}-year-old engineer who loves turning impossible ideas into working products—building AI assistants, esports automation, Discord platforms, and the backend systems that power them. Beyond that, I enjoy reverse engineering software and creating systems that technically shouldn't exist, just to see if they can be built.`}
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {}
          <div className="flex flex-wrap gap-2 mb-8 pb-3 border-b border-white/5">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`relative px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${selectedYear === year
                  ? "text-white bg-gradient-to-r from-[#4f8cff]/20 to-[#87c6e8]/20 border border-[#4f8cff]/30 shadow-sm shadow-[#4f8cff]/5"
                  : "text-white/40 border border-transparent hover:text-white/70 hover:border-white/5 hover:bg-white/[0.01]"
                  }`}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="relative pl-2">
            {}
            <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#4f8cff] via-[#4f8cff]/20 to-transparent" />

            <motion.ul
              variants={listContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredStory.map((s, i) => (
                  <StoryItem
                    key={s.title + s.year}
                    item={s}
                    index={i}
                    listItemVariants={listItemVariants}
                  />
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass hover-glow sticky top-32 rounded-2xl p-6 overflow-hidden border border-white/10"
          >
            {}
            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#4f8cff]/10 blur-3xl pointer-events-none" />

            <div className="flex items-center gap-4 border-b border-white/5 pb-4 relative z-10">
              <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-[#4f8cff] to-[#87c6e8] p-[1.5px] shadow-lg shadow-[#4f8cff]/20">
                <img
                  src="/avatar.png"
                  alt="Cyclone Addons Profile Logo"
                  className="h-full w-full object-cover rounded-full bg-[#0a0a0c]"
                />
                {}
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-[#4f8cff] ring-2 ring-[#0f0f11] shadow-md shadow-green-500/30" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-wide text-white">Cyclone Addons</div>
                <div className="font-mono text-[11px] text-white/40">
                  @CycloneAddons · Deepesh
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-4 relative z-10">
              {profileDetails.map(({ label, value }) => {
                const lowerLabel = label.toLowerCase();

                if (lowerLabel === "role") {
                  return (
                    <div key={label} className="flex flex-col gap-1 pb-3 border-b border-white/5">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#4f8cff]">
                        {label}
                      </span>
                      <span className="text-sm font-semibold text-white/95">
                        {value}
                      </span>
                    </div>
                  );
                }

                if (lowerLabel === "stack") {
                  const tags = value.split(",").map(t => t.trim());
                  return (
                    <div key={label} className="flex flex-col gap-2 pb-3 border-b border-white/5">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                        {label}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded bg-white/[0.02] border border-white/5 px-2 py-0.5 text-[10px] font-mono text-white/80 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200 cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (lowerLabel === "focus") {
                  const focuses = value.split(/[,&]/).map(f => f.trim());
                  return (
                    <div key={label} className="flex flex-col gap-2 pb-3 border-b border-white/5">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                        {label}
                      </span>
                      <ul className="space-y-1.5 text-xs text-white/70">
                        {focuses.map((focus) => (
                          <li key={focus} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#4f8cff] shadow-sm shadow-[#4f8cff]/50" />
                            <span>{focus}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                if (lowerLabel === "status") {
                  return (
                    <div key={label} className="mt-4 rounded-xl bg-gradient-to-r from-[#4f8cff]/10 to-white/[0.01] p-3 border border-[#4f8cff]/20 shadow-inner">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4f8cff] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4f8cff]"></span>
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#87c6e8]">
                          {label}
                        </span>
                      </div>
                      <div className="mt-1 text-xs font-semibold text-white/95">
                        {value}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={label} className="flex items-start justify-between gap-4 py-1">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      {label}
                    </dt>
                    <dd className="text-right text-xs text-white/80">{value}</dd>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function StoryItem({ item, index, listItemVariants }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasLongDescription = item.description.length > 180;
  const Icon = getStoryIcon(item.title, item.description);

  return (
    <motion.li
      variants={listItemVariants}
      layout="position"
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative pl-8 group"
    >
      {}
      <span className="absolute left-0 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a0a0c] border border-white/10 text-[#4f8cff] shadow-sm shadow-[#4f8cff]/10 group-hover:border-[#4f8cff]/50 transition-colors duration-300">
        <Icon className="h-3 w-3" />
      </span>

      <div className="glass hover-glow rounded-xl p-4 border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300">
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
          <h4 className="text-sm font-semibold text-white/95 tracking-wide">
            {item.title}
          </h4>
          <span className="font-mono text-[10px] font-semibold tracking-wider text-[#4f8cff] uppercase">
            {item.year}
          </span>
        </div>

        <div className="mt-2 text-xs leading-relaxed text-white/60">
          <p>
            {isExpanded
              ? item.description
              : hasLongDescription
                ? `${item.description.slice(0, 160)}...`
                : item.description}
          </p>

          {hasLongDescription && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[#4f8cff] hover:text-[#7fb0ff] transition-colors duration-200 cursor-pointer"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="h-3 w-3" />
                </>
              ) : (
                <>
                  Read More <ChevronDown className="h-3 w-3" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.li>
  );
}
