import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import LocationAccess from '../screens/LocationAccess';
import MainRoute from './MainRoute';
import AdminRoute from '../routes/AdminRoute';

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LocationAccess"
        component={LocationAccess}
        options={{headerShown: false, animationenabled: false}}
      />
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
      <Stack.Screen
        name="AdminRoute"
        component={AdminRoute}
        options={{headerShown: false, animationenabled: false}}
      />
    </Stack.Navigator>
  );
}
