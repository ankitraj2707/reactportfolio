import React, { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

export const ParticleWave = ({ isMobile = false }) => {
  const pointsRef = useRef();
  const { currentTheme } = useTheme();

  // Wide grid covering full viewport width and depth
  const countX = isMobile ? 60 : 120;
  const countY = isMobile ? 60 : 100;
  const sepX = isMobile ? 0.45 : 0.32;
  const sepY = isMobile ? 0.45 : 0.32;
  const numParticles = countX * countY;

  // Track window scroll for subtle parallax
  const scrollYRef = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight || 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute baseline positions & theme-based gradient colors
  const [basePositions, positions, colors] = useMemo(() => {
    const base = new Float32Array(numParticles * 3);
    const pos = new Float32Array(numParticles * 3);
    const col = new Float32Array(numParticles * 3);

    const primaryCol = new THREE.Color(currentTheme.primary);
    const secondaryCol = new THREE.Color(currentTheme.secondary);

    let i = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iy = 0; iy < countY; iy++) {
        // Center the wave grid horizontally and vertically
        const x = (ix - countX / 2) * sepX;
        const y = (iy - countY / 2) * sepY - 1.5;
        const z = -2.5; // Placed behind hero 3D objects and foreground text

        base[i * 3] = x;
        base[i * 3 + 1] = y;
        base[i * 3 + 2] = z;

        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        // Smooth radial color gradient between primary & secondary accents
        const distFromCenter = Math.sqrt(
          Math.pow((ix - countX / 2) / (countX / 2), 2) +
            Math.pow((iy - countY / 2) / (countY / 2), 2),
        );
        const blended = primaryCol
          .clone()
          .lerp(secondaryCol, Math.min(1, distFromCenter * 0.9));

        col[i * 3] = blended.r;
        col[i * 3 + 1] = blended.g;
        col[i * 3 + 2] = blended.b;

        i++;
      }
    }
    return [base, pos, col];
  }, [countX, countY, sepX, sepY, numParticles, currentTheme]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const t = state.clock.getElapsedTime() * 1.2;
    const { x: pointerX, y: pointerY } = state.pointer;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArr = posAttr.array;

    // Approximate 3D pointer target across the full viewport
    const targetX = pointerX * (isMobile ? 7 : 14);
    const targetY = pointerY * (isMobile ? 5 : 8);
    const scrollFactor = scrollYRef.current * 4;

    let idx = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iy = 0; iy < countY; iy++) {
        const i3 = idx * 3;
        const baseX = basePositions[i3];
        const baseY = basePositions[i3 + 1];
        const baseZ = basePositions[i3 + 2];

        // Complex harmonic multi-frequency ocean wave calculation
        const wave =
          Math.sin(ix * 0.22 + t) * 0.45 +
          Math.cos(iy * 0.25 + t * 0.7) * 0.4 +
          Math.sin((ix + iy) * 0.15 + t * 0.5) * 0.3;

        // Interactive cursor ripple & elevation
        const dx = baseX - targetX;
        const dy = baseY - targetY;
        const distSq = dx * dx + dy * dy;
        const cursorInfluence =
          Math.max(0, 1 - distSq / (isMobile ? 12 : 22)) * 1.1;

        // Apply elevation with scroll parallax
        posArr[i3 + 1] =
          baseY +
          wave * 0.35 +
          cursorInfluence * 0.5 +
          Math.sin(scrollFactor + ix * 0.05) * 0.25;
        posArr[i3 + 2] = baseZ + wave * 0.7 + cursorInfluence * 1.4;

        idx++;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.038 : 0.032}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
