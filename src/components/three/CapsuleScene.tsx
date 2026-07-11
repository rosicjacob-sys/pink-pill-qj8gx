import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Capsule({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null!);

  const geom = useMemo(() => {
    const cyl = new THREE.CylinderGeometry(0.9, 0.9, 3.6, 80, 1);
    const top = new THREE.SphereGeometry(0.9, 80, 40, 0, Math.PI * 2, 0, Math.PI / 2);
    const bot = new THREE.SphereGeometry(0.9, 80, 40, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);

    const merged = new THREE.BufferGeometry();
    const positions: number[] = [];
    const normals: number[] = [];

    const addGeo = (g: THREE.BufferGeometry, tx: number, ty: number, tz: number) => {
      const pos = g.getAttribute('position');
      const norm = g.getAttribute('normal');
      for (let j = 0; j < pos.count; j++) {
        positions.push(pos.getX(j) + tx, pos.getY(j) + ty, pos.getZ(j) + tz);
        normals.push(norm ? norm.getX(j) : 0, norm ? norm.getY(j) : 1, norm ? norm.getZ(j) : 0);
      }
    };

    addGeo(cyl, 0, 0, 0);
    addGeo(top, 0, 1.8, 0);
    addGeo(bot, 0, -1.8, 0);

    merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    merged.computeVertexNormals();

    cyl.dispose(); top.dispose(); bot.dispose();
    return merged;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const s = scrollRef.current;
    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.rotation.x = s * 0.5;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    groupRef.current.position.z = s * 2.5;
    if (matRef.current) matRef.current.emissiveIntensity = 0.1 + s * 0.3;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geom} castShadow>
        <meshPhysicalMaterial ref={matRef} color="#FF2E88" roughness={0.06} metalness={0.01} clearcoat={1} clearcoatRoughness={0.12} specularIntensity={1.2} specularColor="#ffffff" envMapIntensity={2} />
      </mesh>
    </group>
  );
}

function Particles({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 800;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 6;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const s = scrollRef.current;
    const geo = pointsRef.current.geometry;
    const arr = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const t = state.clock.elapsedTime * 0.3 + i * 0.07;
      arr[idx] += Math.sin(t) * 0.003;
      arr[idx + 1] += Math.cos(t * 0.7) * 0.003;
      arr[idx + 2] += Math.cos(t * 0.5) * 0.003;
      const c = s * 0.4;
      arr[idx] *= (1 - c * 0.3);
      arr[idx + 1] *= (1 - c * 0.3);
      arr[idx + 2] *= (1 - c * 0.3);
    }
    geo.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0002;
    pointsRef.current.rotation.x += 0.0001;
    (pointsRef.current.material as THREE.PointsMaterial).opacity = 0.3 + s * 0.4;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#FF2E88" size={0.04} blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.3} transparent />
    </points>
  );
}

export default function CapsuleScene() {
  const scrollRef = useRef(0);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 40, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); gl.domElement.style.display = 'none'; });
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <spotLight position={[8, 6, 4]} angle={0.5} penumbra={0.5} intensity={15} color="#ffffff" />
        <spotLight position={[-5, 2, -2]} angle={0.4} penumbra={0.8} intensity={5} color="#FFB6D9" />
        <pointLight position={[0, -3, 6]} intensity={3} color="#FF2E88" />
        <pointLight position={[0, 5, -3]} intensity={4} color="#C4126B" />
        <Capsule scrollRef={scrollRef} />
        <Particles scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
