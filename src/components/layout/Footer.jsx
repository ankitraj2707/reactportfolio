import React from "react";
import { ArrowUp } from "lucide-react";
import { PERSONAL_INFO } from "../../utils/constants";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-surface-border bg-[#030305] py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display font-bold text-white text-base">
            {PERSONAL_INFO.name}
          </span>
          <span className="text-xs text-slate-500 mt-1">
            © {new Date().getFullYear()} All rights reserved. B.Tech CSE
            Undergrad.
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href={PERSONAL_INFO.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-electric-blue hover:underline transition-colors"
          >
            Live Portfolio (v1)
          </a>
          <a
            href={PERSONAL_INFO.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PERSONAL_INFO.links.featuredProjectDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Yojana Basket
          </a>
        </div>

        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="p-2.5 rounded-lg border border-surface-border bg-surface-base hover:bg-white/10 text-slate-400 hover:text-white transition-all"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
};
