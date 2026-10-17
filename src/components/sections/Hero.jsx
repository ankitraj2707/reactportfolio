import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "../../utils/constants";
import { useTheme } from "../../context/ThemeContext";

const TYPEWRITER_WORDS = [
  "Full Stack Developer",
  "Creative Developer",
  "Problem Solver",
];

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const headingBoxRef = useRef(null);
  const { currentTheme } = useTheme();

  const [mouseGlow, setMouseGlow] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || shouldReduceMotion || !headingBoxRef.current) return;
    const rect = headingBoxRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseGlow({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setMouseGlow((prev) => ({ ...prev, opacity: 0 }));
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(TYPEWRITER_WORDS[0]);
      return;
    }

    const currentTarget = TYPEWRITER_WORDS[wordIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayedText === currentTarget) {
      const delayTimeout = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(delayTimeout);
    }

    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
      return;
    }

    const charTimeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? currentTarget.substring(0, prev.length - 1)
          : currentTarget.substring(0, prev.length + 1),
      );
    }, speed);

    return () => clearTimeout(charTimeout);
  }, [displayedText, isDeleting, wordIndex, shouldReduceMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-12 sm:pt-20 overflow-hidden">
      {/* 1. Cyber Grid Horizon */}
      <div className="absolute inset-0 hero-cyber-grid pointer-events-none z-0" />

      {/* 2. Orbiting Dual-Ring Tech Halos */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden">
        <div
          className="w-[300px] h-[300px] sm:w-[460px] sm:h-[460px] md:w-[680px] md:h-[680px] rounded-full border border-dashed animate-halo-cw opacity-20"
          style={{ borderColor: currentTheme.primary }}
        />
        <div
          className="absolute w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] md:w-[520px] md:h-[520px] rounded-full border border-dotted animate-halo-ccw opacity-15"
          style={{ borderColor: currentTheme.secondary }}
        />
        <div
          className="absolute w-[260px] h-[200px] sm:w-[440px] sm:h-[300px] rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, ${currentTheme.primary} 0%, ${currentTheme.secondary} 60%, transparent 100%)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            borderColor: `${currentTheme.primary}40`,
            backgroundColor: `${currentTheme.primary}12`,
            boxShadow: `0 0 20px ${currentTheme.primary}20`,
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md mb-6 sm:mb-8"
        >
          <span
            className="w-2 h-2 rounded-full animate-ping shrink-0"
            style={{ backgroundColor: currentTheme.primary }}
          />
          <Terminal
            size={13}
            style={{ color: currentTheme.primary }}
            className="shrink-0"
          />
          <span className="text-[11px] sm:text-xs font-mono font-medium text-slate-300 tracking-wide">
            Available for Roles & Projects
          </span>
        </motion.div>

        {/* Heading Box with Corner Accents */}
        <div
          ref={headingBoxRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative px-4 py-2 sm:px-8 sm:py-5 rounded-2xl sm:rounded-3xl group mb-3 max-w-full"
        >
          <span
            className="cyber-bracket top-0 left-0 border-t-2 border-l-2"
            style={{ color: currentTheme.primary }}
          />
          <span
            className="cyber-bracket top-0 right-0 border-t-2 border-r-2"
            style={{ color: currentTheme.primary }}
          />
          <span
            className="cyber-bracket bottom-0 left-0 border-b-2 border-l-2"
            style={{ color: currentTheme.secondary }}
          />
          <span
            className="cyber-bracket bottom-0 right-0 border-b-2 border-r-2"
            style={{ color: currentTheme.secondary }}
          />

          {!isTouchDevice && !shouldReduceMotion && (
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-3xl transition-opacity duration-500 ease-out"
              style={{
                opacity: mouseGlow.opacity,
                background: `radial-gradient(350px circle at ${mouseGlow.x}% ${mouseGlow.y}%, ${currentTheme.primary}25, ${currentTheme.secondary}15, transparent 75%)`,
              }}
            />
          )}

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white select-none break-words"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block text-white hero-text-shadow"
            >
              Hi,
            </motion.span>{" "}
            <motion.span
              variants={itemVariants}
              className="inline-block text-white hero-text-shadow"
            >
              I'm
            </motion.span>{" "}
            <motion.span variants={itemVariants} className="inline-block">
              <span className="theme-text-gradient font-extrabold tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle Capsule */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            borderColor: `${currentTheme.primary}30`,
            background:
              "linear-gradient(135deg, rgba(12, 14, 24, 0.75) 0%, rgba(5, 5, 12, 0.82) 100%)",
            boxShadow: `0 12px 36px 0 rgba(0, 0, 0, 0.55), inset 0 0 0 1px ${currentTheme.primary}18`,
          }}
          className="w-full max-w-2xl mb-4 sm:mb-6 px-4 py-3 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl backdrop-blur-xl border relative overflow-hidden"
        >
          <div
            className="absolute top-0 left-1/4 right-1/4 h-[1px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${currentTheme.primary}90, transparent)`,
            }}
          />

          <p className="text-sm sm:text-lg lg:text-xl text-slate-200 font-light leading-relaxed hero-text-shadow">
            <span className="font-semibold text-white inline-block">
              <span>{displayedText}</span>
              <span
                className="typewriter-cursor"
                style={{
                  backgroundColor: currentTheme.primary,
                  boxShadow: `0 0 10px ${currentTheme.primary}`,
                }}
                aria-hidden="true"
              />
            </span>{" "}
            pursuing a{" "}
            <span
              style={{ color: currentTheme.primary }}
              className="font-normal"
            >
              {PERSONAL_INFO.degree}
            </span>{" "}
            at{" "}
            <span
              style={{ color: currentTheme.secondary }}
              className="font-normal"
            >
              {PERSONAL_INFO.institution}
            </span>
            .
          </p>
        </motion.div>

        {/* Secondary description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-xs sm:text-base text-slate-400 max-w-xl mb-8 sm:mb-10 font-normal px-2 hero-text-shadow"
        >
          Designing resilient modern web architectures, interactive 3D
          interfaces, and scalable full-stack applications.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
        >
          <a
            href="#projects"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              boxShadow: `0 0 25px ${currentTheme.glowColor}`,
            }}
            className="w-full sm:w-auto group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-slate-950 font-semibold text-sm active:scale-95 transition-all"
          >
            Explore Projects
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>

          <a
            href="/resume.pdf"
            download
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-surface-border bg-surface-base hover:bg-white/10 active:scale-95 text-white font-medium text-sm transition-all backdrop-blur-md"
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};
