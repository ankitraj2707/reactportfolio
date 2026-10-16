import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";
import { SKILL_CATEGORIES } from "../../utils/constants";

export const Skills = () => {
  return (
    <section id="skills" className="py-24 relative bg-black/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Proficiencies"
          title="Technical Arsenal"
          subtitle="Categorized toolsets and engineering practices utilized in active application design."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
            >
              <GlassCard className="h-full border-t-2 border-t-electric-blue/40">
                <h3 className="text-lg font-display font-bold text-white mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <li
                      key={sIdx}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-violet" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
