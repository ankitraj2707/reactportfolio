import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Globe, ExternalLink, MapPin } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";
import { PERSONAL_INFO } from "../../utils/constants";

export const Contact = () => {
  const contactLinks = [
    {
      title: "Live Web Portfolio",
      value: "ankitraj2707.vercel.app",
      href: PERSONAL_INFO.links.portfolio,
      icon: <Globe size={22} className="text-electric-blue" />,
      hoverBorder: "hover:border-electric-blue/50",
      glowColor: "group-hover:shadow-[0_0_25px_rgba(0,210,255,0.2)]",
      badgeColor: "bg-electric-blue/10 text-electric-blue",
    },
    {
      title: "Professional Profile",
      value: "linkedin.com/in/ankitraj2707",
      href: PERSONAL_INFO.links.linkedin,
      icon: <Linkedin size={22} className="text-electric-blue" />,
      hoverBorder: "hover:border-electric-blue/50",
      glowColor: "group-hover:shadow-[0_0_25px_rgba(0,210,255,0.2)]",
      badgeColor: "bg-white/5 text-electric-blue",
    },
    {
      title: "Code Repositories",
      value: "github.com/ankitraj2707",
      href: PERSONAL_INFO.links.github,
      icon: <Github size={22} className="text-electric-violet" />,
      hoverBorder: "hover:border-electric-violet/50",
      glowColor: "group-hover:shadow-[0_0_25px_rgba(157,78,221,0.2)]",
      badgeColor: "bg-white/5 text-electric-violet",
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Get in Touch"
          title="Let's Connect"
          subtitle="Open for internships, engineering roles, open source collaborations, and technical discussions."
        />

        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Contact Channels Grid */}
          <div className="w-full space-y-4">
            {contactLinks.map((item, idx) => (
              <motion.a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`group flex items-center justify-between p-5 rounded-2xl border border-surface-border bg-surface-base/80 backdrop-blur-md transition-all duration-300 ${item.hoverBorder} ${item.glowColor}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${item.badgeColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      {item.title}
                    </div>
                    <div className="text-base font-semibold text-white group-hover:text-electric-blue transition-colors">
                      {item.value}
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-lg text-slate-500 group-hover:text-white transition-colors">
                  <ExternalLink size={18} />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Location / Status Footer Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 px-6 py-3.5 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-sm flex items-center gap-2 text-xs text-slate-400 font-mono"
          >
            <MapPin size={14} className="text-electric-blue shrink-0" />
            <span>{PERSONAL_INFO.location} • Standard Time (IST)</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
