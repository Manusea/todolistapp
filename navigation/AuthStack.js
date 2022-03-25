import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
    
         <Stack.Navigator initialRouteName="Login">
            <Stack.Screen component={LoginScreen} name="Login" options={{ headerShown: false }} />
            <Stack.Screen component={RegisterScreen} name="RegisterScreen" options={{ headerShown: false }} />
          </Stack.Navigator>
      );

};

export default AuthStack;