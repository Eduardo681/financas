import React from 'react';
import {View, StatusBar} from 'react-native';
import firebase from './src/services/db';
import 'react-native-gesture-handler';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';
import {NavigationContainer} from '@react-navigation/native';
export default function financas() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#131313" barStyle="light=content" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
