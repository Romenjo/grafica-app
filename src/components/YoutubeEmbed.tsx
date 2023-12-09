import React from 'react';
import "../App.css";

interface YoutubeEmbedProps {
  src: string;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ src }) => {
  return (
    <div className="video-container">
      <iframe
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;
