"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

const CYAN = new THREE.Color("#22d3ee");
const PURPLE = new THREE.Color("#a78bfa");

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createGraph(count = 36) {
  const rand = mulberry32(2026);
  const nodes: THREE.Vector3[] = [];

  for (let i = 0; i < count; i += 1) {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const radius = 1.05 + rand() * 1.45;
    nodes.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) * 0.82,
        radius * Math.cos(phi),
      ),
    );
  }

  const edges: Array<[number, number]> = [];
  const seen = new Set<string>();

  const addEdge = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (a === b || seen.has(key)) {
      return;
    }
    seen.add(key);
    edges.push([a, b]);
  };

  for (let i = 0; i < nodes.length; i += 1) {
    const nearest = nodes
      .map((node, index) => ({ index, distance: nodes[i].distanceTo(node) }))
      .filter((item) => item.index !== i)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    nearest.forEach((item, order) => {
      if (item.distance < 1.55 || order < 2) {
        addEdge(i, item.index);
      }
    });
  }

  return { nodes, edges };
}

function Rig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const lastMove = useRef(0);
  const autoY = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1;
      lastMove.current = performance.now();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    if (reduceMotion) {
      return;
    }

    const idle = performance.now() - lastMove.current > 1400;
    if (idle || lastMove.current === 0) {
      autoY.current += delta * 0.16;
    }

    const targetY = autoY.current + mouse.current.x * 0.42;
    const targetX = mouse.current.y * 0.2;

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      3.4,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      3.4,
      delta,
    );
  });

  return <group ref={group}>{children}</group>;
}

function PingPaths({
  nodes,
  edges,
}: {
  nodes: THREE.Vector3[];
  edges: Array<[number, number]>;
}) {
  const reduceMotion = useReducedMotion();
  const paths = useMemo(
    () => edges.filter((_, index) => index % 5 === 0).slice(0, 8),
    [edges],
  );

  return (
    <>
      {paths.map(([from, to], index) => (
        <PingLine
          key={`${from}-${to}`}
          start={nodes[from]}
          end={nodes[to]}
          delay={index * 0.35}
          reduceMotion={Boolean(reduceMotion)}
        />
      ))}
    </>
  );
}

function PingLine({
  start,
  end,
  delay,
  reduceMotion,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  delay: number;
  reduceMotion: boolean;
}) {
  const lineRef = useRef<{ material?: { dashOffset?: number } }>(null);

  useFrame(({ clock }) => {
    if (reduceMotion) {
      return;
    }

    if (lineRef.current?.material) {
      lineRef.current.material.dashOffset = -clock.elapsedTime * 2.2 - delay;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[start.toArray(), end.toArray()]}
      color={delay % 0.7 < 0.35 ? "#67e8f9" : "#c4b5fd"}
      lineWidth={1.35}
      dashed
      dashSize={0.16}
      gapSize={0.38}
      transparent
      opacity={0.85}
    />
  );
}

function Edges({
  nodes,
  edges,
}: {
  nodes: THREE.Vector3[];
  edges: Array<[number, number]>;
}) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const reduceMotion = useReducedMotion();
  const mix = useMemo(() => new THREE.Color(), []);

  const { geometry, colorAttribute } = useMemo(() => {
    const positions = new Float32Array(edges.length * 6);
    const colors = new Float32Array(edges.length * 6);

    edges.forEach(([from, to], index) => {
      positions.set(
        [nodes[from].x, nodes[from].y, nodes[from].z, nodes[to].x, nodes[to].y, nodes[to].z],
        index * 6,
      );
      CYAN.toArray(colors, index * 6);
      PURPLE.toArray(colors, index * 6 + 3);
    });

    const nextGeometry = new THREE.BufferGeometry();
    nextGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const nextColors = new THREE.BufferAttribute(colors, 3);
    nextColors.setUsage(THREE.DynamicDrawUsage);
    nextGeometry.setAttribute("color", nextColors);

    return { geometry: nextGeometry, colorAttribute: nextColors };
  }, [edges, nodes]);

  useFrame(({ clock }) => {
    if (reduceMotion) {
      return;
    }

    const time = clock.elapsedTime;
    const colors = colorAttribute.array as Float32Array;

    edges.forEach((_, index) => {
      const ping = (time * 0.7 + index * 0.19) % 1;
      const pulse = 0.35 + (Math.sin(time * 2.4 + index) + 1) * 0.32;
      mix.lerpColors(CYAN, PURPLE, ping);

      for (let vertex = 0; vertex < 2; vertex += 1) {
        const strength = vertex === 0 ? 1 - ping : ping;
        const offset = (index * 2 + vertex) * 3;
        colors[offset] = mix.r * (0.45 + strength * pulse);
        colors[offset + 1] = mix.g * (0.45 + strength * pulse);
        colors[offset + 2] = mix.b * (0.45 + strength * pulse);
      }
    });

    colorAttribute.needsUpdate = true;

    const material = lineRef.current?.material;
    if (material && !Array.isArray(material)) {
      material.opacity = 0.42 + Math.sin(time * 1.7) * 0.12;
    }
  });

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function Nodes({ nodes }: { nodes: THREE.Vector3[] }) {
  const group = useRef<THREE.Group>(null);
  const reduceMotion = useReducedMotion();

  useFrame(({ clock }) => {
    if (reduceMotion || !group.current) {
      return;
    }

    const time = clock.elapsedTime;
    group.current.children.forEach((child, index) => {
      const scale = 1 + Math.sin(time * 2.1 + index * 0.45) * 0.12;
      child.scale.setScalar(scale);
    });
  });

  return (
    <group ref={group}>
      {nodes.map((position, index) => {
        const hub = index % 7 === 0;
        const color = index % 2 === 0 ? "#22d3ee" : "#c4b5fd";
        const radius = hub ? 0.07 : 0.045;

        return (
          <group key={`${position.x}-${index}`} position={position}>
            <mesh>
              <sphereGeometry args={[radius, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={hub ? 2.4 : 1.6}
                roughness={0.25}
                metalness={0.15}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[radius * 2.4, 12, 12]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.14}
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function NetworkScene() {
  const graph = useMemo(() => createGraph(36), []);

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[2.4, 1.6, 3]} intensity={1.4} color="#67e8f9" />
      <pointLight position={[-2.2, -1.4, 2]} intensity={1.1} color="#c4b5fd" />
      <Rig>
        <Edges nodes={graph.nodes} edges={graph.edges} />
        <PingPaths nodes={graph.nodes} edges={graph.edges} />
        <Nodes nodes={graph.nodes} />
      </Rig>
    </>
  );
}

export function InteractiveNetwork() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        className="pointer-events-none h-full w-full"
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        dpr={[1, 1.75]}
      >
        <NetworkScene />
      </Canvas>
    </div>
  );
}
