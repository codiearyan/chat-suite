"use client";

import { Canvas } from "@react-three/fiber";
import StarField from "./StarField";

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{
          background:
            "radial-gradient(circle at center, #0f172a 0%, #020617 100%)",
        }}
      >
        <StarField />
      </Canvas>
    </div>
  );
}
