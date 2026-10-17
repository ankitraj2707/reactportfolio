import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "../../context/ThemeContext";

export const HeroMesh = ({ isMobile = false }) => {
  const meshRef = useRef();
  const innerRef = useRef();
  const { currentTheme } = useTheme();

  useFrame((state) => {
    const { x, y } = state.pointer;
    if (meshRef.current) {
      meshRef.current.rotation.x +=
        (y * 0.35 - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y +=
        (x * 0.35 - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.z += 0.003;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= 0.005;
      innerRef.current.rotation.y -= 0.005;
    }
  });

  const outerScale = isMobile ? 1.3 : 1.8;
  const innerScale = isMobile ? 0.8 : 1.1;

  return (
    <Float
      floatIntensity={isMobile ? 1.0 : 1.5}
      rotationIntensity={1}
      speed={2}
    >
      <group>
        <mesh ref={meshRef} scale={outerScale}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color={currentTheme.primary}
            distort={0.25}
            speed={1.8}
            roughness={0.15}
            metalness={0.8}
            wireframe
            emissive={currentTheme.secondary}
            emissiveIntensity={0.6}
          />
        </mesh>

        <mesh ref={innerRef} scale={innerScale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={currentTheme.secondary}
            emissive={currentTheme.primary}
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
};
