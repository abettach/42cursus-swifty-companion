import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {getFontFamily} from '../../utils';
import {authorize} from 'react-native-app-auth';
import Config from 'react-native-config';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const config: any = {
  issuer: 'https://api.intra.42.fr',
  clientId: Config.REACT_NATIVE_CLIENT_ID,
  clientSecret: Config.REACT_NATIVE_CLIENT_SECRET,
  redirectUrl: 'swiftyCompanion://redirect',
  serviceConfiguration: {
    authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
    tokenEndpoint: 'https://api.intra.42.fr/oauth/token',
  },
};

const Login = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  console.log('Config', config);

  const handleLogin = async () => {
    try {
      const result = await authorize(config);
      const accessToken = result.accessToken;
      // Store the access token securely and navigate
      navigation.navigate('Search', {token: accessToken});
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  return (
    <View style={LOGIN_CONTAINER}>
      <Image
        source={require('../../assets/images/42background.jpg')}
        style={IMG_STYLE}
      />
      <TouchableOpacity style={BUTTON_STYLE} onPress={handleLogin}>
        <View>
          <Text style={TEXT_STYLE}>Sign In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const LOGIN_CONTAINER: any = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'red',
  fontFamily: getFontFamily('bold'),
};

const BUTTON_STYLE: any = {
  backgroundColor: '#00BABC',
  color: 'white',
  width: '80%',
  height: 50,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
};

const IMG_STYLE: any = {
  width: '100%',
  height: '100%',
  position: 'absolute',
};

const TEXT_STYLE: any = {
  color: 'white',
  fontSize: 18,
  fontFamily: getFontFamily('bold'),
};
