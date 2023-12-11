import Header from "../components/Header";
import Card from "../components/Card";
import HorizontalStack from "../components/HorizontalStack";
import fractal from "../images/f.jpg";
import palitra from "../images/p.jpg";
import koord from "../images/k.jpg";

export default function () {
  return (
    <>
      <div style={{ margin: "70px", textAlign: "center" }}>
        <HorizontalStack>
          <Card
            imageUrl={fractal}
            name="Fractal Builder"
            description="Build interesting things, play trying different parametrs and download your creations"
            glowColor="violet"
            to="../pages/HFractalPage"
          />
          <Card
            imageUrl={palitra}
            name="Color Models"
            description="Add photos and play with saturation. Click to see color in RGB, HSL and CMYK"
            glowColor="red"
            to="../pages/HFractalPage"
          />
          <Card
            imageUrl={koord}
            name="Afiine trans"
            description="See how affine transformations reflect on trinagle movement through axes"
            glowColor="cyan"
            to="../pages/HFractalPage"
          />
        </HorizontalStack>
      </div>
    </>
  );
}
