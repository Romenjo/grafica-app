import React, { useRef, useEffect, forwardRef } from "react";


/**
 * Updates the vertices of an equilateral triangle based on its center coordinates.
 * @param {Object} center - The center coordinates of the triangle.
 * @returns {Array} - An array of three vertices [{x, y}, {x, y}, {x, y}].
 */
function updateTriangleVertices(center) {
  const halfBase = 25; // Half of the base of the triangle
  const height = 50; // Height of the triangle

  return [
    { x: center.x - halfBase, y: center.y - height / 2 },
    { x: center.x + halfBase, y: center.y - height / 2 },
    { x: center.x, y: center.y + height / 2 },
  ];
}

// Initialize variables to track previous target and center positions
let prevTargetPosition = null;
let prevCenterPosition = null;

/**
 * Canvas component for animating a triangle's movement and rotation.
 * @param {Object} props - Component properties.
 * @param {boolean} props.isAnimating - Flag indicating whether the animation is active.
 * @param {number} [props.width=200] - Width of the canvas.
 * @param {number} [props.height=150] - Height of the canvas.
 * @param {Object} props.triangle - Triangle object containing animation properties.
 * @param {React.Ref} ref - React ref to access the canvas element.
 */
const TriangleCanvas = forwardRef(({ isAnimating, width = 200, height = 150, triangle }, ref) => {
  // Reference to the canvas element
  const canvasRef = ref;

  // Check if the triangle has changed direction based on target and center positions
  if (prevTargetPosition != null && triangle.initialCenter.x > prevTargetPosition || prevCenterPosition != null && triangle.targetCenter.x < prevCenterPosition.x) {
    triangle.direction = -1;
  }

  // Update previous positions for the next iteration
  prevCenterPosition = triangle.initialCenter;
  prevTargetPosition = triangle.targetCenter;

  /**
   * Converts canvas coordinates to original coordinates.
   * @param {number} canvasWidth - Width of the canvas.
   * @param {number} canvasHeight - Height of the canvas.
   * @param {number} pointX - X-coordinate on the canvas.
   * @param {number} pointY - Y-coordinate on the canvas.
   * @returns {Object} - Original coordinates {x, y}.
   */
  const getCanvasCoordinates = (canvasWidth, canvasHeight, pointX, pointY) => {
    const originX = canvasWidth / 2;
    const originY = canvasHeight / 2;
    const canvasX = originX + pointX * 15; // Multiply by 15 to convert to canvas units
    const canvasY = originY - pointY * 15; // Multiply by 15 to convert to canvas units
    return { x: canvasX, y: canvasY };
  };

  /**
   * Converts original coordinates to canvas coordinates.
   * @param {number} canvasWidth - Width of the canvas.
   * @param {number} canvasHeight - Height of the canvas.
   * @param {number} canvasX - X-coordinate in canvas units.
   * @param {number} canvasY - Y-coordinate in canvas units.
   * @returns {Object} - Canvas coordinates {x, y}.
   */
  const getOriginalCoordinates = (canvasWidth, canvasHeight, canvasX, canvasY) => {
    const originX = canvasWidth / 2;
    const originY = canvasHeight / 2;
    const pointX = (canvasX - originX) / 15; // Divide by 15 to convert back to original units
    const pointY = (originY - canvasY) / 15; // Divide by 15 to convert back to original units
    return { x: pointX, y: pointY };
  };

  /**
   * Draws the coordinate system on the canvas.
   */
  const drawCoordinateSystem = () => {
    const context = canvasRef.current.getContext("2d");

    // Draw grid lines
    const gridSize = 10;
    context.beginPath();
    for (let x = 0; x <= canvasRef.current.width; x += gridSize) {
      context.moveTo(x, 0);
      context.lineTo(x, canvasRef.current.height);
    }
    for (let y = 0; y <= canvasRef.current.height; y += gridSize) {
      context.moveTo(0, y);
      context.lineTo(canvasRef.current.width, y);
    }
    context.strokeStyle = "lightgrey";
    context.stroke();

    // Draw x and y axes
    context.beginPath();
    context.moveTo(0, canvasRef.current.height / 2);
    context.lineTo(canvasRef.current.width, canvasRef.current.height / 2);
    context.moveTo(canvasRef.current.width / 2, 0);
    context.lineTo(canvasRef.current.width / 2, canvasRef.current.height);
    context.strokeStyle = "black";
    context.stroke();

    // Convert target and center points to original coordinates
    const targetPoint = getOriginalCoordinates(canvasRef.current.width, canvasRef.current.height, triangle.targetCenter.x, triangle.targetCenter.y);
    const centerPoint = getOriginalCoordinates(canvasRef.current.width, canvasRef.current.height, triangle.initialCenter.x, triangle.initialCenter.y);
    const nullPoint = getOriginalCoordinates(canvasRef.current.width, canvasRef.current.height, 0, 0);

    // Mark points on the canvas
    context.font = "10px Arial";
    context.fillText("(0,0)", canvasRef.current.width / 2 + 2, canvasRef.current.height / 2 + 10);
    context.fillText(
      `(${Math.floor(centerPoint.x)},${Math.floor(centerPoint.y)})`,
      triangle.initialCenter.x,
      triangle.initialCenter.y - 5
    );
    context.fillText(
      `(${Math.floor(targetPoint.x)},${Math.floor(targetPoint.y)})`,
      triangle.targetCenter.x,
      triangle.targetCenter.y - 5
    );

    // Draw labels for the target point and center of the triangle
    const targetPointLabel = `Target (${targetPoint.x},${targetPoint.y})`;
    const centerLabel = `Center (${centerPoint.x},${centerPoint.y})`;

    context.fillText(targetPointLabel, getCanvasCoordinates(canvasRef.current.width, canvasRef.current.height, triangle.targetCenter.x, triangle.targetCenter.y).x, getCanvasCoordinates(canvasRef.current.width, canvasRef.current.height, triangle.targetCenter.x, triangle.targetCenter.y).y - 5);
    context.fillText(centerLabel, getCanvasCoordinates(canvasRef.current.width, canvasRef.current.height, triangle.initialCenter.x, triangle.initialCenter.y).x, getCanvasCoordinates(canvasRef.current.width, canvasRef.current.height, triangle.initialCenter.x, triangle.initialCenter.y).y - 5);
  };

  /**
   * Draws and animates the triangle on the canvas.
   */
  const drawTriangle = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Function to update the triangle's vertices based on its center
    const updatedVertices = updateTriangleVertices(triangle.initialCenter);
    triangle.vertices = updatedVertices;

    // Function to clear the canvas and draw the coordinate system
    const clearAndDrawCoordinateSystem = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCoordinateSystem();
    };

    // Draw the triangle only when animation is active
    if (isAnimating) {
      clearAndDrawCoordinateSystem();

      context.save();
      context.translate(triangle.initialCenter.x, triangle.initialCenter.y);
      context.rotate((triangle.rotation * Math.PI) / 180);
      context.translate(-triangle.initialCenter.x, -triangle.initialCenter.y);

      context.beginPath();
      context.moveTo(triangle.vertices[0].x, triangle.vertices[0].y);
      context.lineTo(triangle.vertices[1].x, triangle.vertices[1].y);
      context.lineTo(triangle.vertices[2].x, triangle.vertices[2].y);
      context.closePath();
      context.stroke();

      context.restore();

      // Update triangle properties for the next frame
      if (!triangle.isAtTarget) {
        triangle.translation += triangle.direction * triangle.speed;
        triangle.rotation += 1;

        triangle.vertices.forEach((vertex, index) => {
          triangle.vertices[index] = {
            x: vertex.x + triangle.direction * triangle.speed,
            y: vertex.y,
          };
        });

        if (Math.abs(triangle.initialCenter.x - triangle.targetCenter.x) < triangle.speed) {
          triangle.isAtTarget = true;
        }

        triangle.initialCenter = {
          x: triangle.initialCenter.x + triangle.direction * triangle.speed,
          y: triangle.initialCenter.y,
        };
      }

      // Request the next frame for animation
      requestAnimationFrame(drawTriangle);
    }
  };

  // Call the drawTriangle function on component mount and whenever relevant props change
  useEffect(() => {
    drawTriangle();
  }, [
    isAnimating,
    triangle.initialCenter.x,
    triangle.initialCenter.y,
    triangle.vertices,
    width,
    height,
    triangle.isAtTarget,
    triangle.speed,
    triangle.rotation,
  ]);

  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <canvas
        ref={ref}
        width={width}
        height={height}
        style={{ maxWidth: "100%" }}
      ></canvas>
    </div>
  );
});

export default TriangleCanvas;
