import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Terminal } from "lucide-react";
import { CanvasContainer } from "../3d/CanvasContainer";
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
    const speed = isDeleting ? 45 : 85;

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
      transition: { staggerChildren: 0.14, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <CanvasContainer />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            borderColor: `${currentTheme.primary}40`,
            backgroundColor: `${currentTheme.primary}15`,
          }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md mb-8 shadow-lg"
        >
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: currentTheme.primary }}
          />
          <Terminal size={14} style={{ color: currentTheme.primary }} />
          <span className="text-xs font-mono font-medium text-slate-300 tracking-wide">
            Available for Engineering Roles & Projects
          </span>
        </motion.div>

        {/* Heading Box */}
        <div
          ref={headingBoxRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative px-6 py-4 rounded-3xl"
        >
          {!isTouchDevice && !shouldReduceMotion && (
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-3xl transition-opacity duration-500 ease-out"
              style={{
                opacity: mouseGlow.opacity,
                background: `radial-gradient(400px circle at ${mouseGlow.x}% ${mouseGlow.y}%, ${currentTheme.primary}20, ${currentTheme.secondary}15, transparent 70%)`,
              }}
            />
          )}

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white mb-6 select-none"
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
              {/* Reliable theme-aware gradient typography */}
              <span className="theme-text-gradient font-extrabold tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle with Frosted Glass Shield */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="max-w-3xl mb-4 px-6 py-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 shadow-2xl"
        >
          <p className="text-base sm:text-xl lg:text-2xl text-slate-200 font-light leading-relaxed hero-text-shadow">
            <span className="font-semibold text-white inline-block min-w-[210px] text-left">
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

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
          className="text-sm sm:text-base text-slate-400 max-w-2xl mb-10 font-normal hero-text-shadow"
        >
          Designing resilient modern web architectures, interactive 3D
          interfaces, and scalable full-stack applications.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              boxShadow: `0 0 25px ${currentTheme.glowColor}`,
            }}
            className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-slate-950 font-semibold text-sm hover:brightness-110 hover:scale-105 transition-all"
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
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-surface-border bg-surface-base hover:bg-white/10 text-white font-medium text-sm transition-all backdrop-blur-md hover:scale-105"
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};
