import ImageCanvas from "../components/ImageCanvas";
import React, { useRef, useState, useEffect } from "react";
import _debounce from "lodash/debounce";

import MyOffcanvas from "../components/Offcanvas";
import DownloadImageButton from "../components/DownloadButton";
import MySlider from "../components/MySlider";

let originalImageData = null;
/**
 * Changes the blue saturation of pixels in the specified hue range on a canvas.
 * @param {HTMLCanvasElement} canvas - The canvas element to manipulate.
 * @param {number} saturationDelta - The percentage change in saturation
 */
function changeCanvasBlueSaturation(canvas, saturationDelta) {
  // Get the canvas rendering context
  var ctx = canvas.getContext("2d", { willReadFrequently: true });

  // Restore the original image data if available
  if (originalImageData) {
    ctx.putImageData(originalImageData, 0, 0);
  }

  // Get the current image data of the canvas
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  // Define the hue range for blue colors
  var minBlueHue = 180; // Minimum blue hue
  var maxBlueHue = 295; // Maximum blue hue

  // Convert saturationDelta from a percentage to a value in the range of 0 to 255
  var saturationValue = (saturationDelta / 100) * 255;

  // Adjust the blue saturation for pixels in the blue hue range
  for (var i = 0; i < data.length; i += 4) {
    // Convert RGB to HSL to extract the hue
    var r = data[i] / 255;
    var g = data[i + 1] / 255;
    var b = data[i + 2] / 255;

    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);

    var l = (max + min) / 2;
    var d = max - min;

    var h;
    if (d === 0) {
      h = 0;
    } else {
      h =
        ((max === r
          ? (g - b) / d + (g < b ? 6 : 0)
          : max === g
          ? (b - r) / d + 2
          : (r - g) / d + 4) /
          6) *
        360;
    }

    // Check if the hue is within the blue range
    if (h >= minBlueHue && h <= maxBlueHue) {
      // Set the blue channel to the adjusted saturationValue
      data[i + 2] = saturationValue;

      // Ensure the value is within the valid range (0 to 255)
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2]));
    }
  }

  // Update the canvas with the modified image data
  ctx.putImageData(imageData, 0, 0);
}


const ColorModelsPage = () => {
  const width = 800;
  const height = 600;
  const canvasRef = useRef(null);
  const [saturation, setSaturation] = useState(0);
  const [droppedPhoto, setDroppedPhoto] = useState(false);

  const debouncedUpdateSaturation = _debounce((value) => {
    if (canvasRef.current) {
      changeCanvasBlueSaturation(canvasRef.current, value);
    }
  }, 200);

  const handleSliderChange = (value) => {
    setSaturation(value);
  };

  const handleDragEnd = () => {
    debouncedUpdateSaturation(saturation);
  };

  const handleImageDrop = (imageData) => {
    // Save the initial image data only for the dropped photo
    originalImageData = imageData;
    setDroppedPhoto(true);
  };

  useEffect(() => {
    if (canvasRef.current && droppedPhoto) {
      var ctx = canvasRef.current.getContext("2d", {
        willReadFrequently: true,
      });
      originalImageData = ctx.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  }, [canvasRef, droppedPhoto]);

  return (
    <>
      <h1>Color Models</h1>
      <DownloadImageButton
        canvasRef={canvasRef}
        onImageDrop={handleImageDrop}
      />
      <MyOffcanvas>
        <MySlider onChange={handleSliderChange} onDragEnd={handleDragEnd} />
      </MyOffcanvas>
      <ImageCanvas width={width} height={height} ref={canvasRef} />
    </>
  );
};

export default ColorModelsPage;
