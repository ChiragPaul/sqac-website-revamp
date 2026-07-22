import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Line, Sphere, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// The Core Mesh (Inner Wireframe & Solid Layers)
// --------------------------------------------------------
function CoreGeometry({ stage }) {
  const innerRef = useRef();
  const midRef = useRef();
  const shellRef = useRef();

  useFrame((state, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.1;
      innerRef.current.rotation.y += delta * 0.15;
    }
    if (midRef.current) {
      midRef.current.rotation.x -= delta * 0.05;
      midRef.current.rotation.y += delta * 0.1;
    }
    if (shellRef.current) {
      shellRef.current.rotation.x += delta * 0.02;
      shellRef.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <group>
      {/* Stage 0/1: Base Wireframe */}
      <Icosahedron ref={innerRef} args={[1, 0]} visible={true}>
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} />
      </Icosahedron>

      {/* Stage 1/2: Inner Solid Layer */}
      <Icosahedron ref={midRef} args={[0.8, 1]} visible={stage >= 1}>
        <meshStandardMaterial 
          color="#111111" 
          emissive="#222222"
          wireframe={false} 
          transparent 
          opacity={0.8}
        />
        {/* Glow edge layer */}
        <Icosahedron args={[0.81, 1]}>
          <meshBasicMaterial color="#7A1E2C" wireframe transparent opacity={stage >= 1 ? 0.4 : 0} />
        </Icosahedron>
      </Icosahedron>

      {/* Stage 4/5: Outer Distorted Shell */}
      <Icosahedron ref={shellRef} args={[1.6, 3]} visible={stage >= 4}>
        <MeshDistortMaterial 
          color="#0a0a0a"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          distort={0.2}
          speed={2}
          transparent
          opacity={stage >= 5 ? 0.3 : 0.15}
        />
      </Icosahedron>
    </group>
  );
}

// --------------------------------------------------------
// Orbiting Nodes and Lines (Stages 2/3 & 3/4)
// --------------------------------------------------------
function OrbitingSystem({ stage }) {
  const groupRef = useRef();
  const numNodes = 8;
  const radius = 2.5;

  // Generate fixed random positions for nodes
  const nodes = useMemo(() => {
    const pts = [];
    for (let i = 0; i < numNodes; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.z += delta * 0.05;
    }
  });

  if (stage < 2) return null;

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <Sphere key={`node-${i}`} position={pos} args={[0.08, 16, 16]}>
          <meshBasicMaterial color="#ffffff" />
        </Sphere>
      ))}

      {/* Lines connecting to center (Stage 3/4) */}
      {stage >= 3 && nodes.map((pos, i) => (
        <Line 
          key={`line-${i}`}
          points={[[0, 0, 0], [pos.x, pos.y, pos.z]]} 
          color="#ffffff"
          lineWidth={1}
          transparent
          opacity={0.15}
        />
      ))}
      
      {/* Lines connecting nodes to each other (Stage 3/4) */}
      {stage >= 3 && nodes.map((pos, i) => {
        const nextPos = nodes[(i + 1) % numNodes];
        return (
          <Line 
            key={`link-${i}`}
            points={[[pos.x, pos.y, pos.z], [nextPos.x, nextPos.y, nextPos.z]]} 
            color="#ffffff"
            lineWidth={0.5}
            transparent
            opacity={0.1}
          />
        );
      })}
    </group>
  );
}

// --------------------------------------------------------
// Mouse Interaction Rig
// --------------------------------------------------------
function CameraRig({ children }) {
  const group = useRef();
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (group.current) {
      // Smoothly rotate the entire assembly based on mouse position
      const targetX = (mouse.y * Math.PI) / 8;
      const targetY = (mouse.x * Math.PI) / 8;
      
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);
    }
  });

  return <group ref={group}>{children}</group>;
}

// --------------------------------------------------------
// Main Canvas Component
// --------------------------------------------------------
export default function SQACCore({ stage = 0 }) {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]} // limit pixel ratio for performance
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7A1E2C" />
        
        {stage >= 5 && (
          <spotLight position={[0, 5, 0]} intensity={2} color="#ffffff" penumbra={1} />
        )}

        <CameraRig>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <CoreGeometry stage={stage} />
            <OrbitingSystem stage={stage} />
          </Float>
        </CameraRig>
      </Canvas>
    </div>
  );
}
