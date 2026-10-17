import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroMesh } from "./HeroMesh";
import { ParticleField } from "./ParticleField";
import { ParticleWave } from "./ParticleWave";
import { useWebGLSupport } from "../../hooks/useWebGLSupport";
import { useTheme } from "../../context/ThemeContext";

export const CanvasContainer = () => {
  const isSupported = useWebGLSupport();
  const { currentTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isSupported) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-electric-blue/20 to-electric-violet/20 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        className="pointer-events-auto"
        camera={{
          position: isMobile ? [0, 0, 9.8] : [0, 0, 8.8],
          fov: isMobile ? 54 : 45,
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          color={currentTheme.primary}
        />
        <pointLight
          position={[-10, -10, -5]}
          intensity={1.2}
          color={currentTheme.secondary}
        />

        <Suspense fallback={null}>
          <ParticleField count={isMobile ? 100 : 220} />
          <ParticleWave isMobile={isMobile} />
          <HeroMesh isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};
