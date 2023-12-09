import Header from "../components/Header";
import Instruction from "../components/Instruction";
import YoutubeEmbed from "../components/YoutubeEmbed";
import React from "react";



export default function () {
  const instructions = [
    "Drag and drop a photo into gray space",
    "Use slider to change blue saturation of your image",
    "Click on your image to get the color value in RGB, HSL and CMYK models",
    "Use 'Download image' button to download modified photo",
    "Feel free to drag and drop any other photo"
  ];

  return (
    <>
     <h2> Color Models info </h2>
      <Instruction instructions={instructions} />
      <div style={{ margin: "50px", textAlign: "center" }}>
        <YoutubeEmbed
          src="https://www.youtube.com/embed/cKaRxd6tdHY"
          
        />
      </div>
      <div style={{ margin: "50px", textAlign: "center" }}>
      <YoutubeEmbed
          src="https://www.youtube.com/embed/pjo3wP_yt2A"
         
        />
      </div>
      <div style={{ margin: "50px", textAlign: "center" }}>
      <YoutubeEmbed
          src="https://www.youtube.com/embed/Ceur-ARJ4Wc"
         
        />
      </div>
      <div style={{ margin: "50px", textAlign: "center" }}>
      <YoutubeEmbed
          src="https://www.youtube.com/embed/17VmxijytpM"
         
        />
      </div>

    </>
  );
}
