import React from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";
import { HACKATHONS } from "../../utils/constants";

export const Hackathons = () => {
  return (
    <section id="hackathons" className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Competitions"
          title="Hackathons & Sprints"
          subtitle="Intensive collaborative environments turning problem statements into functional production prototypes."
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {HACKATHONS.map((hackathon, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="p-6 md:p-8" hoverGlow>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-electric-violet/10 border border-electric-violet/30 text-electric-violet">
                      <Trophy size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg md:text-xl text-white">
                        {hackathon.title}
                      </h3>
                      <p className="text-xs text-electric-blue font-medium">
                        {hackathon.event}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar size={13} />
                    {hackathon.date}
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {hackathon.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-surface-border">
                  {hackathon.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
