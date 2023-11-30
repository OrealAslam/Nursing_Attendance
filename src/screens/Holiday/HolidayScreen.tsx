import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HolidayHeader from './components/HolidayHeader';
import {MainContent} from './holidaystyles';
import HolidayFooter from './components/HolidayFooter';
import Calender from '../../components/CalenderComponent/Calender';
import {leave_request, get_user_leave_request} from '../../Helper/AppHelper';
import {useIsFocused} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const buttonWidth = width - 40;
const buttonRatio = buttonWidth / 1232;

const HolidayScreen = ({navigation}: {navigation: any}) => {
  const isFocused = useIsFocused();
  const [submitRequest, setsubmitRequest] = useState('submit');
  const [loader, setloader] = useState(false);
  const [calenderloader, setcalenderloader] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await get_user_leave_request();
      if (response.status == 'success') {
        global.DateArray = response.data;
      }
      setcalenderloader(false);
    })();
  }, [isFocused]);

  const navigateScreen = (screenName: any) => {
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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HolidayHeader navigateScreen={navigateScreen} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {calenderloader == true ? (
          <ActivityIndicator />
        ) : (
          <>
            <View style={MainContent.container}>
              <Calender />
            </View>

            <TouchableOpacity onPress={() => submit_leave_request()}>
              <Image
                style={{
                  width: buttonWidth,
                  height: 200 * buttonRatio,
                  alignSelf: 'center',
                  marginVertical: 15,
                }}
                source={require('../../assets/submit.png')}
              />
            </TouchableOpacity>
            <HolidayFooter />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HolidayScreen;
