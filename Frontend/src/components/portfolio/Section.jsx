import { motion } from "framer-motion";

export default function Section({ id, eyebrow, title, description, className = "py-28 md:py-36", children }) {
  return (
    <section
      id={id}
      className={`section-rendering relative mx-auto w-full max-w-7xl px-6 ${className}`}
    >
      {(eyebrow || title || description) && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-3xl"
        >
          {eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4f8cff] pulse-dot" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl text-gradient">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
              {description}
            </p>
          )}
        </motion.div>
      )}
      {children}
    </section>
  );
}
