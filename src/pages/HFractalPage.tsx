import React, { useRef, useState } from "react";
import Canvas from "../components/Canvas";
import { complex } from "mathjs";
import MyOffcanvas from "../components/Offcanvas";
import DownloadImageButton from "../components/DownloadButton";
import DrawButton from "../components/DrawButton";
import ComboBox from "../components/ComboBox";
import InputField from "../components/InputField";
/**
 * Recursively draws an H-fractal on the provided canvas context.
 * @param {CanvasRenderingContext2D} context - The 2D rendering context of the canvas.
 * @param {number} x - X-coordinate of the center of the current H.
 * @param {number} y - Y-coordinate of the center of the current H.
 * @param {number} width - Width of the current H.
 * @param {number} height - Height of the current H.
 * @param {number} level - The current recursion level.
 * @param {string} colorScheme - Color scheme for rendering the fractal (e.g., "red-green-blue").
 */
function drawHFractal(context, x, y, width, height, level, colorScheme) {
  // Base case: If level is 0, stop recursion
  if (level === 0) return;

  // Determine the color based on the current level
  let colors = colorScheme.split("-");
  let color;
  if (level % 3 === 0) {
    color = colors[0];
  } else if (level % 3 === 1) {
    color = colors[1];
  } else {
    color = colors[2];
  }

  // Draw the H shape
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(x - width / 2, y - height / 2); // left vertical line
  context.lineTo(x - width / 2, y + height / 2);
  context.moveTo(x + width / 2, y - height / 2); // right vertical line
  context.lineTo(x + width / 2, y + height / 2);
  context.moveTo(x - width / 2, y); // connecting horizontal line
  context.lineTo(x + width / 2, y);
  context.stroke();

  // Recursively draw smaller H's at each corner of the current H
  const nextLevel = level - 1;
  const nextWidth = width / 2;
  const nextHeight = height / 2;

  drawHFractal(
    context,
    x - width / 2,
    y - height / 2,
    nextWidth,
    nextHeight,
    nextLevel,
    colorScheme
  ); // top left
  drawHFractal(
    context,
    x + width / 2,
    y - height / 2,
    nextWidth,
    nextHeight,
    nextLevel,
    colorScheme
  ); // top right
  drawHFractal(
    context,
    x - width / 2,
    y + height / 2,
    nextWidth,
    nextHeight,
    nextLevel,
    colorScheme
  ); // bottom left
  drawHFractal(
    context,
    x + width / 2,
    y + height / 2,
    nextWidth,
    nextHeight,
    nextLevel,
    colorScheme
  ); // bottom right
}

const width = 850;
const height = 650;
const HFractalPage = () => {
  const canvasRef = useRef(null);
  const [colorScheme, setColorScheme] = useState("Red-Blue-Black");

  const [levels, setlevels] = useState(5);

  const [scaleFactor, setScaleFactor] = useState(1);

  return (
    <>
      <div>
        <h1>H fractal</h1>
        <DownloadImageButton canvasRef={canvasRef} />
        <MyOffcanvas>
          <ComboBox
            options={[
              "Red-Blue-Black",
              "Cyan-Violet-Orange",
              "Green-Maroon-Yellow",
            ]}
            label="Color scheme"
            onOptionChange={setColorScheme}
          />
          <InputField
            label="Input level number"
            placeholder="3"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 1 && value <= 8) {
                setlevels(value);
              }
            }}
          />
          <InputField
            label="Input scale factor"
            placeholder="1"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value > 0) {
                setScaleFactor(value);
              }
            }}
          />
          <DrawButton
            canvasRef={canvasRef}
            drawFunction={(context) =>
              drawHFractal(
                context,
                width / 2,
                height / 2,
                (width / 2) * scaleFactor,
                (height / 2) * scaleFactor,
                levels,
                colorScheme
              )
            }
          />
        </MyOffcanvas>

        <Canvas width={width} height={height} ref={canvasRef} />
      </div>
    </>
  );
};



export default HFractalPage;
