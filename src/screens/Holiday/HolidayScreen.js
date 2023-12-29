import {View, Dimensions, Alert, ImageBackground, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import HolidayHeader from './components/HolidayHeader';
import {MainContent} from './holidaystyles';
import HolidayFooter from './components/HolidayFooter';
import {leave_request, get_user_leave_request} from '../../Helper/AppHelper';
import {useIsFocused} from '@react-navigation/native';
import HolidayCalender from './components/HolidayCalender';
import moment from 'moment';

const {width, height} = Dimensions.get('window');
const buttonWidth = width - 60;
const buttonRatio = buttonWidth / 1236;

const HolidayScreen = ({navigation}) => {
  let DATE_ARRAY = [];
  const isFocused = useIsFocused();
  const [loader, setloader] = useState(true);
  const [calenderloader, setcalenderloader] = useState(true);
  const [markedDates, setmarkedDates] = useState({});
  const [datepressed, setdatepressed] = useState('');

  useEffect(() => {
    (async () => {
      let data = await get_user_leave_request();
      if(data.status == 'success') {
        let md = objectify(data.data);
        setmarkedDates(md);
        setloader(false);
        console.log(data)
      }
    })();
  }, [isFocused, loader]);

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
    if (DATE_ARRAY.length < 1) {
      Alert.alert(
        'Warning',
        'Select atleast single date to submit leave request',
      );
    } else {
      setloader(true);
      let response = await leave_request(DATE_ARRAY);
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

  const check_for_already_selected = (dateString) => {
    const index = DATE_ARRAY.indexOf(dateString);
    if (index != -1) {
      // If entry exists in the array, remove it
      DATE_ARRAY.splice(index, 1);
    } else {
      // If entry does not exist in the array, add it
      DATE_ARRAY.push(dateString);
    }
    console.log('selecteddays', DATE_ARRAY);
  }


  return (
    <ImageBackground
      style={{width: width, height: height}}
      source={require('../../assets/appbackground.png')}>
      <HolidayHeader navigateScreen={navigateScreen} />
      <View style={[MainContent.container, {paddingVertical: 10}]}>
        {
          loader == true ? (<ActivityIndicator size={'large'} color={'#e4e4e4'}/>) : (<>
            <HolidayCalender markedDates={markedDates} check_for_already_selected={check_for_already_selected} />
            <HolidayFooter submit_leave_request={submit_leave_request} />
            </>)
        }
      </View>
    </ImageBackground>
  );
};
export default HolidayScreen;
