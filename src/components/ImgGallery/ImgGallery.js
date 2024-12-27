import './imgGallery.css'
import { useState } from 'react';
import { GalleryItem } from './GalleryItem.js'
import { Modal } from '../Modal/Modal.js';

function ImgGallery () {

  const [selectedImage, setSelectedImage] = useState(null);

  // In a real app, you would fetch this from an API or props
  const images = [
    '/gallery/image1.jpg',
    '/gallery/image2.jpg',
    '/gallery/image3.jpg',
    '/gallery/image4.jpg',
    '/gallery/image5.jpg',
    '/gallery/image6.jpg'
  ];

  return (
    <div className="gallery">
      <div className="gallery-grid">
        {images.map((image, index) => (
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
        <img 
          src={selectedImage} 
          alt="Selected gallery item" 
          className="modal-image"
        />
      </Modal>
    </div>
  );
}

export default ImgGallery;