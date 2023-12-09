import React, { useRef, useState } from "react";
import Canvas from "../components/Canvas";
import MyOffcanvas from "../components/Offcanvas";
import DownloadImageButton from "../components/DownloadButton"; // import the component
import DrawButton from "../components/DrawButton";
import ComboBox from "../components/ComboBox";
import InputField from "../components/InputField";
// Constants for the Julia set
const X_MIN = -2;
const X_MAX = 2;
const Y_MIN = -2;
const Y_MAX = 2;

/**
 * Draws a Julia fractal with base function z*sin(z) on the provided canvas context.
 * @param {CanvasRenderingContext2D} context - The 2D rendering context of the canvas.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 * @param {number} maxIterations - Maximum number of iterations for the fractal computation.
 * @param {number} c_real - Real part of the Julia set constant.
 * @param {number} c_img - Imaginary part of the Julia set constant.
 * @param {string} colorScheme - Color scheme for rendering the fractal (e.g., "red-green-blue").
 * @param {number} scaleFactor - Scaling factor for adjusting the fractal size.
 */
function drawJuliaFractal(
  context,
  width,
  height,
  maxIterations,
  c_real,
  c_img,
  colorScheme,
  scaleFactor
) {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Map pixel coordinates to the fractal's complex plane
      let zx = ((x * (X_MAX - X_MIN)) / (width - 1) + X_MIN) * scaleFactor;
      let zy = ((y * (Y_MAX - Y_MIN)) / (height - 1) + Y_MIN) * scaleFactor;
      let n = 0;

      // Iterate to determine the fractal color based on Julia set calculations
      while (n < maxIterations && zx * zx + zy * zy < 4) {
        const tmp = zx * Math.sin(zx) - zy * Math.sin(zy);
        zy = 2.0 * zx * Math.sin(zy) + c_img;
        zx = tmp;
        n++;
      }

      // Apply color based on the iteration count and color scheme
      let colors = colorScheme.split("-");
      let color;
      if (n % 3 === 0) {
        color = colors[0];
      } else if (n % 3 === 1) {
        color = colors[1];
      } else {
        color = colors[2];
      }

      // Fill the pixel with the determined color
      context.fillStyle = color;
      context.fillRect(x, y, 1, 1);
    }
  }
}


const width = 850;
const height = 650;

const JuliaFractalPage = () => {
  const canvasRef = useRef(null);
  const [colorScheme, setColorScheme] = useState("Red-Blue-Black");
  const [maxIterations, setMaxIterations] = useState(300);
  const [complexReal, setComplexReal] = useState(-0.9);
  const [complexImaginary, setComplexImaginary] = useState(0.156);
  const [scaleFactor, setScaleFactor] = useState(1);

  return (
    <>
      <div>
      <h1>Julia fractal</h1>
        <DownloadImageButton canvasRef={canvasRef} />
        <MyOffcanvas>
          <ComboBox
            options={[
              "Red-Blue-Black",
              "Pink-Violet-Orange",
              "Green-Maroon-Yellow",
            ]}
            label="Color scheme"
            onOptionChange={setColorScheme}
          />

          <InputField
            label="Input iterations number"
            placeholder="222"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 1 && value <= 1000) {
                setMaxIterations(value);
              }
            }}
          />
          <InputField
            label="Input complex real"
            placeholder="-0.9"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value >= -7 && value <= 7) {
                setComplexReal(value);
              }
            }}
          />
          <InputField
            label="Input complex imaginary"
            placeholder="-0.9"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value >= -7 && value <= 7) {
                setComplexImaginary(value);
              }
            }}
          />

          <InputField
            label="Input scale factor"
            placeholder="1"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value >= 0.5 && value <= 1) {
                setScaleFactor(value);
              }
            }}
          />

          <DrawButton
            canvasRef={canvasRef}
            drawFunction={(context) =>
              drawJuliaFractal(
                context,
                width,
                height,
                maxIterations,
                complexReal,
                complexImaginary,
                colorScheme,
                scaleFactor
              )
            }
          />
        </MyOffcanvas>

        <Canvas width={width} height={height} ref={canvasRef} />
      </div>
    </>
  );
};

export default JuliaFractalPage;
