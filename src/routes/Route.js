import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
// import LocationAccess from '../screens/LocationAccess';
import NurseRoute from './NurseRoute';
import AdminRoute from '../routes/AdminRoute';
import ClientRoute from '../routes/ClientRoutes';

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
        name="NurseRoute"
        component={NurseRoute}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="AdminRoute"
        component={AdminRoute}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="ClientRoute"
        component={ClientRoute}
        options={{headerShown: false, animationenabled: false}}
      />
    </Stack.Navigator>
  );
}
