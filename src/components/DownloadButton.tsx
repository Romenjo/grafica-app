import React from 'react';

function DownloadImageButton({ canvasRef }) {
  const handleDownload = () => {
      const dataURL = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = 'h.png';
      link.click();
  };

  return (
    <button type="button" className="btn btn-outline-dark" onClick={handleDownload}>
      Download image
    </button>
  );
}

export default DownloadImageButton;



