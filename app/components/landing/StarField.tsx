"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

const noise3D = createNoise3D();

// Helper function to create nebula geometry using noise
const createNebulaGeometry = (size: number, complexity: number) => {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];

  // Generate points using 3D noise
  for (let i = 0; i < complexity; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 2;
    const r = (0.5 + Math.random() * 0.5) * size;

    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(theta);

    // Use noise to displace points
    const noise = noise3D(x * 0.1, y * 0.1, z * 0.1);
    const displacement = 0.5 * noise;

    positions.push(x + displacement, y + displacement, z + displacement);

    // Create color variations
    const hue = Math.random() * 0.1 + 0.6; // Blue to purple range
    const saturation = 0.4 + Math.random() * 0.3;
    const lightness = 0.3 + Math.random() * 0.3;
    const color = new THREE.Color().setHSL(hue, saturation, lightness);

    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  return geometry;
};

export default function StarField() {
  const points = useRef<THREE.Points>(null!);
  const nebulae = useRef<THREE.Group>(null!);

  // Generate random stars
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 5000;
  const positions = new Float32Array(starCount * 3);
  const velocities = new Float32Array(starCount);

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
    velocities[i] = Math.random() * 0.02;
  }

  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  // Create enhanced nebulae
  const createNebulae = () => {
    const group = new THREE.Group();
    const nebulaCount = 3;

    const createNebulaLayer = (
      size: number,
      complexity: number,
      opacity: number
    ) => {
      const geometry = createNebulaGeometry(size, complexity);
      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      return new THREE.Points(geometry, material);
    };

    for (let i = 0; i < nebulaCount; i++) {
      const nebulaGroup = new THREE.Group();

      // Create multiple layers with different properties
      const layers = [
        { size: 2 + Math.random(), complexity: 1000, opacity: 0.2 },
        { size: 1.5 + Math.random(), complexity: 800, opacity: 0.15 },
        { size: 1 + Math.random(), complexity: 600, opacity: 0.1 },
      ];

      layers.forEach((layer) => {
        const nebulaLayer = createNebulaLayer(
          layer.size,
          layer.complexity,
          layer.opacity
        );
        nebulaGroup.add(nebulaLayer);
      });

      // Position the nebula group
      nebulaGroup.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );

      // Random rotation
      nebulaGroup.rotation.x = Math.random() * Math.PI;
      nebulaGroup.rotation.y = Math.random() * Math.PI;
      nebulaGroup.rotation.z = Math.random() * Math.PI;

      group.add(nebulaGroup);
    }

    return group;
  };

  // Animation loop
  useFrame(({ clock }) => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3 + 2] += velocities[i];

      if (positions[i3 + 2] > 5) {
        positions[i3 + 2] = -5;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;

    // Animate nebulae
    if (nebulae.current) {
      // Slow rotation of entire nebula system
      nebulae.current.rotation.y = clock.getElapsedTime() * 0.03;

      // Animate individual nebulae
      nebulae.current.children.forEach((nebulaGroup, i) => {
        // Subtle pulsing effect
        const pulse = Math.sin(clock.getElapsedTime() * 0.5 + i) * 0.05 + 1;
        nebulaGroup.scale.set(pulse, pulse, pulse);

        // Individual rotation
        nebulaGroup.rotation.x += 0.0003;
        nebulaGroup.rotation.y += 0.0002;
        nebulaGroup.rotation.z += 0.0001;
      });
    }
  });

  return (
    <>
      <points ref={points} geometry={starGeometry}>
        <pointsMaterial
          size={0.02}
          color="#ffffff"
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
          depthWrite={false}
        />
      </points>
      <primitive ref={nebulae} object={createNebulae()} />
    </>
  );
}
