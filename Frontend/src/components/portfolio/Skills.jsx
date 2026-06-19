import React from "react";
import {
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiLinux,
  SiMongodb,
  SiRedis,
  SiExpress,
  SiNginx,
  SiGithub,
  SiDiscord,
  SiPostgresql,
  SiDocker,
  SiTypescript,
  SiGit,
  SiPostman,
  SiOpencv,
  SiWireshark,
  SiJavascript,
  SiNextdotjs,
  SiGo,
  SiBun,
  SiSupabase,
  SiPrisma,
  SiFigma,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { FaAws } from "react-icons/fa";
import Section from "./Section";

const row1Skills = [
  { name: "JavaScript", Icon: SiJavascript, label: "Language" },
  { name: "TypeScript", Icon: SiTypescript, label: "Learning" },
  { name: "Python", Icon: SiPython, label: "Language" },
  { name: "Go", Icon: SiGo, label: "Learning" },
  { name: "React", Icon: SiReact, label: "UI Library" },
  { name: "Next.js", Icon: SiNextdotjs, label: "Learning" },
  { name: "Node.js", Icon: SiNodedotjs, label: "Runtime" },
  { name: "Bun", Icon: SiBun, label: "Learning" },
];

const row2Skills = [
  { name: "MongoDB", Icon: SiMongodb, label: "NoSQL" },
  { name: "PostgreSQL", Icon: SiPostgresql, label: "Learning" },
  { name: "Redis", Icon: SiRedis, label: "Cache" },
  { name: "Supabase", Icon: SiSupabase, label: "BaaS" },
  { name: "Docker", Icon: SiDocker, label: "Learning" },
  { name: "AWS", Icon: FaAws, label: "Cloud" },
  { name: "Nginx", Icon: SiNginx, label: "Proxy" },
];

const row3Skills = [
  { name: "Git", Icon: SiGit, label: "VCS" },
  { name: "GitHub", Icon: SiGithub, label: "Hosting" },
  { name: "VS Code", Icon: TbBrandVscode, label: "Editor" },
  { name: "Postman", Icon: SiPostman, label: "Testing" },
  { name: "Figma", Icon: SiFigma, label: "Learning" },
  { name: "Linux", Icon: SiLinux, label: "OS" },
  { name: "Tailwind", Icon: SiTailwindcss, label: "Learning" },
  { name: "Express.js", Icon: SiExpress, label: "Backend" },
  { name: "Discord.js", Icon: SiDiscord, label: "Bot SDK" },
  { name: "OpenCV", Icon: SiOpencv, label: "Vision" },
  { name: "Wireshark", Icon: SiWireshark, label: "Learning" },
];


const SkillBadge = ({ name, Icon, label }) => (
  <div className="group glass relative flex items-center gap-3 px-4 py-2 rounded-2xl border border-white/5 hover:border-[#4f8cff]/10 transition-all duration-300 ease-out cursor-default shadow-lg shadow-black/10 hover:scale-105">
    {}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4f8cff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <Icon
      className="h-5 w-5 transition-all duration-300 opacity-40 group-hover:opacity-100 group-hover:scale-110"
    />

    <div className="flex flex-col leading-none">
      <span className="font-mono text-xs font-medium tracking-wider text-white/60 group-hover:text-white/95 transition-colors duration-200">
        {name}
      </span>
      <span
        className={`text-[8px] uppercase tracking-widest transition-colors duration-200 ${
          label === "Learning"
            ? "text-yellow-400/80 group-hover:text-yellow-300"
            : "text-white/20 group-hover:text-[#4f8cff]/60"
        }`}
      >
        {label}
      </span>
    </div>
  </div>
);


export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="⚡ Capabilities"
      title="Technologies & Tools."
      description="A look at the languages, databases, libraries, and platforms I use to build scalable products and tools."
    >
      <div
        className="relative w-full overflow-hidden flex flex-col gap-6"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)"
        }}
      >

        {}
        <div className="flex w-full overflow-hidden">
          <div
            className="flex w-max gap-5 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]"
            style={{ animationDuration: "48s" }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-5">
                {row1Skills.map((skill) => (
                  <SkillBadge key={skill.name} {...skill} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="flex w-full overflow-hidden">
          <div
            className="flex w-max gap-5 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]"
            style={{ animationDuration: "55s", animationDirection: "reverse" }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-5">
                {row2Skills.map((skill) => (
                  <SkillBadge key={skill.name} {...skill} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="flex w-full overflow-hidden">
          <div
            className="flex w-max gap-5 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]"
            style={{ animationDuration: "40s" }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-5">
                {row3Skills.map((skill) => (
                  <SkillBadge key={skill.name} {...skill} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}