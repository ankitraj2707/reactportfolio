import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Terminal } from "lucide-react";
import { CanvasContainer } from "../3d/CanvasContainer";
import { PERSONAL_INFO } from "../../utils/constants";

const TYPEWRITER_WORDS = [
  "Full Stack Developer",
  "Creative Developer",
  "Problem Solver",
];

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const headingBoxRef = useRef(null);

  // Mouse radial glow coordinates
  const [mouseGlow, setMouseGlow] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Typewriter state
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Detect touch screens to prevent mouse-following overlay artifacts
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Track cursor position inside the heading boundary
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

  // Measured typewriter lifecycle
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

  // Framer Motion staggered reveal variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
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
      {/* 3D Canvas Layer */}
      <CanvasContainer />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-electric-blue/30 bg-surface-base/80 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(0,210,255,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-electric-blue animate-ping" />
          <Terminal className="text-electric-blue" size={14} />
          <span className="text-xs font-mono font-medium text-slate-300 tracking-wide">
            Available for Engineering Roles & Projects
          </span>
        </motion.div>

        {/* Heading Box with Radial Glow and Staggered Tokens */}
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
                background: `radial-gradient(400px circle at ${mouseGlow.x}% ${mouseGlow.y}%, rgba(0, 210, 255, 0.12), rgba(157, 78, 221, 0.08), transparent 70%)`,
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
              <span className="chromatic-hover cursor-default">
                <span className="gradient-name-text animate-gradient-pan inline-block font-extrabold">
                  {PERSONAL_INFO.name}
                </span>
              </span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle with frosted shield for readability against the 3D canvas */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="max-w-3xl mb-4 px-6 py-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 shadow-2xl"
        >
          <p className="text-base sm:text-xl lg:text-2xl text-slate-200 font-light leading-relaxed hero-text-shadow">
            <span className="font-semibold text-white inline-block min-w-[210px] text-left">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
                {displayedText}
              </span>
              <span className="typewriter-cursor" aria-hidden="true" />
            </span>{" "}
            pursuing a{" "}
            <span className="text-electric-blue font-normal">
              {PERSONAL_INFO.degree}
            </span>{" "}
            at{" "}
            <span className="text-electric-violet font-normal">
              {PERSONAL_INFO.institution}
            </span>
            .
          </p>
        </motion.div>

        {/* Secondary description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
          className="text-sm sm:text-base text-slate-400 max-w-2xl mb-10 font-normal hero-text-shadow"
        >
          Designing resilient modern web architectures, interactive 3D
          interfaces, and scalable full-stack applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-blue to-electric-indigo text-slate-950 font-semibold text-sm hover:brightness-110 hover:scale-105 transition-all shadow-[0_0_25px_rgba(0,210,255,0.35)]"
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
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-surface-border bg-surface-base hover:bg-white/10 hover:border-electric-blue/40 text-white font-medium text-sm transition-all backdrop-blur-md hover:scale-105"
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};
