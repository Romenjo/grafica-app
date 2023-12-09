import React from 'react';

interface ImagePlacerProps {
  imageUrl: string;
}

const ImagePlacer: React.FC<ImagePlacerProps> = ({ imageUrl }) => {
  const styles = {
    borderRadius: '50%',
    overflow: 'hidden',
    width: '250px',
    height: '250px',
    margin: '0 auto', 
  };

  return (
    <div style={styles}>
      <img src={imageUrl} alt="User" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};

export default ImagePlacer;
