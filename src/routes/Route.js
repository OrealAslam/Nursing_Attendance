import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MainRoute from './MainRoute';

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="MainRoute"
        component={MainRoute}
        options={{headerShown: false, animationenabled: false}}
      />
    </Stack.Navigator>
  );
}
