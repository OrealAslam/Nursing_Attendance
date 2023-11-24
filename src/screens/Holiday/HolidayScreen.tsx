import {View, Image, TouchableOpacity, Dimensions, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import HolidayHeader from './components/HolidayHeader';
import Calender from './components/Calender';
import { MainContent } from './holidaystyles';
import HolidayFooter from './components/HolidayFooter';

const {width, height} = Dimensions.get('window');
const buttonWidth = width - 40;
const buttonRatio = buttonWidth / 1232;

const HolidayScreen = ({navigation}: {navigation: any}) => {
  const [submitRequest, setsubmitRequest] = useState('submit');

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HolidayHeader navigateScreen={navigateScreen} />

      <Calender />

      {
        submitRequest == 'approve' ? (<Text style={MainContent.statusMessage}>Your leave for $ days is Approved</Text>) :
        submitRequest == 'pending' ? (<Text style={MainContent.statusMessage}>Your request is pending</Text>) : (<Text style={MainContent.statusMessage}>indicate the desired holiday dates</Text>)
      }

      <TouchableOpacity onPress={() => setsubmitRequest('pending')}>
        {submitRequest == 'pending' ? (
          <Image style={{width: buttonWidth, height: 200 * buttonRatio, alignSelf: 'center', marginVertical: 15}} source={require('../../assets/pending.png')} />
        ) : (
          <Image style={{width: buttonWidth, height: 200 * buttonRatio, alignSelf: 'center', marginVertical: 15}} source={require('../../assets/submit.png')} />
        )}
      </TouchableOpacity>

      <HolidayFooter />
    </View>
  );
};

export default HolidayScreen;
