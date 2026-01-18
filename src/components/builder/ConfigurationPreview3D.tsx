import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import type { ShelfConfiguration } from '../../types';

interface ConfigurationPreview3DProps {
  configuration: ShelfConfiguration | null;
}

function ShelfModel({ configuration }: { configuration: ShelfConfiguration }) {
  const { shelves, uprights } = useMemo(() => {
    const shelfItems = configuration.components.filter((c) => c.component.type === 'shelf');
    const uprightItems = configuration.components.filter((c) => c.component.type === 'upright');

    const totalShelves = shelfItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalUprights = Math.max(uprightItems.reduce((sum, item) => sum + item.quantity, 0), 2);
    const uprightHeight = (uprightItems[0]?.component.dimensions.height || 180) / 100;

    return {
      shelves: Array.from({ length: totalShelves }),
      uprights: Array.from({ length: totalUprights }),
      height: uprightHeight,
      width: 0.6 * (totalUprights - 1),
    };
  }, [configuration]);

  const uprightHeight = configuration.totalDimensions.height / 100;
  const shelfWidth = configuration.totalDimensions.width / 100;
  const shelfDepth = configuration.totalDimensions.depth / 100;

  const shelfSpacing = (uprightHeight - 0.1) / (shelves.length + 1);

  return (
    <group position={[0, -uprightHeight / 2, 0]}>
      {/* Uprights */}
      {uprights.map((_, index) => {
        const xPos = (index - (uprights.length - 1) / 2) * 0.6;
        return (
          <mesh key={`upright-${index}`} position={[xPos, uprightHeight / 2, 0]}>
            <boxGeometry args={[0.04, uprightHeight, 0.04]} />
            <meshStandardMaterial color="#5B7C99" />
          </mesh>
        );
      })}

      {/* Shelves */}
      {shelves.map((_, index) => {
        const yPos = shelfSpacing * (index + 1);
        return (
          <mesh key={`shelf-${index}`} position={[0, yPos, 0]}>
            <boxGeometry args={[Math.max(shelfWidth - 0.08, 0.52), 0.025, shelfDepth]} />
            <meshStandardMaterial color="#E8C79A" />
          </mesh>
        );
      })}

      {/* Base */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[Math.max(shelfWidth, 0.6), 0.08, shelfDepth]} />
        <meshStandardMaterial color="#E8C79A" />
      </mesh>

      {/* Floor shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[2, 2]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 1, 0.3]} />
      <meshStandardMaterial color="#E8C79A" wireframe />
    </mesh>
  );
}

export default function ConfigurationPreview3D({ configuration }: ConfigurationPreview3DProps) {
  if (!configuration || configuration.components.length === 0) {
    return (
      <div className="w-full h-64 bg-modern-grey rounded-xl flex items-center justify-center">
        <p className="text-gray-400">No components selected</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80 bg-gradient-to-br from-white to-modern-grey rounded-xl overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[2, 1.5, 2]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.3} />

        <Suspense fallback={<LoadingFallback />}>
          <ShelfModel configuration={configuration} />
          <Environment preset="apartment" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={1.5}
          maxDistance={5}
        />
      </Canvas>
    </div>
  );
}
