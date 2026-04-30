"use client";

import { Float, OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function MountainScene() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 6]} intensity={2} />
      <Stars radius={60} depth={40} count={900} factor={4} saturation={0} fade speed={0.6} />
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={1.1}>
        <mesh rotation={[0.15, -0.45, 0]} position={[0, -0.3, 0]}>
          <coneGeometry args={[2.5, 3.4, 5]} />
          <meshStandardMaterial color="#0f766e" roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh rotation={[0.15, 0.6, 0]} position={[-1.9, -0.85, -0.65]}>
          <coneGeometry args={[1.5, 2.45, 5]} />
          <meshStandardMaterial color="#164e63" roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh rotation={[0.15, -0.9, 0]} position={[2, -0.95, -0.55]}>
          <coneGeometry args={[1.3, 2.15, 5]} />
          <meshStandardMaterial color="#0891b2" roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh position={[0, 1.8, 0.08]} rotation={[0.15, -0.45, 0]}>
          <coneGeometry args={[0.58, 0.8, 5]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[2.6, 1.45, -0.2]}>
          <torusGeometry args={[0.5, 0.025, 16, 72]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 opacity-80">
      <Canvas camera={{ position: [0, 1.2, 6], fov: 45 }}>
        <MountainScene />
      </Canvas>
    </div>
  );
}
