import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@/screens/Home";
import Profile from "@/screens/PublicProfile";

export type MainStackParamList = {
  Home: undefined;
  PublicProfile: {
    userId: string;
    title: string;
  };
};

const mainStack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <mainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <mainStack.Screen name="Home" component={Home} />
      <mainStack.Screen name="PublicProfile" component={Profile} />
    </mainStack.Navigator>
  );
};

export default MainStack;
