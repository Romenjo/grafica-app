import React from "react";
import Header from "../components/Header";
import Instruction from "../components/Instruction";
import YoutubeEmbed from "../components/YoutubeEmbed";

export default function () {
  const instructions = [
    "You can build H and Julia (z*sin(z)) fractals",
    "For each fractal choose desired color scheme",
    "For H fraction indicate level number (from 1 up to 8) and scale factor (0.5 to minimize, 1.5 to maximize)",
    "For Julia fractal specify iterations number, complex real and imaginary, scale factor (from 1 to 0.5 to maximize)",
    "For Julia recommended values are 0.7** for imaginary + scale factor with iterations over 600",
    "After building a fractal download its image by clicking 'Download image' button",
  ];

  return (
    <>
      <h2> Fractals info </h2>
      <Instruction instructions={instructions} />
      <div style={{ margin: "50px", textAlign: "center" }}>
        <YoutubeEmbed
          src="https://www.youtube.com/embed/fMBi2ohn_Co"
         
        />
      </div>
      <div style={{ margin: "50px", textAlign: "center" }}>
      <YoutubeEmbed
          src="https://www.youtube.com/embed/ow5Dt9z6VII"
         
        />
      </div>

    </>
  );
}