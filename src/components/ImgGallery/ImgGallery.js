import './imgGallery.css';
import { useDevice } from "../Context/DeviceContext.js";
import { useState, Suspense } from 'react';
import { GalleryItem } from './GalleryItem.js';
import { OrbitControls } from "@react-three/drei";
import { Modal } from '../Modal/Modal.js';
import { Canvas } from "@react-three/fiber";
import imageItems from '../../Assets/galleryItems/galleryItems.js';

function ImgGallery() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { isMobile } = useDevice();

  return (
    <div className={isMobile ? "gallery_mobile" : "gallery"}>
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
              camera={{ position: [3, 60, 14.25], fov: 8 }}
              style={
                isMobile ?
                { width: '80vw', height: '80vw', backgroundColor: '#111a21' } 
                :
                { width: '40vw', height: '40vw', backgroundColor: '#111a21' }
              }
            >
              <ambientLight intensity={1.25} />
              <directionalLight intensity={4.0} />
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