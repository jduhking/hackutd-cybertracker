import { Box, Button, Card, Typography } from "@mui/material";
import Slider from "./Circleslide";

type props = {
  width?: number | string;
  height?: number | string;
  value?: number;
  onButtonPress?: () => void;
  margin?: number;
  padding?: number;
  text: string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  title: string;
};
export default function GenericCard({
  width,
  height,
  value,
  onButtonPress,
  padding,
  margin,
  text,
  maxHeight,
  maxWidth,
  title,
}: props) {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        padding: padding,
        margin: margin,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
      }}
    >
      <Typography sx={{ textAlign: "center" }}>{title}</Typography>
      <Card variant="outlined">
        <Slider val={value} text={text} />
        <Button onClick={onButtonPress} />
      </Card>
    </Box>
  );
}
