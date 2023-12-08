import {View, Text} from 'react-native';
import React from 'react';
import PageHeader from './components/PageHeader';

const AttendenceRecord = ({navigation}: {navigation: any}) => {
  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };
  
  return (
    <View>
      <PageHeader navigateScreen={navigateScreen} />
    </View>
  );
};

export default AttendenceRecord;
