import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import HolidayScreen from '../screens/Holiday/HolidayScreen';
import LeaveRequest from '../screens/LeaveRequest/LeaveRequest';
import HistoryScreen from '../screens/History/HistoryScreen';
import VitalSignScreen from '../screens/VitalSign/VitalSignScreen';
import NurseNotesScreen from '../screens/NurseNotes/NurseNotesScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';


const Stack = createNativeStackNavigator();

export default function NurseRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{headerShown: false, animationenabled: false}}
      />
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
        name="LeaveRequest"
        component={LeaveRequest}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="VitalSignScreen"
        component={VitalSignScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="NurseNotesScreen"
        component={NurseNotesScreen}
        options={{headerShown: false, animationenabled: false}}
      />
    </Stack.Navigator>
  );
}
