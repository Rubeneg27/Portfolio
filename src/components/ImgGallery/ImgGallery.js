import './imgGallery.css';
import { useEffect, useState } from 'react';
import Image from 'react-image-webp';
import { GalleryItem } from './GalleryItem.js';
import { Modal } from '../Modal/Modal.js';
import images from './images.js';

function ImgGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  // const [imageItems, setImageItems] = useState(null);

  // Imágenes que se muestran mientras se cargan las definitivas
  const imageItems = [
    'https://ik.imagekit.io/rubeneg27/Raziel.png?updatedAt=1735383820945',
    'https://ik.imagekit.io/rubeneg27/Jojos%20Jesus%20y%20nader.png?updatedAt=1735383851718',
    'https://ik.imagekit.io/rubeneg27/amy.png?updatedAt=1735383894429',
    'https://ik.imagekit.io/rubeneg27/Personajes-1.png?updatedAt=1735385830702',
    'https://ik.imagekit.io/rubeneg27/char-sombras.png?updatedAt=1735385988674',
    'https://ik.imagekit.io/rubeneg27/escenario%20vampiro.png?updatedAt=1735386279855',
    'https://ik.imagekit.io/rubeneg27/escenario%20moco.png?updatedAt=1735386279808',
    'https://ik.imagekit.io/rubeneg27/bosque%20lejos.png?updatedAt=1735386273864',
  ];

  return (
    <div className="gallery">
      <div className="gallery-grid">
        {(imageItems || []).map((image, index) => (
          <GalleryItem
            key={index}
            // image={`${process.env.PUBLIC_URL+image}`}
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
