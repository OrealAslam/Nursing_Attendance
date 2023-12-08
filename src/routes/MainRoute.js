import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import HolidayScreen from '../screens/Holiday/HolidayScreen';
import HistoryScreen from '../screens/History/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function MainRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="HolidayScreen"
        component={HolidayScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{headerShown: false, animationenabled: false}}
      />
    </Stack.Navigator>
  );
}
