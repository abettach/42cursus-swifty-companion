import React from "react";
import {
  View,
  Text,
  Image,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";

interface IAvatarProps {
  firstName: string;
  lastName: string;
  style?: ViewStyle;
  textStyle?: ViewStyle;
  image?: ImageSourcePropType;
}

const Avatar = (props: IAvatarProps) => {
  const { firstName, lastName, style, textStyle, image } = props;

  return (
    <View style={[AVATAR_CONTAINER_STYLE, style]}>
      {image ? (
        <Image source={image} style={[{ width: "100%", height: "100%" }]} />
      ) : (
        <Text
          style={[{ color: "white", fontSize: 20, fontWeight: 700 }, textStyle]}
        >
          {firstName[0]}
          {lastName[0]}
        </Text>
      )}
    </View>
  );
};

export default Avatar;

const AVATAR_CONTAINER_STYLE: ViewStyle = {
  width: 50,
  height: 50,
  borderRadius: 1000,
  backgroundColor: "#694BFD",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};
