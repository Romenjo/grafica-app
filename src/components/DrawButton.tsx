
function DrawButton({ drawFunction, saturationFunction, canvasRef }) {
    const handleDraw = () => {
      if (drawFunction) {
        const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      drawFunction(context);
      }
      
    };

    const handleSaturation = () => {
      if (saturationFunction) {
        const canvas = canvasRef.current;
      saturationFunction(canvas);
      }
      
    };
  
    return (
      <button type="button" className="btn btn-dark" onClick={handleDraw}>
        Draw
      </button>
    );
  }
  
  export default DrawButton;
  
  
  