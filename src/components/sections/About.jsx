import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Compass, BookOpen } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";
import { PERSONAL_INFO } from "../../utils/constants";

export const About = () => {
  const highlights = [
    {
      icon: <GraduationCap className="text-electric-blue" size={24} />,
      title: "Current Education",
      description: `${PERSONAL_INFO.degree} at ${PERSONAL_INFO.institution} (Graduating ${PERSONAL_INFO.graduationYear})`,
    },
    {
      icon: <Award className="text-electric-violet" size={24} />,
      title: "Academic Performance",
      description: `Cumulative Grade Point Average: ${PERSONAL_INFO.cgpa} / 10.0`,
    },
    {
      icon: <Compass className="text-electric-blue" size={24} />,
      title: "Technical Focus",
      description:
        "Full Stack Architecture, Modern Web Protocols, API Engineering, and WebGL",
    },
    {
      icon: <BookOpen className="text-electric-violet" size={24} />,
      title: "Continuous Learning",
      description:
        "Actively building public open source tools and exploring distributed backend paradigms",
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Background"
          title="About & Education"
          subtitle="Combining strong computer science foundations with practical full-stack application development."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="h-full flex items-start gap-4" hoverGlow>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
