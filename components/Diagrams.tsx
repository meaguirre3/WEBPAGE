
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ArrowRight, Cloud, Settings, Layers, PieChart, Activity, Cpu, Brain } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, Points, PointMaterial, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// --- GRAFO DE METODOLOGÍA INTERACTIVO ---
// Properly type the Node component as React.FC to allow React-specific props like 'key' in JSX and ensure compatibility with modern React types.
const Node: React.FC<{ position: [number, number, number]; label: string; active: boolean }> = ({ position, label, active }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <Sphere ref={meshRef} args={[0.2, 32, 32]}>
          <meshStandardMaterial 
            color={active ? "#10b981" : "#d1d5db"} 
            emissive={active ? "#10b981" : "#000"} 
            emissiveIntensity={active ? 2 : 0} 
          />
        </Sphere>
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.15}
          color="#1c1c1c"
          font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD7K2E7XDkoXdfm3jiWvX9zTIvVqS.woff"
          anchorX="center"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};

const Connections = ({ nodes }: { nodes: [number, number, number][] }) => {
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: '#10b981', transparent: true, opacity: 0.3 }), []);
  
  return (
    <group>
      {nodes.map((node, i) => {
        if (i === nodes.length - 1) return null;
        return (
          <Line
            key={i}
            points={[node, nodes[i + 1]]}
            color="#10b981"
            lineWidth={0.5}
            transparent
            opacity={0.2}
          />
        );
      })}
    </group>
  );
};

const DataPulses = ({ nodes }: { nodes: [number, number, number][] }) => {
  const pulseRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (pulseRef.current) {
      const t = state.clock.getElapsedTime();
      pulseRef.current.children.forEach((child, i) => {
        const startNode = nodes[i % (nodes.length - 1)];
        const endNode = nodes[(i + 1) % nodes.length];
        const progress = (t * 0.5 + i * 0.2) % 1;
        
        child.position.x = startNode[0] + (endNode[0] - startNode[0]) * progress;
        child.position.y = startNode[1] + (endNode[1] - startNode[1]) * progress;
        child.position.z = startNode[2] + (endNode[2] - startNode[2]) * progress;
      });
    }
  });

  return (
    <group ref={pulseRef}>
      {nodes.slice(0, -1).map((_, i) => (
        <Sphere key={i} args={[0.04, 16, 16]}>
          <meshBasicMaterial color="#10b981" />
        </Sphere>
      ))}
    </group>
  );
};

export const MethodologyGraph: React.FC = () => {
  const nodePositions: [number, number, number][] = [
    [-3, 1, 0],
    [-1, -0.5, 1],
    [1, 0.5, -1],
    [3, -1, 0],
  ];

  const labels = ["Diagnóstico", "Arquitectura", "Implementación", "Optimización"];

  return (
    <div className="w-full h-[500px] bg-emerald-50/30 rounded-3xl border border-emerald-100 overflow-hidden relative group">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 bg-white/80 px-3 py-1 rounded-full border border-emerald-200 shadow-sm">
          Visualizador de Flujo de Trabajo
        </span>
      </div>
      
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <group rotation={[0, -Math.PI / 8, 0]}>
          <Connections nodes={nodePositions} />
          <DataPulses nodes={nodePositions} />
          {nodePositions.map((pos, i) => (
            <Node key={i} position={pos} label={labels[i]} active={true} />
          ))}
        </group>
      </Canvas>

      <div className="absolute bottom-6 right-6 z-10 text-right pointer-events-none">
        <p className="text-xs text-stone-400 italic">Interacción de Red de Datos Activa</p>
      </div>
    </div>
  );
};

// --- ETL PIPELINE DIAGRAM ---
export const ETLPipelineDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { name: 'Extracción', icon: Database, label: 'ERP / APIs / Logs' },
    { name: 'Transformación', icon: Settings, label: 'Limpieza y Formateo' },
    { name: 'Carga', icon: Cloud, label: 'Data Warehouse' },
    { name: 'Análisis', icon: Activity, label: 'BI & Modelos de IA' },
  ];

  return (
    <div className="p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
      <h3 className="text-emerald-400 font-bold text-xs uppercase tracking-[0.3em] mb-10 text-center">Ciclo de Vida de los Datos</h3>
      
      <div className="flex flex-col gap-12 relative">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-8 relative">
            <div 
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                activeStep === idx 
                ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] scale-110' 
                : 'bg-stone-800 text-stone-500 opacity-40'
              }`}
            >
              <step.icon size={28} />
            </div>
            <div className="flex-1">
              <h4 className={`font-bold transition-colors duration-500 ${activeStep === idx ? 'text-white' : 'text-stone-600'}`}>{step.name}</h4>
              <p className={`text-sm transition-colors duration-500 ${activeStep === idx ? 'text-emerald-400/80' : 'text-stone-700'}`}>{step.label}</p>
            </div>
            
            {idx < steps.length - 1 && (
              <div className="absolute left-8 top-16 w-px h-12 bg-stone-800 overflow-hidden">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={activeStep === idx ? { height: '100%' } : { height: 0 }}
                  className="w-full bg-emerald-500"
                  transition={{ duration: 1 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- BI DASHBOARD DIAGRAM ---
export const BIDashboardDiagram: React.FC = () => {
  const [val, setVal] = useState(65);

  useEffect(() => {
    const interval = setInterval(() => {
      setVal(prev => {
        const next = prev + (Math.random() * 10 - 5);
        return Math.max(30, Math.min(95, next));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-[#F5F5F5] rounded-3xl border border-stone-200 shadow-xl overflow-hidden group">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-bold text-stone-900">Pulso Operativo</h3>
          <p className="text-xs text-stone-500">Entorno de Síntesis en Vivo</p>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-white rounded-2xl shadow-sm">
          <span className="text-[10px] font-bold text-stone-400 uppercase">Retención</span>
          <div className="text-2xl font-serif text-stone-900 mt-1">{val.toFixed(1)}%</div>
          <div className="w-full h-1 bg-stone-100 rounded-full mt-2 overflow-hidden">
            <motion.div animate={{ width: `${val}%` }} className="h-full bg-emerald-500" />
          </div>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-sm">
          <span className="text-[10px] font-bold text-stone-400 uppercase">Crecimiento</span>
          <div className="text-2xl font-serif text-stone-900 mt-1">12.4x</div>
          <div className="flex gap-1 mt-2">
            {[2, 5, 3, 8, 4, 10, 6].map((h, i) => (
              <motion.div 
                key={i} 
                animate={{ height: h * 2 }} 
                className="w-full bg-emerald-200 rounded-t-sm" 
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-32 bg-stone-900 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.5)_0%,transparent_70%)]" />
        <div className="flex items-center gap-4 z-10">
          <Activity className="text-emerald-500 animate-pulse" size={32} />
          <div className="text-white font-mono text-sm tracking-tighter">MOTOR PREDICTIVO ACTIVO</div>
        </div>
      </div>
    </div>
  );
};

// --- AI MACHINE LEARNING DIAGRAM ---
export const AIMachineLearningDiagram: React.FC = () => {
    return (
        <div className="p-8 bg-white border border-stone-200 rounded-2xl flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                <Brain size={32} />
            </div>
            <h3 className="font-serif text-xl mb-2">Optimización Neuronal</h3>
            <p className="text-sm text-stone-500 text-center">Entrenamiento de LLM y pipeline de despliegue personalizado.</p>
        </div>
    )
}
