import {
  View,
  Dimensions,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HolidayHeader from './components/HolidayHeader';
import {MainContent} from './holidaystyles';
import HolidayFooter from './components/HolidayFooter';
import {leave_request, get_user_leave_request} from '../../Helper/AppHelper';
import {useIsFocused} from '@react-navigation/native';
import NativeCalender from './components/NativeCalender';

const {width, height} = Dimensions.get('window');
const buttonWidth = width - 60;
const buttonRatio = buttonWidth / 1236;

const HolidayScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [loader, setloader] = useState(true);
  const [markedDates, setmarkedDates] = useState([]);
  const [datepressed, setdatepressed] = useState('');
  const [holidayHistory, setholidayHistory] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await get_user_leave_request();
      if (data.status == 'success') {
        setloader(false);
        setholidayHistory(data.data);
      } else {
        setloader(false);
        setholidayHistory([]);
      }
    })();
  }, [isFocused, loader]);

  const navigateScreen = screenName => {
    navigation.navigate(screenName);
  };

  const submit_leave_request = async () => {
    if (holidayHistory.length < 1) {
      Alert.alert(
        'Warning',
        'Select atleast single date to submit leave request',
      );
    } else {
      console.log('markedDates', markedDates);
      setloader(true);

      let response = await leave_request(markedDates);
      if (response.status == 'successfully') {
        Alert.alert('Success', response.message);
      }
      if (response.status == 'error') {
        Alert.alert(
          'Error',
          'Unable to submit holiday request. Try again later!',
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
        {loader == true ? (
          <ActivityIndicator size={'large'} color={'#e4e4e4'} />
        ) : (
          <>
            <NativeCalender
              holidayHistory={holidayHistory}
              setholidayHistory={setholidayHistory}
              setmarkedDates={setmarkedDates}
            />
            <HolidayFooter submit_leave_request={submit_leave_request} />
          </>
        )}
      </View>
    </ImageBackground>
  );
};
export default HolidayScreen;
