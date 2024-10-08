import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

interface IArrowIconProps {
  fill?: string;
  style?: object;
  width?: number;
  height?: number;
}

const Arrow = (props: IArrowIconProps) => {
  const { fill = "#fff", ...rest } = props;

  return (
    <Svg
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      {...rest}
    >
      <G
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill={fill}
        stroke="none"
        {...rest}
      >
        <Path
          d="M370 4061 c-61 -20 -102 -51 -211 -160 -97 -97 -120 -126 -137 -174
-28 -73 -28 -131 -1 -204 20 -56 71 -108 1203 -1241 874 -875 1193 -1188 1226
-1204 70 -34 146 -36 217 -4 53 24 167 136 1230 1204 816 820 1178 1191 1195
1222 18 35 23 61 23 120 0 107 -22 144 -175 294 -110 109 -133 126 -180 140
-72 21 -118 20 -187 -5 -55 -20 -102 -65 -1036 -998 l-977 -976 -978 976
c-677 676 -989 982 -1017 995 -43 20 -154 28 -195 15z"
        />
      </G>
    </Svg>
  );
};

export default Arrow;
