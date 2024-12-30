import { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function GalleryItem({ type, url, index, onSelect }) {
  return (
    <div className="gallery-item" onClick={onSelect}>
      {type === '3Dmodel' ? (
        <div className="image-container">
        <img src={url} alt={`Gallery item ${index + 1}`} />
      </div>
      ) : (
        <div className="image-container">
          <img src={url} alt={`Gallery item ${index + 1}`} />
        </div>
      )}
    </div>
  );
}