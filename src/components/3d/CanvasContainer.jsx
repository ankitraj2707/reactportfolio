import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroMesh } from "./HeroMesh";
import { ParticleField } from "./ParticleField";
import { useWebGLSupport } from "../../hooks/useWebGLSupport";
import { useTheme } from "../../context/ThemeContext";

export const CanvasContainer = () => {
  const isSupported = useWebGLSupport();
  const { currentTheme } = useTheme();

  if (!isSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-electric-blue/20 to-electric-violet/20 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        className="pointer-events-auto"
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.7} />
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
          <ParticleField />
          <HeroMesh />
        </Suspense>
      </Canvas>
    </div>
  );
};
