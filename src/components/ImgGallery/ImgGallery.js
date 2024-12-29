import './imgGallery.css';
import { useDevice } from "../Context/DeviceContext.js";
import { useState, Suspense } from 'react';
import { GalleryItem } from './GalleryItem.js';
import { OrbitControls } from "@react-three/drei";
import { Modal } from '../Modal/Modal.js';
import { Canvas } from "@react-three/fiber";
import SwordNormals from './Sword-normals.jsx';

function ImgGallery() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { isMobile } = useDevice();

  // Elementos de la galería
  const imageItems = [
    { type: 'img', url: 'https://ik.imagekit.io/rubeneg27/Raziel.png?updatedAt=1735383820945' },
    { type: 'img', url: 'https://ik.imagekit.io/rubeneg27/Jojos%20Jesus%20y%20nader.png?updatedAt=1735383851718' },
    { type: 'img', url: 'https://ik.imagekit.io/rubeneg27/amy.png?updatedAt=1735383894429' },
    { type: 'img', url: 'https://ik.imagekit.io/rubeneg27/Personajes-1.png?updatedAt=1735385830702' },
    { type: 'img', url: 'https://ik.imagekit.io/rubeneg27/char-sombras.png?updatedAt=1735385988674' },
    { type: 'img', url: 'https://ik.imagekit.io/rubeneg27/escenario%20vampiro.png?updatedAt=1735386279855' },
    { type: 'img', url: 'https://ik.imagekit.io/rubeneg27/escenario%20moco.png?updatedAt=1735386279808' },
    { type: 'img', url: 'https://ik.imagekit.io/rubeneg27/bosque%20lejos.png?updatedAt=1735386273864' },
    { type: '3Dmodel', model: <SwordNormals />, url: 'https://ik.imagekit.io/rubeneg27/sword-thumbnail.png?updatedAt=1735514996944' },
  ];

  return (
    <div className="gallery">
      <div className={isMobile? "gallery-grid-mobile" : "gallery-grid" }>
        {imageItems.map((item, index) => (
          <GalleryItem
            key={index}
            type={item.type}
            url={item.url}
            model={item.model}
            index={index}
            onSelect={() => setSelectedItem(item)}
          />
        ))}
      </div>
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
        {selectedItem && selectedItem.type === 'img' && (
          <img
            src={selectedItem.url}
            alt="Selected gallery item"
            className="modal-image"
          />
        )}
        {selectedItem && selectedItem.type === '3Dmodel' && (
          <div className="modal-3d">
            <Canvas
              camera={{ position: [3, 20, 14.25], fov: 8 }}
              style={{ width: '40vw', height: '50vh', backgroundColor: '#111a21' }}
            >
              <ambientLight intensity={1.25} />
              <directionalLight intensity={0.4} />
              <Suspense fallback={null}>
                {selectedItem.model}
              </Suspense>
              <OrbitControls />
            </Canvas>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ImgGallery;