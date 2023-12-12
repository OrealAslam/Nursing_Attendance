import {View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import PageHeader from './components/PageHeader';
import PageContent from './components/PageContent';

const AttendenceRecord = ({navigation}: {navigation: any}) => {
  const [item, setitem] = useState(['Day Shift', 'Night Shift', 'Both']);
  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{flex: 1}}>
      <PageHeader navigateScreen={navigateScreen} />
      {item.length > 0 ? (
        <View style={{marginTop: 20}}>
          <PageContent items={item} />
        </View>
      ) : (
        <ActivityIndicator size={'large'} color={'#000'} />
      )}
    </View>
  );
};

export default AttendenceRecord;
