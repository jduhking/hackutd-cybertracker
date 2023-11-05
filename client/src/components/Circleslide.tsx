import { useState, useEffect } from "react";
import CircularSlider from "react-circular-slider-svg";
type prop = {
  val?: number;

  text: string; 
  duration: number;
};

const Slider = ({ val, duration, text }: prop) => {
  const [value, setValue] = useState(0);
  const targetValue = val;
  useEffect(() => {
    if (targetValue !== undefined && targetValue !== value) {
      const startTime = Date.now();
      const animationFrame = () => {
        const currentTime = Date.now();
        const duration = 1000; // You can adjust the animation duration
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const newValue = (targetValue * elapsedTime) / duration;
          setValue(newValue);
          requestAnimationFrame(animationFrame);
        } else {
          setValue(targetValue);
        }
      };
      requestAnimationFrame(animationFrame);
    }
  }, [targetValue]);
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
