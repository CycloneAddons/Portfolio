import { motion } from "framer-motion";
import Counter from "./Counter";
import Section from "./Section";
import data from "../../data.json";

export default function Stats() {
  const items = data.stats;

  return (
    <Section eyebrow="By the numbers" title="Engineering output, measured.">
      <div className="glass overflow-hidden rounded-3xl">
        <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] md:grid-cols-5 md:divide-y-0 lg:grid-cols-5 [&>*]:border-white/[0.06]">
          {items.map((it, idx) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`p-6 md:p-8 ${idx === 4 ? "col-span-2 md:col-span-1" : ""}`}
            >
              <div className="font-display text-4xl font-semibold tracking-tight tabular-nums md:text-5xl text-gradient">
                <Counter to={it.value} suffix={it.suffix} />
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                {it.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
