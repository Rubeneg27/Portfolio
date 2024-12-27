import './imgGallery.css';
import { useEffect, useState } from 'react';
import { GalleryItem } from './GalleryItem.js';
import { Modal } from '../Modal/Modal.js';
import images from './images.js';
import testimg from '../../Assets/imgs/Jojos Jesus y nader.png'

function ImgGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  // const [imageItems, setImageItems] = useState(null);

  // Imágenes que se muestran mientras se cargan las definitivas
  const imageItems = [
    '../../Assets/imgs/Jojos Jesus y nader.png',
    '/imgs/Raziel.png',
    '/gallery/image3.jpg',
    '/gallery/image4.jpg',
    '/gallery/image5.jpg',
    '/gallery/image6.jpg',
  ];

  return (
    <div className="gallery">
      <div className="gallery-grid">
        <img src="/imgs/Raziel.png"></img>
        {(imageItems || []).map((image, index) => (
          <GalleryItem
            key={index}
            image={image}
            index={index}
            onSelect={() => setSelectedImage(image)}
          />
        ))}
      </div>

      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected gallery item"
            className="modal-image"
          />
        )}
      </Modal>
    </div>
  );
}

export default ImgGallery;
