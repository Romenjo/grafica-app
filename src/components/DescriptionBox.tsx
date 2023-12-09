import React from 'react';

interface DescriptionBoxProps {
  name: string;
  description: string;
}

const DescriptionBox: React.FC<DescriptionBoxProps> = ({ name, description }) => {
  return (
    <div style={{ maxWidth: '500px', wordWrap: 'break-word', margin: '0 auto'}}>
      <h2 style={{ fontFamily: 'Alice', fontWeight: 'bold',  textAlign: 'center' }}>{name}</h2>
      <p style={{ fontFamily: 'Alice', fontSize: '20px', textAlign: 'center' }}>{description}</p>
    </div>
  );
};

export default DescriptionBox;
