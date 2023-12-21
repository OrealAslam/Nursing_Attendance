import {ImageBackground, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import AdminDashboardHeader from './components/AdminDashboardHeader';
import {useIsFocused} from '@react-navigation/native';
import AdminDashboardContent from './components/AdminDashboardContent';

const {width, height} = Dimensions.get('window');
const AdminDshboard = ({navigation}: {navigation: any}) => {
  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={require('../../../assets/appbackground.png')}>
      <AdminDashboardHeader navigateScreen={navigateScreen} />

      <View
        style={{
          width: width,
          height: '100%',
          backgroundColor: '#eceefa',
          borderTopLeftRadius: 60,
          alignItems: 'center',
          paddingVertical: 20
        }}>
        <AdminDashboardContent navigateScreen={navigateScreen} />
      </View>
    </ImageBackground>
  );
};
export default AdminDshboard;
