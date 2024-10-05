import React from "react";
import { View, TextInput, Pressable, ViewStyle } from "react-native";

import { SearchIcon } from "@/components/atoms/icons";

interface ISearchBarProps {
  onChange: (text: string) => void;
  onSearchClick: () => void;
}

const SearchBar = (props: ISearchBarProps) => {
  const { onChange, onSearchClick } = props;

  return (
    <View style={SEARCH_CONTAINER_STYLE}>
      <TextInput
        placeholder="Type to search..."
        style={{ paddingHorizontal: 24 }}
        onChangeText={onChange}
        onSubmitEditing={onSearchClick}
      />
      <Pressable style={ICON_STYLE} onPress={onSearchClick}>
        <View>
          <SearchIcon />
        </View>
      </Pressable>
    </View>
  );
};

export default SearchBar;

const SEARCH_CONTAINER_STYLE: ViewStyle = {
  backgroundColor: "white",
  width: "90%",
  height: 50,
  borderRadius: 45,
  position: "relative",
  justifyContent: "center",
  elevation: 5,
  marginTop: 10,
};

const ICON_STYLE: ViewStyle = {
  position: "absolute",
  backgroundColor: "#694BFD",
  borderRadius: 50,
  width: 42,
  height: 42,
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  marginRight: 5,
};
