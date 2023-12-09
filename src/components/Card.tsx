import React from 'react';
import "../App.css";
import ImagePlacer from './ImagePlacer';
import DescriptionBox from './DescriptionBox';


interface CardProps {
  imageUrl: string;
  name: string;
  description: string;
  glowColor: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, name, description, glowColor }) => {
  const styles = {
    card: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      backdropFilter: 'blur(10px)', 
      boxShadow: `0 0 10px ${glowColor}`, 
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      width: '500px',
      margin: 'auto 40px'
    },
  };

  return (
    <div style={styles.card} className="card">
      <ImagePlacer imageUrl={imageUrl} />
      <DescriptionBox name={name} description={description} />
    </div>
  );
};

export default Card;
