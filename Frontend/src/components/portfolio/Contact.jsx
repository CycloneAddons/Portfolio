import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import Section from "./Section";
import api from "../../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await api.post("/contact", formData);
      setStatus({
        type: "success",
        message: response.message || "Your message has been sent successfully!"
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: err.response?.data?.error || "Failed to send message. Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact">
      <div className="mx-auto max-w-3xl flex flex-col gap-8 text-left">
        {}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 self-start">
            <span className="h-1.5 w-1.5 rounded-full bg-[#87c6e8] pulse-dot" />{" "}
            Let&apos;s build something
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight text-gradient">
            Have an idea?
            <br />
            <span className="text-brand-gradient">Let's make it real.</span>
          </h2>

          <p className="mt-6 text-sm sm:text-base leading-relaxed text-white/55">
            From AI automation to scalable backend systems, I'm always open to building impactful products. Reach out directly or send a message through the form!
          </p>
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-white/[0.01]">
            <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#4f8cff]/5 blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                <Sparkles className="h-5 w-5 text-[#4f8cff]" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-white tracking-tight">
                  Send a Message
                </h3>
                <p className="text-xs text-white/50">
                  I'll get back to you within 24 hours.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Deepesh"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-[#4f8cff]/50 focus:bg-white/[0.04]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="deepesh@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-[#4f8cff]/50 focus:bg-white/[0.04]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hey, let's talk about building..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-[#4f8cff]/50 focus:bg-white/[0.04] resize-none"
                />
              </div>

              {/* Status Banner */}
              {status.message && (
                <div className={`p-4 rounded-xl border font-mono text-xs ${status.type === "success"
                  ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                  : "border-rose-500/20 bg-rose-500/5 text-rose-400"
                  }`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4f8cff] to-[#87c6e8] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.01] hover:brightness-110 shadow-[0_0_20px_rgba(79,140,255,0.15)] disabled:opacity-50 disabled:hover:scale-100 disabled:pointer-events-none cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
