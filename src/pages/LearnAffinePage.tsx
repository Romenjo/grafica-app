import Header from "../components/Header";
import Instruction from "../components/Instruction";
import YoutubeEmbed from "../components/YoutubeEmbed";
import React from "react";

export default function () {
  const instructions = [
    "Affine transformation of triangle is displayed on page",
    "Transformations includes horizontal movement to indicated point while rotating",
    "In options menu specify starting X and Y values of triangles center",
    "Also specify target X value",
    "Press 'Restart movement' button to replay transformation animation",
    "You have possibility to download displayed image by clicking 'Download image' button"
    
  ];

  return (
    <>
      <h2> Affine Transformations info </h2>
      <Instruction instructions={instructions} />
      <div style={{ margin: "50px", textAlign: "center" }}>
        <YoutubeEmbed
          src="https://www.youtube.com/embed/DD70ZIDjL7g"
         
        />
      </div>
      <div style={{ margin: "50px", textAlign: "center" }}>
        <YoutubeEmbed
          src="https://www.youtube.com/embed/CKNjZ1mM7gc"
         
        />
      </div>
    </>
  );
}
