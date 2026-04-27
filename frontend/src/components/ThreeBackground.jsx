import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_DISTANCE = 1.8;

function ParticleNetwork() {
  const pointsRef = useRef();
  const linesRef = useRef();
  const { mouse, viewport } = useThree();
  
  // Use fewer particles on narrow screens
  const [particleCount, setParticleCount] = useState(120);
  
  useEffect(() => {
    if (window.innerWidth < 768) setParticleCount(50);
  }, []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 5 - 2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006
        ),
        baseX: 0,
        baseY: 0
      });
    }
    return temp;
  }, [particleCount]);

  const pointPositions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);
  const linePositions = useMemo(() => new Float32Array(particleCount * particleCount * 3), [particleCount]);
  
  const pointColors = useMemo(() => {
    const colors = new Float32Array(particleCount * 3);
    const colorChoices = [
      new THREE.Color('#00d4ff'), // Cyan
      new THREE.Color('#2dd4bf'), // Teal
      new THREE.Color('#0f172a')  // Very Dark Blue (to blend in)
    ];
    for(let i=0; i<particleCount; i++) {
      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i*3] = c.r;
      colors[i*3+1] = c.g;
      colors[i*3+2] = c.b;
    }
    return colors;
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    // Premium Parallax Effect
    state.camera.position.x += (mouse.x * 2 - state.camera.position.x) * 0.02;
    state.camera.position.y += (mouse.y * 2 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);

    let lineIndex = 0;
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      
      // Update position
      p.position.add(p.velocity);
      
      // Bounce boundaries
      const boundX = viewport.width / 2 + 1;
      const boundY = viewport.height / 2 + 1;
      if (Math.abs(p.position.x) > boundX) p.velocity.x *= -1;
      if (Math.abs(p.position.y) > boundY) p.velocity.y *= -1;
      if (p.position.z > 1 || p.position.z < -6) p.velocity.z *= -1;

      // Subtle Mouse interaction (gentle repulsion)
      const dx = mouseX - p.position.x;
      const dy = mouseY - p.position.y;
      const distToMouse = Math.sqrt(dx*dx + dy*dy);
      
      if (distToMouse < 3.0) {
        // Very smooth, subtle push
        p.position.x -= dx * 0.006;
        p.position.y -= dy * 0.006;
      }

      pointPositions[i * 3] = p.position.x;
      pointPositions[i * 3 + 1] = p.position.y;
      pointPositions[i * 3 + 2] = p.position.z;

      for (let j = i + 1; j < particleCount; j++) {
        const p2 = particles[j];
        if (p.position.distanceTo(p2.position) < MAX_DISTANCE) {
          linePositions[lineIndex++] = p.position.x;
          linePositions[lineIndex++] = p.position.y;
          linePositions[lineIndex++] = p.position.z;
          
          linePositions[lineIndex++] = p2.position.x;
          linePositions[lineIndex++] = p2.position.y;
          linePositions[lineIndex++] = p2.position.z;
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIndex), 3));
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={pointPositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={pointColors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation={true} />
      </points>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.1} />
      </lineSegments>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2 }}>
        <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 50%, #0a0f1a 0%, #050508 100%)' }} />
      </div>
      
      {/* Noise Texture layer */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        opacity: 0.05, mixBlendMode: 'overlay' 
      }} />

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <ParticleNetwork />
        </Canvas>
      </div>
    </>
  );
}
