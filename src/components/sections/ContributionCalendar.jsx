import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, RefreshCw, MoveHorizontal } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";
import { PERSONAL_INFO } from "../../utils/constants";

export const ContributionCalendar = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const username = "ankitraj2707";

  return (
    <section className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Activity Stream"
          title="Verified Contribution Calendar"
          subtitle="Real public contribution density aggregated from GitHub commits and pull requests."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-4 sm:p-8 flex flex-col items-center overflow-hidden border border-[#30363d] bg-[#0d1117]/90 shadow-2xl">
            {/* Header */}
            <div className="w-full flex items-center justify-between pb-4 mb-4 sm:mb-6 border-b border-[#21262d]">
              <div className="flex items-center gap-2">
                <svg
                  height="18"
                  viewBox="0 0 16 16"
                  width="18"
                  className="fill-[#e6edf3]"
                  aria-hidden="true"
                >
                  <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
                <span className="font-sans font-semibold text-[#e6edf3] text-xs sm:text-base">
                  Contribution Activity
                </span>
              </div>

              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#58a6ff] hover:text-[#79c0ff] hover:underline flex items-center gap-1 transition-colors"
              >
                @{username} <ExternalLink size={11} />
              </a>
            </div>

            {/* Mobile swipe helper */}
            <div className="w-full flex sm:hidden items-center justify-end gap-1 text-[10px] text-slate-500 font-mono mb-2">
              <MoveHorizontal size={12} /> Swipe to view full timeline
            </div>

            {/* Scrollable Container */}
            <div className="w-full flex justify-start sm:justify-center items-center min-h-[130px] overflow-x-auto py-2 touch-pan-x">
              {!imgLoaded && (
                <div className="w-full flex justify-center items-center gap-2 text-[#7d8590] text-xs font-mono py-8">
                  <RefreshCw
                    className="animate-spin text-[#39d353]"
                    size={16}
                  />
                  Loading graph...
                </div>
              )}
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-dark&hide_border=true&area=true`}
                alt={`${username}'s GitHub contribution calendar`}
                className={`min-w-[620px] sm:min-w-0 max-w-full transition-opacity duration-500 ${
                  imgLoaded ? "opacity-100" : "opacity-0 h-0"
                }`}
                onLoad={() => setImgLoaded(true)}
                onError={(e) => {
                  e.currentTarget.src = `https://ghchart.rshah.org/39d353/${username}`;
                }}
              />
            </div>

            {/* Legend Footer */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#7d8590] mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#21262d] gap-2 sm:gap-3">
              <span className="font-mono text-[10px] sm:text-[11px] text-center sm:text-left">
                Synced with GitHub public commits.
              </span>

              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded-sm bg-[#161b22] border border-[#272d37]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#0e4429]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#006d32]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#26a641]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#39d353]" />
                <span>More</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
