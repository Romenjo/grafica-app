import React, { useEffect, forwardRef } from 'react';

const Canvas = forwardRef(({ drawFunction, width = 750, height = 670, ...otherProps }, ref) => {

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');

    // Set initial background color to light grey
    context.fillStyle = 'lightgrey';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Call the draw function with the canvas context and other props
    if (drawFunction) {
      drawFunction(context, width, height, otherProps);
    }
  }, [drawFunction, width, height, otherProps]);

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <canvas ref={ref} width={width} height={height} style={{ maxWidth: '100%' }}></canvas>
    </div>
  );
});

export default Canvas;
