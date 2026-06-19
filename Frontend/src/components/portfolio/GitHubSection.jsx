import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Code2,
  GitBranch,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import Section from "./Section";
import api from "../../services/api";

export default function GitHubSection() {
  const [data, setData] = useState(null);
  const [contributedRepos, setContributedRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);
  const [yearPage, setYearPage] = useState(0);
  const [langPage, setLangPage] = useState(0);

  useEffect(() => {
    setFetching(true);
    api.get(`/github?year=${selectedYear}`)
      .then((json) => {
        setData(json);
        if (json.years && json.years.length > 0) {
          setYears(json.years);
        }
        setLoading(false);
        setFetching(false);
      })
      .catch((err) => {
        console.error("Error fetching GitHub data:", err);
        setLoading(false);
        setFetching(false);
      });
  }, [selectedYear]);

  useEffect(() => {
    api.get("/contributed-repos")
      .then((json) => {
        setContributedRepos(json);
      })
      .catch((err) => {
        console.error("Error fetching contributed repos:", err);
      });
  }, []);

  const levels = [
    "bg-white/[0.04]",
    "bg-[#4f8cff]/25",
    "bg-[#4f8cff]/50",
    "bg-[#4f8cff]/75",
    "bg-[#87c6e8]",
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (loading || !data) {
    return (
      <Section
        eyebrow="GitHub"
        title="Code, daily."
        description="A snapshot of what shipping looks like across the year."
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="glass rounded-2xl p-6 lg:col-span-2 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-4 w-48 rounded bg-white/10" />
              <div className="h-4 w-32 rounded bg-white/10" />
            </div>
            <div className="mt-6 h-24 w-full rounded bg-white/5" />
            <div className="mt-4 h-3 w-32 rounded bg-white/10 ml-auto" />
          </div>
          <div className="glass rounded-2xl p-6 animate-pulse">
            <div className="h-4 w-32 rounded bg-white/10" />
            <div className="mt-5 h-2 w-full rounded bg-white/5" />
            <div className="mt-6 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3.5 w-24 rounded bg-white/10" />
                  <div className="h-3.5 w-8 rounded bg-white/10" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 mt-6 mb-2 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4f8cff]/40" />
              <div className="h-5 w-40 rounded bg-white/10" />
            </div>
            <div className="h-3 w-16 rounded bg-white/5" />
          </div>

          <div className="lg:col-span-3 flex flex-wrap gap-4 justify-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-5 animate-pulse h-[130px] flex flex-col justify-between w-full lg:w-[calc((100%-2rem)/3)]"
              >
                <div className="flex justify-between">
                  <div className="h-4 w-36 rounded bg-white/10" />
                  <div className="h-4 w-4 rounded bg-white/10" />
                </div>
                <div className="h-3 w-full rounded bg-white/5 mt-2" />
                <div className="flex justify-between mt-auto pt-4">
                  <div className="h-3 w-16 rounded bg-white/10" />
                  <div className="h-3 w-20 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 mt-8 mb-2 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#87c6e8]/40" />
              <div className="h-5 w-48 rounded bg-white/10" />
            </div>
            <div className="h-3 w-16 rounded bg-white/5" />
          </div>

          <div className="lg:col-span-3 flex flex-wrap gap-4 justify-center">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-5 animate-pulse h-[130px] flex flex-col justify-between w-full lg:w-[calc((100%-2rem)/3)]"
              >
                <div className="flex justify-between">
                  <div className="h-4 w-36 rounded bg-white/10" />
                  <div className="h-4 w-4 rounded bg-white/10" />
                </div>
                <div className="h-3 w-full rounded bg-white/5 mt-2" />
                <div className="flex justify-between mt-auto pt-4">
                  <div className="h-3 w-16 rounded bg-white/10" />
                  <div className="h-3 w-20 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section
      eyebrow="GitHub"
      title="Code, daily."
      description="A snapshot of what shipping looks like across the year."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-4 lg:grid-cols-3"
      >
        <motion.div
          variants={cardVariants}
          className="glass rounded-2xl p-6 lg:col-span-2 md:max-h-50 md:overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4 text-white/70" />
              <span className="font-mono text-xs text-white/60">
                @CycloneAddons
              </span>
            </div>
            <span className="font-mono text-[10px] text-white/40">
              {data.totalContributionsText || "contributions"}
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex-1 min-w-0">
              <div
                className={`grid grid-flow-col grid-rows-7 gap-[2px] sm:gap-[3px] transition-opacity duration-300 ${fetching ? "animate-pulse opacity-40" : "opacity-100"}`}
                style={{
                  gridAutoColumns: "1fr",
                }}
              >
                {data.contributions.map((d, i) => (
                  <div
                    key={i}
                    className={`aspect-square w-full rounded-[2px] sm:rounded-[3px] ${levels[d.level]}`}
                    title={`${d.date}: Level ${d.level}`}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 font-mono text-[10px] text-white/40">
                less
                {levels.map((l, i) => (
                  <span key={i} className={`h-2.5 w-2.5 rounded-[2px] ${l}`} />
                ))}
                more
              </div>
            </div>

            <div className="flex flex-row items-center gap-3 shrink-0 border-t border-white/5 pt-4 md:border-t-0 md:pt-0 md:border-l md:border-white/5 md:pl-4">
              {(() => {
                const allYears = years;
                const pageSize = 3;
                const maxPage = Math.ceil(allYears.length / pageSize) - 1;
                const visible = allYears.slice(
                  yearPage * pageSize,
                  yearPage * pageSize + pageSize,
                );
                const hasPrev = yearPage > 0;
                const hasNext = yearPage < maxPage;
                return (
                  <>
                    <div className="flex flex-row gap-1.5 md:flex-col md:w-16">
                      {Array.from({ length: pageSize }).map((_, idx) => {
                        const y = visible[idx];
                        if (y === undefined) {
                          return (
                            <button
                              key={`spacer-${idx}`}
                              className="invisible pointer-events-none rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-semibold"
                            >
                              Placeholder
                            </button>
                          );
                        }
                        const label = y || "Active";
                        const isActive = selectedYear === y;
                        return (
                          <button
                            key={y}
                            onClick={() => setSelectedYear(y)}
                            className={`rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-semibold transition-all text-center cursor-pointer ${isActive
                              ? "bg-[#4f8cff] text-white shadow-[0_0_12px_rgba(79,140,255,0.35)]"
                              : "bg-white/[0.03] text-white/50 hover:bg-white/[0.06] hover:text-white"
                              }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex flex-row gap-1 md:flex-col md:items-center">
                      <button
                        onClick={() => setYearPage((p) => p - 1)}
                        disabled={!hasPrev}
                        className={`flex items-center justify-center rounded-lg p-1 transition-colors ${hasPrev
                          ? "text-white/60 hover:text-white cursor-pointer"
                          : "text-white/10 pointer-events-none"
                          }`}
                        title="Previous years"
                      >
                        <ChevronDown className="h-3.5 w-3.5 rotate-180" />
                      </button>
                      <button
                        onClick={() => setYearPage((p) => p + 1)}
                        disabled={!hasNext}
                        className={`flex items-center justify-center rounded-lg p-1 transition-colors ${hasNext
                          ? "text-white/60 hover:text-white cursor-pointer"
                          : "text-white/10 pointer-events-none"
                          }`}
                        title="More years"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="glass rounded-2xl p-6 max-h-50 overflow-hidden"
        >
          <div className="flex items-center gap-2 text-white/70">
            <Code2 className="h-4 w-4" />
            <span className="font-mono text-xs">Most Used Languages</span>
          </div>
          <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-white/5">
            {data.langs.map(([n, p, c]) => (
              <div key={n} style={{ width: `${p}%`, background: c }} />
            ))}
          </div>
          {(() => {
            const pageSize = 6;
            const maxPage = Math.ceil(data.langs.length / pageSize) - 1;
            const visible = data.langs.slice(
              langPage * pageSize,
              langPage * pageSize + pageSize,
            );
            return (
              <>
                {langPage > 0 && (
                  <button
                    onClick={() => setLangPage((p) => p - 1)}
                    className="mt-3 flex w-full items-center justify-center py-0.5 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                  >
                    <ChevronDown className="h-3.5 w-3.5 rotate-180" />
                  </button>
                )}
                <div
                  className={`${langPage > 0 ? "mt-2" : "mt-5"} grid grid-cols-2 gap-x-4 gap-y-2.5`}
                >
                  {visible.map(([n, p, c]) => (
                    <div key={n} className="flex items-center gap-2 text-sm">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ background: c }}
                      />

                      <span className="text-white/80 truncate">{n}</span>
                      <span className="font-mono text-xs text-white/40 tabular-nums ml-auto shrink-0">
                        {p}%
                      </span>
                    </div>
                  ))}
                </div>
                {langPage < maxPage && (
                  <button
                    onClick={() => setLangPage((p) => p + 1)}
                    className="mt-2 flex w-full items-center justify-center py-0.5 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                )}
              </>
            );
          })()}
        </motion.div>

        <div className="lg:col-span-3 mt-6 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4f8cff]" />
            <h3 className="font-display text-lg font-medium text-white/90">
              Featured Repositories
            </h3>
          </div>
          <span className="font-mono text-[10px] text-white/40">
            {data.repos.length} sources
          </span>
        </div>

        <div className="lg:col-span-3 flex flex-wrap gap-4 justify-center">
          {data.repos.map((r) => (
            <motion.a
              key={r.name}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              variants={itemVariants}
              className="glass hover-glow group rounded-2xl p-5 flex flex-col justify-between w-full lg:w-[calc((100%-2rem)/3)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <GitBranch className="h-4 w-4 text-white/60" />
                    {r.name}
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/30 transition-colors group-hover:text-white" />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/55 line-clamp-2">
                  {r.description}
                </p>
              </div>
              {(() => {
                const langColor = data.langs.find(([n]) => n === r.language)?.[2] || "#4f8cff";
                return (
                  <div className="mt-4 flex items-center gap-4 font-mono text-[10px] text-white/40">
                    <span>★ {r.stars}</span>
                    <span>⑂ {r.forks}</span>
                    <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: langColor }} />
                    <span>{r.language}</span>
                  </div>
                );
              })()}
            </motion.a>
          ))}
        </div>

        {contributedRepos.length > 0 && (
          <>
            <div className="lg:col-span-3 mt-8 mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#87c6e8]" />
                <h3 className="font-display text-lg font-medium text-white/90">
                  Contributed Repositories
                </h3>
              </div>
              <span className="font-mono text-[10px] text-white/40">
                {contributedRepos.length} contributions
              </span>
            </div>

            <div className="lg:col-span-3 flex flex-wrap gap-4 justify-center">
              {contributedRepos.map((r) => (
                <motion.a
                  key={r.name}
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  variants={itemVariants}
                  className="glass hover-glow group rounded-2xl p-5 flex flex-col justify-between w-full lg:w-[calc((100%-2rem)/3)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <GitBranch className="h-4 w-4 text-white/60" />
                        {r.name}
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-white/30 transition-colors group-hover:text-white" />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-white/55 line-clamp-2">
                      {r.description}
                    </p>
                  </div>
                  {(() => {
                    const langColor = data.langs.find(([n]) => n === r.language)?.[2] || "#4f8cff";
                    return (
                      <div className="mt-4 flex items-center gap-4 font-mono text-[10px] text-white/40">
                        <span>★ {r.stars}</span>
                        <span>⑂ {r.forks}</span>
                        <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: langColor }} />
                        <span>{r.language}</span>
                      </div>
                    );
                  })()}
                </motion.a>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </Section>
  );
}
