import React from "react";
import { motion } from "framer-motion";
import {
  GitBranch,
  Star,
  GitCommit,
  ExternalLink,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { SectionHeading } from "../ui/SectionHeading";
import { useGitHubData } from "../../hooks/useGitHubData";

export const GitHubActivity = () => {
  const { repos, commits, loading, error } = useGitHubData("ankitraj2707");

  return (
    <section id="github" className="py-24 relative bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Real-time Feed"
          title="Open Source & GitHub Stream"
          subtitle="Live data directly fetched from GitHub API representing authentic public work."
        />

        {loading && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
            <RefreshCw className="animate-spin text-electric-blue" size={28} />
            <span className="text-sm font-mono">
              Syncing GitHub repositories...
            </span>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 max-w-lg mx-auto">
            <AlertCircle size={20} />
            <span className="text-sm">
              Unable to load live GitHub statistics at this moment.
            </span>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {repos.slice(0, 4).map((repo) => (
                <GlassCard
                  className="flex flex-col justify-between p-5"
                  hoverGlow
                  key={repo.id}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <GitBranch className="text-electric-blue" size={16} />
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Star className="text-amber-400" size={12} />
                        {repo.stargazers_count}
                      </span>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-semibold text-white hover:text-electric-blue transition-colors line-clamp-1 mb-2 block"
                    >
                      {repo.name}
                    </a>
                    <p className="text-slate-400 text-xs line-clamp-2 mb-4">
                      {repo.description ||
                        "Public repository and code exploration."}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-surface-border text-xs text-slate-500">
                    <span>{repo.language || "Code"}</span>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-electric-blue hover:underline flex items-center gap-1"
                    >
                      View <ExternalLink size={11} />
                    </a>
                  </div>
                </GlassCard>
              ))}
            </div>

            <div className="lg:col-span-1">
              <GlassCard className="h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-surface-border">
                  <GitCommit className="text-electric-violet" size={18} />
                  <h3 className="font-display font-semibold text-white text-base">
                    Recent Commits
                  </h3>
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[360px] pr-2">
                  {commits.length === 0 ? (
                    <p className="text-xs text-slate-500">
                      No recent public commit events found.
                    </p>
                  ) : (
                    commits.map((c, i) => (
                      <div
                        key={i}
                        className="text-xs pb-3 border-b border-surface-border/50 last:border-0"
                      >
                        <div className="flex items-center justify-between text-slate-400 mb-1">
                          <span className="font-mono text-electric-blue">
                            {c.sha}
                          </span>
                          <span className="text-[10px]">
                            {new Date(c.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-slate-200 line-clamp-2 font-sans mb-1">
                          {c.message}
                        </p>
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-slate-500 hover:text-electric-violet transition-colors flex items-center gap-1"
                        >
                          {c.repoName.split("/")[1] || c.repoName}{" "}
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    ))
                  )}
                </div>
              </GlassCard>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
