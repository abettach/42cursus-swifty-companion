import React from "react";
import { View, Text, Pressable, ViewStyle, TextStyle } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Avatar from "@/components/atoms/Avatar";
import DefaultProfileImage from "@/assets/images/default-profile-image.jpg";
import { MainStackParamList } from "@/navigation/MainStack";

interface IUsersCardProps {
  navigation: NativeStackNavigationProp<MainStackParamList>;
  data: {
    login: string;
    displayname: string;
    image: {
      link: string;
    };
  };
}

const UsersCard = (props: IUsersCardProps) => {
  const { navigation, data } = props;

  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate("PublicProfile", {
            userId: data?.login,
            title: data?.displayname,
          });
        }}
        style={USER_CARD_STYLE}
      >
        <Avatar
          firstName={data?.displayname?.split(" ")[0]}
          lastName={data?.displayname?.split(" ")[1]}
          style={{
            width: 60,
            height: 60,
            marginLeft: 17,
            marginRight: 10,
          }}
          image={
            data?.image?.link ? { uri: data?.image?.link } : DefaultProfileImage
          }
        />
        <View style={CARD_TEXT_CONTAINER}>
          <Text style={CARD_NAME_STYLE}>{data?.displayname}</Text>
          <Text style={CATD_LOGIN_STYLE}>{data?.login}</Text>
        </View>
      </Pressable>
    </>
  );
};

export default UsersCard;

const USER_CARD_STYLE: ViewStyle = {
  backgroundColor: "rgba(247, 247, 247, 1)",
  width: "100%",
  height: 90,
  alignItems: "center",
  marginTop: 29,
  borderRadius: 10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.15,
  shadowRadius: 9.51,
  elevation: 5,
  flexDirection: "row",
};

const CARD_TEXT_CONTAINER: ViewStyle = {
  height: "40%",
  justifyContent: "space-between",
};

const CARD_NAME_STYLE: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  color: "rgba(0, 0, 0, 1)",
};

const CATD_LOGIN_STYLE: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  color: "#CCCCCC",
};
