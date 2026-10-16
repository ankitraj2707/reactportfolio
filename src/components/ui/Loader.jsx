import React from "react";
import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508]"
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-t-2 border-r-2 border-electric-blue"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute w-16 h-16 rounded-full border-b-2 border-l-2 border-electric-violet"
        />
        <span className="absolute font-display font-bold text-lg text-white">
          AR
        </span>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-6 text-sm text-slate-400 font-mono tracking-widest uppercase"
      >
        Initializing Architecture...
      </motion.p>
    </motion.div>
  );
};
