import React, { useEffect } from "react";
import { View, Text, Image, ViewStyle, ImageStyle } from "react-native";
import { Pressable } from "react-native";
import { useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";

import { BASE_URL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "@env";
import AppBackgorund from "@/assets/images/app-background.png";
import { FortyTwoIcon } from "@/components/atoms/icons";
import loginMutation from "@/api/Login";

WebBrowser.maybeCompleteAuthSession();

const generateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const BackroundImage = () => {
  return <Image source={AppBackgorund} style={BACKGROUND_IMAGE_STYLE} />;
};
const Login = () => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
    },
    {
      authorizationEndpoint: `${BASE_URL}/oauth/authorize`,
      tokenEndpoint: `${BASE_URL}/oauth/token`,
    }
  );

  useEffect(() => {
    const handlGetAcessToken = async (code) => {
      const credentials = {
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI,
        state: generateRandomString(50),
      };

      try {
        const result = await loginMutation(credentials);

        const { status, data } = result;

        if (status === 1 && data) {
          await SecureStore.setItemAsync("session", JSON.stringify(data));
          Updates.reloadAsync();
        }
      } catch {}
    };
    if (response?.type === "success") {
      const { code } = response.params;
      handlGetAcessToken(code);
    }
  }, [response]);

  return (
    <View style={LOGIN_CONTAINER_STYLE}>
      <BackroundImage />
      <View style={LOGIN_BUTTON_CONTAINER_STYLE}>
        <Pressable
          style={LOGIN_BUTTON_STYLE}
          onPress={() => promptAsync({ showInRecents: true })}
        >
          <Text style={{ fontSize: 22, fontWeight: 700 }}>Sing in with</Text>
          <FortyTwoIcon
            style={{
              right: 0,
              width: 40,
              height: 40,
              marginLeft: 10,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const BACKGROUND_IMAGE_STYLE: ImageStyle = {
  width: "100%",
  height: "100%",
  flex: 1,
  resizeMode: "cover",
  position: "absolute",
  zIndex: -1,
  top: 0,
};

const LOGIN_CONTAINER_STYLE: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};

const LOGIN_BUTTON_CONTAINER_STYLE: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  width: "80%",
  height: 60,
};

const LOGIN_BUTTON_STYLE: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "#F7F7F7",
  width: "100%",
  height: 60,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.32,
  shadowRadius: 5.46,
};
