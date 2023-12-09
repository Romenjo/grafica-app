import React, { useRef, useEffect, useState } from "react";
import MyOffcanvas from "../components/Offcanvas";
import DownloadImageButton from "../components/DownloadButton";
import TriangleCanvas from "../components/TriangleCanvas";
import InputField from "../components/InputField";

const getCanvasCoordinates = (canvasWidth, canvasHeight, pointX, pointY) => {
  const originX = canvasWidth / 2;
  const originY = canvasHeight / 2;
  const canvasX = originX + pointX * 15; // Multiply by 15 to convert to canvas units
  const canvasY = originY - pointY * 15; // Multiply by 15 to convert to canvas units

  console.log(canvasX + "  " + canvasY);

  return { x: canvasX, y: canvasY };
};

const getOriginalCoordinates = (
  canvasWidth,
  canvasHeight,
  canvasX,
  canvasY
) => {
  const originX = canvasWidth / 2;
  const originY = canvasHeight / 2;
  const pointX = (canvasX - originX) / 15; // Divide by 15 to convert back to original units
  const pointY = (originY - canvasY) / 15; // Divide by 15 to convert back to original units
  return { x: pointX, y: pointY };
};

const AffinePage = () => {
  const width = 800;
  const height = 600;
  const canvasRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  const handleToggleAnimation = () => {
    setIsAnimating((prevState) => !prevState);
  };

  const [targetX, setTargetX] = useState(500);
  const [centerX, setCenterX] = useState(75);
  const [centerY, setCenterY] = useState(75);
  const initCenter = { x: centerX, y: centerY };

  const triangle = {
    vertices: [
      { x: 50, y: 50 },
      { x: 100, y: 50 },
      { x: 75, y: 100 },
    ],
    initialCenter: initCenter,
    targetCenter: { x: targetX, y: 300 }, // Update targetX here
    translation: 0,
    direction: 1, // 1 for moving forward, -1 for moving backward
    isAtTarget: false,
    speed: 1, // Add a speed property to control the speed of the animation
    rotation: 0.5, // Add a rotation property to control the rotation of the triangle
  };

  return (
    <>
      <h1>Affine transformation</h1>
      <DownloadImageButton canvasRef={canvasRef} />
      <MyOffcanvas>
        <InputField
          label="Center X"
          placeholder="300"
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              let origPosition = getOriginalCoordinates(
                width,
                height,
                initCenter.x,
                initCenter.y
              );
              let actualPosition = getCanvasCoordinates(
                width,
                height,
                value,
                origPosition.y
              );
              setCenterX(actualPosition.x);
            }
          }}
        />
        <InputField
          label="Center Y"
          placeholder="300"
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              let origPosition = getOriginalCoordinates(
                width,
                height,
                initCenter.x,
                initCenter.y
              );
              let actualPosition = getCanvasCoordinates(
                width,
                height,
                origPosition.x,
                value
              );
              setCenterY(actualPosition.y);
            }
          }}
        />

        <InputField
          label="Target X"
          placeholder="300"
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              let point = getCanvasCoordinates(width, height, value, 0);
              setTargetX(point.x);
            }
          }}
        />

        <button
          type="button"
          className="btn btn-dark"
          onClick={handleToggleAnimation}
        >
          Restart movement
        </button>
      </MyOffcanvas>
      <TriangleCanvas
        width={width}
        height={height}
        ref={canvasRef}
        isAnimating={isAnimating}
        triangle={triangle}
      />
    </>
  );
};

export default AffinePage;
