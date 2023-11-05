import { useState } from "react";
import CircularSlider from "react-circular-slider-svg";
type prop = {
  val?: number;
  text: string;
};
const Slider = ({ val, text }: prop) => {
  const [value, setValue] = useState(val ?? 20);
  return (
    <CircularSlider
      handle1={{ value: value, onChange: setValue }}
      size={350}
      arcColor="red"
      arcBackgroundColor="transparent"
      startAngle={40}
      endAngle={320}
    >
    </CircularSlider>
  );
};

export default Slider;
