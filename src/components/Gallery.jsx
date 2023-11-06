import React, { useState } from 'react';
import './Gallery.css';
import './Responsive.css'

import { GrGallery as GalleryIcon } from 'react-icons/gr';

function Gallery() {

  // State to Store data
  const [images, setImages] = useState(Array.from({ length: 11 }, (_, index) => ({
    id: index + 1,
    isSelected: false,
  })));

  // Handle dropping an image
  const handleDropImage = (e, targetId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');

    if (id !== targetId) {
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        const sourceIndex = updatedImages.findIndex((img) => img.id === parseInt(id, 10));
        const targetIndex = updatedImages.findIndex((img) => img.id === parseInt(targetId, 10));

        if (sourceIndex !== -1 && targetIndex !== -1) {
          const sourceImage = updatedImages[sourceIndex];
          const targetImage = updatedImages[targetIndex];
          updatedImages[sourceIndex] = { ...sourceImage, id: targetImage.id };
          updatedImages[targetIndex] = { ...targetImage, id: sourceImage.id };
        }

        return updatedImages;
      });
    }
  }

  const handleDraggedStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  }

  const handleDraggedOver = (e) => {
    e.preventDefault();
  }

  // Define function to handle image selection
  const handleImageSelect = (id) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.map((image) => {
        if (image.id === id) {
          return { ...image, isSelected: !image.isSelected };
        }
        return image;
      });
      return updatedImages;
    });
  }

  // Define function to delete selected images
  const deleteSelectedImages = () => {
    const updatedImages = images.filter((image) => !image.isSelected);
    setImages(updatedImages);
  }

  // Define function to count the number of selected images
  const countSelected = () => {
    return images.filter((image) => image.isSelected).length;
  }

  return (
    <div id='gallery' className='bg-[#FCF5ED] py-4'>
      <div className="container mx-auto">
        <div className="gallery-main p-6 bg-[#FFFFFF]">

          {/* Navbar section */}
          <div className='navbar h-24 mx-2 flex items-center justify-between py-2'>
            {countSelected() === 0 && (
              <h2 className='font-bold text-3xl'>Gallery</h2>
            )}

            {countSelected() > 0 && (
              <p>{countSelected()} files selected</p>
            )}

            {countSelected() > 0 && (
              <button onClick={deleteSelectedImages} className='underline text-lg font-medium'>
                Delete Images
              </button>
            )}
          </div>

          {/* Image gallery section */}
          <div className='image-gallery'>
            {images.map((image, index) => (
              <div
                key={image.id}
                onDragOver={(e) => handleDraggedOver(e)}
                onDrop={(e) => handleDropImage(e, image.id)}
              >
                <div
                  className={`drag-image border ${index === 0 ? 'indexZero' : ''} ${image.isSelected ? 'selected-image' : ''} cursor-pointer transition-opacity duration-300`}
                  id={image.id}
                  draggable="true"
                  onDragStart={(e) => handleDraggedStart(e, image.id)}
                >
                  <img src={`/assets/image-${image.id}.webp`} alt="" />
                  <div className="drag-inner opacity-0 transition-opacity hover:opacity-100 duration-300"></div>
                  <input
                    type="checkbox"
                    checked={image.isSelected}
                    onChange={() => handleImageSelect(image.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Button to add images */}
          <div className="add-image">
            <button>
              <i className='text-7xl'><GalleryIcon /></i>
              <p className='mt-5'>Add Images</p>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Gallery;
