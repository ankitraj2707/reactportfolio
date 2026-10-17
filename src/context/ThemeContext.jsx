import React, { createContext, useContext, useState, useEffect } from "react";

export const THEMES = {
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk",
    primary: "#00d2ff",
    secondary: "#9d4edd",
    gradient: "from-[#00d2ff] via-[#60a5fa] to-[#a855f7]",
    accentClass: "text-electric-blue",
    badgeBorder: "border-electric-blue/30",
    badgeBg: "bg-electric-blue/10",
    glowColor: "rgba(0, 210, 255, 0.45)",
  },
  emerald: {
    id: "emerald",
    name: "Emerald Matrix",
    primary: "#00ff88",
    secondary: "#10b981",
    gradient: "from-[#00ff88] via-[#34d399] to-[#059669]",
    accentClass: "text-[#00ff88]",
    badgeBorder: "border-[#00ff88]/30",
    badgeBg: "bg-[#00ff88]/10",
    glowColor: "rgba(0, 255, 136, 0.45)",
  },
  crimson: {
    id: "crimson",
    name: "Crimson Nova",
    primary: "#ff0055",
    secondary: "#ff6b35",
    gradient: "from-[#ff0055] via-[#ff477e] to-[#ff6b35]",
    accentClass: "text-[#ff0055]",
    badgeBorder: "border-[#ff0055]/30",
    badgeBg: "bg-[#ff0055]/10",
    glowColor: "rgba(255, 0, 85, 0.45)",
  },
  gold: {
    id: "gold",
    name: "Hyper Gold",
    primary: "#fbbf24",
    secondary: "#f59e0b",
    gradient: "from-[#fbbf24] via-[#fde047] to-[#ea580c]",
    accentClass: "text-[#fbbf24]",
    badgeBorder: "border-[#fbbf24]/30",
    badgeBg: "bg-[#fbbf24]/10",
    glowColor: "rgba(251, 191, 36, 0.45)",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio_theme") || "cyberpunk";
  });

  const currentTheme = THEMES[theme] || THEMES.cyberpunk;

  useEffect(() => {
    localStorage.setItem("portfolio_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
