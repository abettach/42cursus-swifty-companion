import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/Login';

const authStack = createNativeStackNavigator<any>();

const AuthStack = () => {
  return (
    <authStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <authStack.Screen name="SignIn" component={Login} />
    </authStack.Navigator>
  );
};

export default AuthStack;
