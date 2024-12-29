import { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function GalleryItem({ type, url, model, index, onSelect }) {
  return (
    <div className="gallery-item" onClick={onSelect}>
      {type === '3Dmodel' ? (
        <Canvas
          camera={{ position: [3, 20, 14.25], fov: 8 }}
          style={{
            backgroundColor: "#111a21"
          }}
        >
          <ambientLight intensity={1.25} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            {model}
          </Suspense>
          <OrbitControls />
        </Canvas>
      ) : (
        <div className="image-container">
          <img src={url} alt={`Gallery item ${index + 1}`} />
        </div>
      )}
    </div>
  );
}