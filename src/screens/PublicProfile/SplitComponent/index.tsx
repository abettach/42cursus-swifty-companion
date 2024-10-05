import React from "react";
import { View, Text, ViewStyle } from "react-native";

interface ISplitComponentProps {
  title: string;
}

const SplitComponent = (props: ISplitComponentProps) => {
  const { title } = props;
  return (
    <View style={SPLIT_BAR_STYLE}>
      <View style={SPLIT_BAR_RIGHT_STYLE}>
        <Text style={{ color: "white", fontSize: 14, fontWeight: 700 }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default SplitComponent;

const SPLIT_BAR_STYLE: ViewStyle = {
  width: "100%",
  height: 10,
  backgroundColor: "#246EE9",
  marginBottom: 40,
};

const SPLIT_BAR_RIGHT_STYLE: ViewStyle = {
  width: "20%",
  height: 30,
  backgroundColor: "#246EE9",
  borderBottomRightRadius: 20,
  alignItems: "center",
  justifyContent: "center",
};
