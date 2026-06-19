import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, Github } from "lucide-react";
import Section from "./Section";
import data from "../../data.json";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

function ProjectCard({
  index,
  name,
  tag,
  description,
  impact,
  stack,
  images = [],
  github,
  demo,
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!images || images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [activeImageIndex, isHovered, images.length]);

  let previewContent;
  if (images && images.length > 0) {
    previewContent = (
      <div 
        className="relative h-full w-full group/image overflow-hidden bg-[#070709] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={activeImageIndex}
            src={images[activeImageIndex]}
            alt={`${name} preview ${activeImageIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute h-full w-full object-contain"
          />
        </AnimatePresence>
        
        {}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setDirection(-1);
                setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white opacity-0 group-hover/image:opacity-100 transition-all duration-300 hover:bg-[#4f8cff]/85 hover:border-[#4f8cff]/30 cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setDirection(1);
                setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white opacity-0 group-hover/image:opacity-100 transition-all duration-300 hover:bg-[#4f8cff]/85 hover:border-[#4f8cff]/30 cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            
            {}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setDirection(idx > activeImageIndex ? 1 : -1);
                    setActiveImageIndex(idx);
                  }}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeImageIndex
                      ? "bg-[#4f8cff] w-3"
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  } else {
    previewContent = (
      <div className="relative flex flex-col gap-3 h-full w-full items-center justify-center p-6 bg-gradient-to-br from-white/[0.01] to-transparent">
        {}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-14 w-14 text-white/10 group-hover:text-white/20 transition-colors duration-300"
        >
          {}
          <path d="M12 2v3M8 3.5l1.5 1.5M16 3.5l-1.5 1.5" />
          {}
          <rect x="5" y="7" width="14" height="11" rx="3" />
          {}
          <path d="M8.5 10.5l2 2m0-2l-2 2" />
          {}
          <path d="M13.5 10.5l2 2m0-2l-2 2" />
          {}
          <path d="M10 15h4" />
          {}
          <path d="M5 11.5H3.5M19 11.5h1.5" />
          {}
          <path d="M21 6.5l-2.5 1M3 6.5l2.5 1" />
        </svg>
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors duration-300">
          No Images Available
        </span>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="glass hover-glow group relative overflow-hidden rounded-3xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06] bg-[#070709] lg:col-span-3 lg:aspect-auto lg:border-b-0 lg:border-r">
          {previewContent}
        </div>
        <div className="flex flex-col justify-between p-7 lg:col-span-2 lg:p-8">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                {index} · {tag}
              </span>
              {(demo || github) ? (
                <a
                  href={demo || github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-20"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-white/30 hover:text-white transition-colors" />
                </a>
              ) : (
                <ExternalLink className="h-3.5 w-3.5 text-white/30" />
              )}
            </div>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              {name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {description}
            </p>
            <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#4f8cff]">
                Impact
              </div>
              <div className="mt-1 text-sm text-white/85">{impact}</div>
            </div>
          </div>
          <div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-white/55"
                >
                  {s}
                </span>
              ))}
            </div>

            {(github || demo) && (
              <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4 relative z-20">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[11px] text-white/65 hover:text-[#4f8cff] hover:bg-white/[0.03] border border-white/10 hover:border-[#4f8cff]/30 rounded-lg px-3 py-1.5 transition-all duration-300 shadow-sm"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Source
                  </a>
                )}
                {demo && (
                  <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[11px] text-white/65 hover:text-[#4f8cff] hover:bg-white/[0.03] border border-white/10 hover:border-[#4f8cff]/30 rounded-lg px-3 py-1.5 transition-all duration-300 shadow-sm"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const projects = data.projects;

  return (
    <Section
      id="work"
      eyebrow="Featured Work"
      title="Systems that ship, scale, and stay up."
      description="A selection of products and infrastructure I've designed and built end-to-end."
    >
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            index={project.index}
            name={project.name}
            tag={project.tag}
            description={project.description}
            impact={project.impact}
            stack={project.stack}
            images={project.images}
            github={project.github}
            demo={project.demo}
          />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <motion.a
          href="https://github.com/CycloneAddons?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#4f8cff]/30 px-6 py-3.5 font-mono text-sm text-white/80 hover:text-white transition-all duration-300 shadow-lg shadow-black/10 group cursor-pointer"
        >
          <Github className="h-4 w-4" />
          <span>Explore More Repositories</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </motion.a>
      </div>
    </Section>
  );
}
