import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { CanvasContainer } from "./components/3d/CanvasContainer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { GitHubActivity } from "./components/sections/GitHubActivity";
import { ContributionCalendar } from "./components/sections/ContributionCalendar";
import { Hackathons } from "./components/sections/Hackathons";
import { Contact } from "./components/sections/Contact";
import { Loader } from "./components/ui/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-[#050508] min-h-screen text-slate-100 relative selection:bg-electric-blue selection:text-black">
        <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

        <ScrollProgress />
        <Navbar />

        {/* Global Full-Webpage Interactive 3D Particle Wave */}
        <CanvasContainer />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <GitHubActivity />
          <ContributionCalendar />
          <Hackathons />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
