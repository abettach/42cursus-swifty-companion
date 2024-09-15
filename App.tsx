/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStack from './src/navigation/MainStack';
import AuthStack from './src/navigation/AuthStack';

const App = () => {
  const isAuth = false;

  return (
    <NavigationContainer>
      {isAuth ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
