import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Compass,
  BookOpen,
  Sparkles,
} from "lucide-react";
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Portrait Column with Electric Glow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-sm">
              {/* Ambient Neon Blur Underlay */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-electric-blue via-indigo-500 to-electric-violet rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition-opacity duration-500" />

              {/* Glass Frame Wrapper */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#080811] p-3 shadow-2xl">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-black/60">
                  <img
                    src="/profile.png"
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-center filter grayscale-[15%] contrast-[105%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />

                  {/* Subtle Dark Vignette & Status Pill */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                    <div>
                      <p className="text-white text-xs font-semibold font-display">
                        {PERSONAL_INFO.name}
                      </p>
                      <p className="text-[11px] text-electric-blue font-mono">
                        B.Tech CSE '28
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-slate-300 font-mono px-2 py-0.5 rounded-full bg-white/10">
                      <Sparkles size={10} className="text-electric-blue" />{" "}
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education & Highlights Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <GlassCard
                  className="h-full flex flex-col justify-between p-5"
                  hoverGlow
                >
                  <div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 w-fit mb-3">
                      {item.icon}
                    </div>
                    <h3 className="font-display font-semibold text-base text-white mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
