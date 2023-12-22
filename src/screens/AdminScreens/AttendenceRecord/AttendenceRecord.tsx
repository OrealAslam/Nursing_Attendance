import {
  View,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PageHeader from './components/PageHeader';
import PageContent from './components/PageContent';
import {MainContent} from '../AssignedStaff/styles';

const {width, height} = Dimensions.get('window');

const AttendenceRecord = ({navigation}: {navigation: any}) => {
  const [item, setitem] = useState(['Day Shift', 'Night Shift', 'Both']);
  const [select, setselect] = useState('all');

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  return (
    <ImageBackground
      style={{width: width, height: height}}
      source={require('../../../assets/appbackground.png')}>
      <PageHeader navigateScreen={navigateScreen} setselect={setselect} select={select} />

      <View style={[MainContent.container, {paddingVertical: 10}]}>
        {item.length > 0 ? (
          <View style={{marginTop: 20}}>
            <PageContent select={select} />
          </View>
        ) : (
          <ActivityIndicator size={'large'} color={'#000'} />
        )}
      </View>
    </ImageBackground>
  );
};

export default AttendenceRecord;
