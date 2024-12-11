"use client";

import { Canvas } from "@react-three/fiber";
import StarField from "./StarField";

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <div 
        className="w-full h-full"
        style={{
          background: "radial-gradient(circle at center, #0f172a 0%, #020617 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-slate-900/10" />
      </div>
    </div>
  );
}
