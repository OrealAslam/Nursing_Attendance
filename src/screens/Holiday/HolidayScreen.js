import {View, Dimensions, Alert, ImageBackground} from 'react-native';
import React, {useState, useEffect} from 'react';
import HolidayHeader from './components/HolidayHeader';
import {MainContent} from './holidaystyles';
import HolidayFooter from './components/HolidayFooter';
import {leave_request, get_user_leave_request} from '../../Helper/AppHelper';
import {useIsFocused} from '@react-navigation/native';
import HolidayCalender from './components/HolidayCalender';

const {width, height} = Dimensions.get('window');
const buttonWidth = width - 60;
const buttonRatio = buttonWidth / 1236;

const HolidayScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [submitRequest, setsubmitRequest] = useState('submit');
  const [loader, setloader] = useState(false);
  const [calenderloader, setcalenderloader] = useState(true);
  const [selected, setselected] = useState('');
  const [markedDates, setmarkedDates] = useState({});

  useEffect(() => {
    (async () => {
      let data = await get_user_leave_request();
      let md = objectify(data.data);
      setmarkedDates(md);
      setcalenderloader(false);
    })();
  }, [isFocused]);

  const objectify = arr => {
    let markedData = {};
    if (arr.length > 0) {
      arr.forEach((item, index) => {
        let cond = item.status;
        let date = item.date;

        var innerObject = {};
        if(cond == 0 ){innerObject['color'] = '#6AD239'}
        if(cond == 1 ){innerObject['color'] = '#74CAE3'}
        if(cond == 2 ){innerObject['color'] = '#FF3366'}
        innerObject['startingDay'] = true;
        innerObject['textColor'] = '#fff';
        innerObject['endingDay'] = index == arr.length - 1 ? true : false;
        markedData[date] = innerObject; // You can assign any value you want here
      });

      return markedData;
    }
    return;
  };

  const navigateScreen = screenName => {
    navigation.navigate(screenName);
  };

  const submit_leave_request = async () => {
    if (global.DateArray.length < 1) {
      Alert.alert(
        'Warning',
        'Select atleast single date to submit leave request',
      );
    } else {
      setloader(true);
      let response = await leave_request(global.DateArray);
      if (response.status == 'successfully') {
        Alert.alert('Success', response.message);
      }
      if (response.status == 'error') {
        Alert.alert(
          'Error',
          'Unable to submit holiday request. Try adain later!',
        );
        setloader(false);
      }
    }
    setloader(false);
  };

  return (
    <ImageBackground
      style={{width: width, height: height}}
      source={require('../../assets/appbackground.png')}>
      <HolidayHeader navigateScreen={navigateScreen} />

      <View style={[MainContent.container, {paddingVertical: 10}]}>
        <HolidayCalender markedDates={markedDates} />
        <HolidayFooter />
      </View>
    </ImageBackground>
  );
};
export default HolidayScreen;
