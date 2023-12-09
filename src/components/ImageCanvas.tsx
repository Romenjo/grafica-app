import React, { useEffect, forwardRef } from 'react';

const ImageCanvas = forwardRef(({ saturationFunction, width = 750, height = 670, ...otherProps }, ref) => {
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');

    // Set initial background color to light grey
    context.fillStyle = 'lightgray';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the image if available
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);

    // Add click event listener
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      canvas.removeEventListener('dragover', handleDragOver);
      canvas.removeEventListener('drop', handleDrop);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [width, height]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = ref.current;
          const context = canvas.getContext('2d');

          // Clear the canvas
          context.clearRect(0, 0, canvas.width, canvas.height);

          // Draw the dropped image
          context.drawImage(img, 0, 0, width, height);

          // Apply saturation function if available
          if (saturationFunction) {
            saturationFunction(canvas);
          }
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (event) => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
  
    const ox = event.clientX - canvas.offsetLeft;
    const oy = event.clientY - canvas.offsetTop;
  
    const pixel = context.getImageData(ox, oy, 1, 1).data;
    const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  
    // Convert RGB to HSL
    const { h, s, l } = rgbToHsl(pixel[0], pixel[1], pixel[2]);
  
    // Convert HSL to CMYK
    const { c, m, y, k } = rgbToCmyk(pixel[0], pixel[1], pixel[2]);
  
    // Display RGB, HSL, and CMYK values
    alert(`RGB: ${rgbColor}\nHSL: H: ${h}, S: ${s}%, L: ${l}%\nCMYK: C: ${c.toFixed(3)}, M: ${m.toFixed(3)}, Y: ${y.toFixed(3)}, K: ${k.toFixed(3)}`);

    
};

  

  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <canvas
        ref={ref}
        width={width}
        height={height}
        style={{ maxWidth: '100%' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      ></canvas>
    </div>
  );
});


function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
  
    return { h, s, l };
  }


  function rgbToCmyk(r, g, b) {
    // Convert RGB to CMYK following the provided steps
    let rc = r / 255;
    let gc = g / 255;
    let bc = b / 255;

    let k = 1 - Math.max(rc, gc, bc);
    let c = (1 - rc - k) / (1 - k);
    let m = (1 - gc - k) / (1 - k);
    let y = (1 - bc - k) / (1 - k);

    return {c, m, y, k};
}




  function hslToCmyk(h, s, l) {
    // Convert HSL to RGB first
    let r, g, b;
    if(s == 0){
        r = g = b = l; // achromatic
    } else {
        let hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    // Then convert RGB to CMYK
    let k = Math.min(1 - r, 1 - g, 1 - b);
    let c = (1 - r - k) / (1 - k);
    let m = (1 - g - k) / (1 - k);
    let y = (1 - b - k) / (1 - k);

    return {
      c,
      m,
      y,
      k,
    };
}

export default ImageCanvas;
