import React from "react";
import { Svg, Path } from "react-native-svg";

interface ISearchIconProps {
  fill?: string;
  stroke?: string;
}

const Search = (props: ISearchIconProps) => {
  const { fill = "none", stroke = "#FFF", ...rest } = props;
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={fill} {...rest}>
      <Path
        d="M20.925 19.925L16.6182 15.6182M16.6182 15.6182C17.3549 14.8815 17.9392 14.0069 18.3379 13.0444C18.7366 12.0818 18.9418 11.0502 18.9418 10.0083C18.9418 8.96649 18.7366 7.93484 18.3379 6.9723C17.9392 6.00976 17.3549 5.13518 16.6182 4.39848C15.8815 3.66178 15.0069 3.0774 14.0443 2.6787C13.0818 2.28001 12.0502 2.0748 11.0083 2.0748C9.96646 2.0748 8.93481 2.28001 7.97227 2.6787C7.00973 3.0774 6.13514 3.66178 5.39845 4.39848C3.91062 5.88631 3.07477 7.90423 3.07477 10.0083C3.07477 12.1124 3.91062 14.1304 5.39845 15.6182C6.88627 17.106 8.9042 17.9419 11.0083 17.9419C13.1124 17.9419 15.1303 17.106 16.6182 15.6182Z"
        stroke={stroke}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Search;
