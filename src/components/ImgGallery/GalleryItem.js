export function GalleryItem({ image, index, onSelect }) {
  console.log(typeof(image), image)
  return (
    <div 
      className="gallery-item"
      onClick={onSelect}
    >
      <div className="image-container">
        <img src={image} alt={`Gallery item ${index + 1}`} />
        <div className="image-overlay">
          {/* <div className="overlay-stats">
            <span>❤️ 123</span>
            <span>💬 45</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}