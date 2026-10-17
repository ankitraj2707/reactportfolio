import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

export const ParticleWave = () => {
  const pointsRef = useRef();
  const { currentTheme } = useTheme();

  // Wave grid configuration
  const { countX, countY, sep } = { countX: 75, countY: 75, sep: 0.28 };
  const numParticles = countX * countY;

  // Generate baseline grid positions
  const [basePositions, positions, colors] = useMemo(() => {
    const base = new Float32Array(numParticles * 3);
    const pos = new Float32Array(numParticles * 3);
    const col = new Float32Array(numParticles * 3);

    const primaryCol = new THREE.Color(currentTheme.primary);
    const secondaryCol = new THREE.Color(currentTheme.secondary);

    let i = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iy = 0; iy < countY; iy++) {
        const x = (ix - countX / 2) * sep;
        const y = (iy - countY / 2) * sep * 0.45;
        const z = -1.2; // Anchored safely behind the heading and central geometry

        base[i * 3] = x;
        base[i * 3 + 1] = y;
        base[i * 3 + 2] = z;

        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        // Gradient blend from center outward
        const ratio =
          Math.sin((ix / countX) * Math.PI) * Math.sin((iy / countY) * Math.PI);
        const blended = primaryCol.clone().lerp(secondaryCol, 1 - ratio);

        col[i * 3] = blended.r;
        col[i * 3 + 1] = blended.g;
        col[i * 3 + 2] = blended.b;

        i++;
      }
    }
    return [base, pos, col];
  }, [countX, countY, sep, currentTheme]);

  // Animate harmonic wave motion and pointer interaction
  useFrame((state) => {
    if (!pointsRef.current) return;

    const t = state.clock.getElapsedTime() * 1.5;
    const { x: pointerX, y: pointerY } = state.pointer;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArr = posAttr.array;

    // Convert pointer to approximate 3D world plane coordinates
    const targetX = pointerX * 7.5;
    const targetY = pointerY * 4.5;

    let idx = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iy = 0; iy < countY; iy++) {
        const i3 = idx * 3;
        const baseX = basePositions[i3];
        const baseY = basePositions[i3 + 1];
        const baseZ = basePositions[i3 + 2];

        // Harmonic undulating wave formula
        const wave =
          Math.sin(ix * 0.3 + t) * 0.35 +
          Math.cos(iy * 0.35 + t * 0.8) * 0.3 +
          Math.sin((ix + iy) * 0.2 + t * 0.6) * 0.2;

        // Cursor distance repulsion/elevation effect
        const dx = baseX - targetX;
        const dy = baseY - targetY;
        const distSq = dx * dx + dy * dy;
        const cursorInfluence = Math.max(0, 1 - distSq / 12) * 0.9;

        posArr[i3 + 1] = baseY + wave * 0.4 + cursorInfluence * 0.5;
        posArr[i3 + 2] = baseZ + wave * 0.6 + cursorInfluence * 1.1;

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
        size={0.038}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
