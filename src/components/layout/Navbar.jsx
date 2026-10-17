import React, { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Globe } from "lucide-react";
import { PERSONAL_INFO } from "../../utils/constants";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "GitHub", href: "#github" },
    { name: "Hackathons", href: "#hackathons" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#050508]/80 backdrop-blur-md border-b border-surface-border py-3.5 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="w-9 h-9 rounded-lg p-[1px] transition-all"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
            }}
          >
            <div className="w-full h-full bg-[#050508] rounded-lg flex items-center justify-center transition-all group-hover:bg-transparent">
              <span className="font-display font-bold text-white text-base">
                AR
              </span>
            </div>
          </div>
          <span className="font-display font-bold text-lg text-white tracking-tight">
            Ankit<span style={{ color: currentTheme.primary }}>.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action icons + Theme Switcher */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <a
            href={PERSONAL_INFO.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            title="View Live Portfolio"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Globe size={18} />
          </a>
          <a
            href={PERSONAL_INFO.links.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href={PERSONAL_INFO.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="#contact"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              boxShadow: `0 0 15px ${currentTheme.glowColor}`,
            }}
            className="text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-lg text-slate-950 hover:brightness-110 transition-all"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile menu toggle & theme toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-300 p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a12] border-b border-surface-border px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 py-2"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-surface-border flex flex-wrap gap-4">
            <a
              href={PERSONAL_INFO.links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <Globe size={16} /> Live Portfolio
            </a>
            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
