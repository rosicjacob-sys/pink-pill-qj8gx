import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DNAHelix({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null!);
  const nodeCount = 120;
  const helixHeight = 10;
  const helixRadius = 1.2;
  const turns = 3.5;

  const { nodeItems: nodes, rungItems: rungs } = useMemo(() => {
    // Node spheres along both strands
    const nodeItems: { pos: THREE.Vector3; color: string }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const t = i / (nodeCount - 1);
      const y = t * helixHeight - helixHeight / 2;
      const angle = t * turns * Math.PI * 2;

      // Strand 1
      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;
      nodeItems.push({
        pos: new THREE.Vector3(x1, y, z1),
        color: i % 3 === 0 ? '#C8783E' : '#1E5BFA',
      });

      // Strand 2 (offset by PI)
      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;
      nodeItems.push({
        pos: new THREE.Vector3(x2, y, z2),
        color: i % 3 === 0 ? '#E8A970' : '#3B82F6',
      });
    }

    // Rungs (connecting strands)
    const rungItems: THREE.Vector3[][] = [];
    for (let i = 0; i < nodeCount; i++) {
      const t = i / (nodeCount - 1);
      const y = t * helixHeight - helixHeight / 2;
      const angle = t * turns * Math.PI * 2;
      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;
      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;
      rungItems.push([new THREE.Vector3(x1, y, z1), new THREE.Vector3(x2, y, z2)]);
    }

    return { nodeItems, rungItems };
  }, []);

  const instancedMesh = useMemo(() => {
    const count = nodes.length;
    const mesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.06, 12, 12),
      new THREE.MeshStandardMaterial({ roughness: 0.2, metalness: 0.3 }),
      count
    );
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    nodes.forEach((n: { pos: THREE.Vector3; color: string }, i: number) => {
      dummy.position.copy(n.pos);
      dummy.scale.setScalar(n.color.includes('C878') || n.color.includes('E8A9') ? 1.3 : 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      color.set(n.color);
      mesh.setColorAt(i, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    return mesh;
  }, [nodes]);

  useFrame((st, delta) => {
    if (!groupRef.current) return;
    const s = scrollRef.current;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = s * 0.3;
    groupRef.current.position.y = Math.sin(st.clock.elapsedTime * 0.15) * 0.2;
    if (matRef.current) {
      matRef.current.emissive.set('#1E5BFA');
      matRef.current.emissiveIntensity = 0.08 + s * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={instancedMesh} />
      {/* Rungs as thin cylinders */}
      {rungs.map(([a, b]: THREE.Vector3[], i: number) => (
        <mesh key={i} position={[(a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2]}>
          <cylinderGeometry args={[0.012, 0.012, a.distanceTo(b), 6]} />
          <meshStandardMaterial color="#3B82F6" opacity={0.5} transparent roughness={0.3} metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingPeptides({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const count = 200;
  const pointsRef = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 8;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  useFrame((st) => {
    if (!pointsRef.current) return;
    const s = scrollRef.current;
    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const t = st.clock.elapsedTime * 0.2 + i * 0.03;
      arr[idx] += Math.sin(t) * 0.004;
      arr[idx + 1] += Math.cos(t * 0.7) * 0.004;
      arr[idx + 2] += Math.cos(t * 0.5) * 0.004;
      const c = s * 0.5;
      arr[idx] *= (1 - c * 0.2);
      arr[idx + 1] *= (1 - c * 0.2);
      arr[idx + 2] *= (1 - c * 0.2);
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.00015;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = 0.25 + s * 0.35;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#60A5FA" size={0.03} blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.25} transparent />
    </points>
  );
}

function CopperParticles({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const count = 100;
  const pointsRef = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 5;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  useFrame((st) => {
    if (!pointsRef.current) return;
    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      arr[idx] += Math.cos(st.clock.elapsedTime * 0.4 + i) * 0.003;
      arr[idx + 1] += Math.sin(st.clock.elapsedTime * 0.3 + i) * 0.003;
      arr[idx + 2] += Math.cos(st.clock.elapsedTime * 0.35 + i) * 0.003;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y -= 0.0002;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = 0.3 + scrollRef.current * 0.3;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#E8A970" size={0.05} blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.3} transparent />
    </points>
  );
}

export default function HelixScene() {
  const scrollRef = useRef(0);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7.5], fov: 42, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); gl.domElement.style.display = 'none'; });
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <spotLight position={[6, 4, 5]} angle={0.6} penumbra={0.4} intensity={12} color="#ffffff" />
        <spotLight position={[-5, -2, 3]} angle={0.5} penumbra={0.6} intensity={6} color="#60A5FA" />
        <pointLight position={[0, 0, 7]} intensity={8} color="#1E5BFA" />
        <pointLight position={[3, -4, -2]} intensity={3} color="#C8783E" />
        <pointLight position={[-3, 5, -4]} intensity={2} color="#3B82F6" />
        <DNAHelix scrollRef={scrollRef} />
        <FloatingPeptides scrollRef={scrollRef} />
        <CopperParticles scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
