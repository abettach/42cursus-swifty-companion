import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../../screens/Home';

const mainStack = createNativeStackNavigator<any>();

const MainStack = () => {
  return (
    <mainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <mainStack.Screen name="Home" component={Home} />
    </mainStack.Navigator>
  );
};

export default MainStack;
