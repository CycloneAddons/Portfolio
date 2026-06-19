import { motion } from "framer-motion";
import Section from "./Section";
import data from "../../data.json";

export default function Experience() {
  const items = data.experience;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Section
      id="experience"
      eyebrow="Timeline"
      title="Six years of shipping."
      description="A condensed view of the engineering path so far."
    >
      <div className="relative">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-[#4f8cff]/40 via-white/10 to-transparent md:left-1/2" />
        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-10"
        >
          {items.map(({ year, title, description }, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className={`relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12 ${
                i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
              }`}
            >
              <span className="absolute left-3 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-white ring-4 ring-black md:left-1/2" />
              <div
                className={`pl-10 md:pl-0 ${
                  i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#4f8cff]">
                  {year}
                </div>
                <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">
                  {title}
                </h3>
              </div>
              <div
                className={`pl-10 md:pl-0 ${
                  i % 2 === 0 ? "md:pl-12" : "md:text-right md:pr-12"
                }`}
              >
                <p className="text-sm leading-relaxed text-white/60">{description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Section>
  );
}
