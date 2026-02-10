
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Points, PointMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ParticleCloud = () => {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  const ref = useRef<any>();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#10b981"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
};

export const HeroDataCloud: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleCloud />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <Sphere args={[1, 64, 64]}>
             <meshStandardMaterial color="#f0fdf4" metalness={0.1} roughness={1} wireframe opacity={0.1} transparent />
           </Sphere>
        </Float>
      </Canvas>
    </div>
  );
};

const FlowLines = () => {
  const lines = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5,
      speed: 0.01 + Math.random() * 0.02,
    }));
  }, []);

  return (
    <group>
      {lines.map((line, i) => (
        <Line key={i} {...line} />
      ))}
    </group>
  );
};

const Line = ({ x, y, speed }: { x: number, y: number, speed: number }) => {
  const ref = useRef<any>();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.z = ((t * speed * 20) % 10) - 5;
  });

  return (
    <mesh ref={ref} position={[x, y, 0]}>
      <boxGeometry args={[0.02, 0.02, 1]} />
      <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} transparent opacity={0.5} />
    </mesh>
  );
};

export const NeuralFlowScene: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <FlowLines />
      </Canvas>
    </div>
  );
};
