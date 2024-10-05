import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageStyle,
  ViewStyle,
  Text,
  Pressable,
  TextStyle,
} from "react-native";
import * as Secure from "expo-secure-store";
import * as Updates from "expo-updates";

import AppBackgorund from "@/assets/images/app-background.png";
import SearchBar from "@/components/moleculs/SearchBar";
import UsersCard from "@/components/moleculs/UsersCard";
import usersQuery from "@/api/Users";
import { MainStackParamList } from "@/navigation/MainStack";

interface IHomeProps {
  navigation: NativeStackNavigationProp<MainStackParamList>;
}

const BackroundImage = () => {
  return <Image source={AppBackgorund} style={BACKGROUND_IMAGE_STYLE} />;
};

const Home = (props: Readonly<IHomeProps>) => {
  const { navigation } = props;

  const [search, setSearch] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = async (text: string) => setSearch(text.trim());

  const onSearchClick = async () => {
    setIsLoading(true);
    try {
      const response = await usersQuery({ search });

      const { status, data } = response;

      setUsersData(status === 1 ? data : []);
    } catch (error) {
      setUsersData([]);
    }
    setIsLoading(false);
  };

  const LoadingComponent = () => {
    return (
      <View style={LOADING_CONTAINER_STYLE}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  };

  const NotFound = () => {
    return (
      <View style={NOT_FOUND_CONTAINER_STYLE}>
        <Text style={NOT_FOUND_TEXT_STYLE}>User not found</Text>
      </View>
    );
  };

  const LogoutButton = () => {
    return (
      <View style={LOGOUT_BUTTON_CONTAINER_STYLE}>
        <Pressable
          onPress={async () => {
            await Secure.deleteItemAsync("session");
            Updates.reloadAsync();
          }}
        >
          <View style={LOGOUT_TEXT_CONTAINER_STYLE}>
            <Text style={LOGOUT_TEXT_STYLE}>Logout</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <BackroundImage />
      <View style={HOME_STYLE_CONTAINER}>
        <LogoutButton />
        <SearchBar onChange={onChange} onSearchClick={onSearchClick} />
        {!isLoading && Array.isArray(usersData) && usersData.length === 0 && (
          <NotFound />
        )}
        <View style={CONTAINER_STYLE}>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <ScrollView
              style={USERS_CARD_CONTAINER}
              contentContainerStyle={{ paddingBottom: 200 }}
            >
              {usersData?.map((user) => (
                <UsersCard
                  key={user?.login}
                  data={user}
                  navigation={navigation}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
};

export default Home;

const HOME_STYLE_CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: "center",
};

const CONTAINER_STYLE: ViewStyle = {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
};

const LOADING_CONTAINER_STYLE: ViewStyle = {
  justifyContent: "center",
  position: "absolute",
  top: 150,
  alignItems: "center",
};

const USERS_CARD_CONTAINER: ViewStyle = {
  width: "100%",
  paddingHorizontal: 20,
  alignContent: "center",
};

const BACKGROUND_IMAGE_STYLE: ImageStyle = {
  width: "100%",
  height: "100%",
  flex: 1,
  resizeMode: "cover",
  position: "absolute",
  zIndex: -1,
  top: 0,
};

const NOT_FOUND_CONTAINER_STYLE: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  paddingTop: "50%",
};

const NOT_FOUND_TEXT_STYLE: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
  color: "gray",
  opacity: 0.5,
};

const LOGOUT_BUTTON_CONTAINER_STYLE: ViewStyle = {
  width: "100%",
  height: 40,
  marginTop: 70,
  alignItems: "flex-end",
  paddingHorizontal: 20,
};

const LOGOUT_TEXT_CONTAINER_STYLE: ViewStyle = {
  width: 80,
  height: 40,
  backgroundColor: "#694BFD",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 5,
};

const LOGOUT_TEXT_STYLE: TextStyle = {
  fontSize: 16,
  color: "white",
  fontWeight: "bold",
};
