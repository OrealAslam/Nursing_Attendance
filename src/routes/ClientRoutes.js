import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ClientDashboard from '../screens/ClientPortal/Dashboard/ClientDashboard';
import VitalSignScreen from '../screens/ClientPortal/VitalSign/VitalSignScreen';
import NurseNotesScreen from '../screens/ClientPortal/NurseNotes/NurseNotesScreen';
import ProfileScreen from '../screens/ClientPortal/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function NurseRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ClientDashboard"
        component={ClientDashboard}
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
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false, animationenabled: false}}
      />
    </Stack.Navigator>
  );
}
