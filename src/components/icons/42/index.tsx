import React from "react";
import { Svg, Path } from "react-native-svg";

interface IFortyTwoIconProps {
  fill?: string;
  style?: object;
}

const FortyTwo = (props: IFortyTwoIconProps) => {
  const { fill = "#000", style } = props;
  return (
    <Svg viewBox="0 -200 960 960" fill={fill} style={style}>
      <Path d="M32 412.6L362.1 412.6 362.1 578 526.8 578 526.8 279.1 197.3 279.1 526.8 -51.1 362.1 -51.1 32 279.1z"></Path>
      <Path d="M597.9 114.2L762.7 -51.1 597.9 -51.1z"></Path>
      <Path d="M762.7 114.2L597.9 279.1 597.9 443.9 762.7 443.9 762.7 279.1 928 114.2 928 -51.1 762.7 -51.1z"></Path>
      <Path d="M928 279.1L762.7 443.9 928 443.9z"></Path>
    </Svg>
  );
};

export default FortyTwo;
