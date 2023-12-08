import {View} from 'react-native';
import React, {useState} from 'react';
import AdminDashboardHeader from './components/AdminDashboardHeader';
import StartTimerModel from '../../../components/StartTimerModel';
import {useIsFocused} from '@react-navigation/native';
import AdminDashboardContent from './components/AdminDashboardContent';

const AdminDshboard = ({navigation}: {navigation: any}) => {

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#0F1E70'}}>
      <AdminDashboardHeader navigateScreen={navigateScreen} />

      <AdminDashboardContent navigateScreen={navigateScreen}/>
    </View>
  );
};
export default AdminDshboard;
