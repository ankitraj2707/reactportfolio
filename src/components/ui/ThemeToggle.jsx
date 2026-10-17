import React, { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { useTheme, THEMES } from "../../context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1.5"
        aria-label="Change Theme"
        title="Change Visual Theme"
      >
        <Palette size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 py-2 rounded-xl bg-[#0d1117] border border-surface-border backdrop-blur-xl shadow-2xl z-50">
          <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-surface-border/50 mb-1">
            Select Theme
          </div>
          {Object.values(THEMES).map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className={`w-full px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                theme === t.id
                  ? "bg-white/10 text-white font-medium"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                  }}
                />
                <span>{t.name}</span>
              </div>
              {theme === t.id && (
                <Check size={14} style={{ color: t.primary }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
