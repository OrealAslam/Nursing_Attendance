import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminDshboard from '../screens/AdminScreens/Dashboard/AdminDshboard';
import ProfileScreen from '../screens/AdminScreens/Profile/ProfileScreen';
import AssignStaff from '../screens/AdminScreens/AssignedStaff/AssignStaff';
import ViewDuties from '../screens/AdminScreens/ViewDuty/ViewDuties';
import AttendenceRecord from '../screens/AdminScreens/AttendenceRecord/AttendenceRecord';
const Stack = createNativeStackNavigator();

export default function AdminRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminDshboard"
        component={AdminDshboard}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="AssignStaff"
        component={AssignStaff}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="ViewDuties"
        component={ViewDuties}
        options={{headerShown: false, animationenabled: false}}
      />
      <Stack.Screen
        name="AttendenceRecord"
        component={AttendenceRecord}
        options={{headerShown: false, animationenabled: false}}
      />
    </Stack.Navigator>
  );
}
