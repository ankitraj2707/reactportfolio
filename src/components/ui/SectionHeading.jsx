import React from "react";
import { motion } from "framer-motion";

export const SectionHeading = ({ badge, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center text-center mb-16">
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-electric-violet/40 bg-electric-violet/10 text-electric-violet font-semibold mb-4"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-2xl text-base md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
