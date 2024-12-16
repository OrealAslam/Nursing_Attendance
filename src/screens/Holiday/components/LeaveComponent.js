import {
  View,
  Dimensions,
  Alert,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  Text
} from 'react-native';
import React, { useState, useEffect } from 'react';
import HolidayHeader from './components/HolidayHeader';
import { MainContent } from './holidaystyles';
import HolidayFooter from './components/HolidayFooter';
import { leave_request, get_user_leave_request } from '../../Helper/AppHelper';
import { useIsFocused } from '@react-navigation/native';
import NativeCalender from './components/NativeCalender';
import { Calendar } from 'react-native-calendars';
// import HolidayCalender from './components/HolidayCalender';

const { width, height } = Dimensions.get('window');
const buttonWidth = width - 60;
const buttonRatio = buttonWidth / 1236;

let updatedDateArr = [];

const HolidayScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [loader, setloader] = useState(true);
  const [markedDates, setmarkedDates] = useState([]);
  const [datepressed, setdatepressed] = useState('');
  const [holidayHistory, setholidayHistory] = useState({});
  const [selectedDates, setSelectedDates] = useState({});
//   const [swapcalendar, setswapcalendar] = useState(false);

  useEffect(() => {
    (async () => {
      let data = await get_user_leave_request();
      if (data.status == 'success') {
        setMarkDates(data.data);
        // setswapcalendar(true);
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
    if (updatedDateArr.length < 1) {
      Alert.alert(
        'Warning',
        'Select atleast single date to submit leave request',
      );
    } else {
      setloader(true);

      let response = await leave_request(updatedDateArr);
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

  // Handle selecting and deselecting dates
  const onDayPress = (day) => {
    const dateKey = day.dateString;

    const index = updatedDateArr.indexOf(dateKey);
    if (index > -1) { // only splice array when item is found
      updatedDateArr.splice(index, 1); // 2nd parameter means remove one item only
    }
    setSelectedDates((prevDates) => {
      // Toggle the date selection
      if (prevDates[dateKey]) {
        const updatedDates = { ...prevDates };
        delete updatedDates[dateKey];
        return updatedDates;
      } else {
        updatedDateArr.push(dateKey);
        // setholidayHistory
        return {
          ...prevDates,
          [dateKey]: { selected: true, selectedColor: 'blue' },
        };
      }
    });
  };

  // Process the data and set marked dates
  const setMarkDates = (data) => {
    const marked = {};

    data.forEach((item) => {
      const backgroundColor =
        item.status === 0
          ? 'green'
          : item.status === 1
            ? 'blue'
            : 'red';

      marked[item.date] = {
        selected: true,
        selectedColor: backgroundColor,
      };
    });

    setMarkedDates(marked);
  };


  return (
    <ImageBackground
      style={{ width: width, height: height }}
      source={require('../../assets/appbackground.png')}>
      <HolidayHeader navigateScreen={navigateScreen} />
      <View style={[MainContent.container, { paddingVertical: 10, paddingHorizontal: 15 }]}>
        {loader == true ? (
          <ActivityIndicator size={'large'} color={'#e4e4e4'} />
        ) : (
        // swapcalendar
          <>
            <NativeCalender
              holidayHistory={holidayHistory}
              setholidayHistory={setholidayHistory}
              setmarkedDates={setmarkedDates}
            />

            {/* <Calendar
              // Marked dates for multiple selection
              markedDates={{ ...markedDates, ...selectedDates }}
              onDayPress={onDayPress}
              theme={{
                todayTextColor: 'gray',
                selectedDayBackgroundColor: '#4dff4d',
                fontWeight: '500',
                fontSize: 14
              }}
            /> */}
            <HolidayFooter submit_leave_request={submit_leave_request} />
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedDatesContainer: {
    marginTop: 20,
  },
  selectedDatesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDateText: {
    fontSize: 14,
    color: '#4dff4d',
  },
  noDatesText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default HolidayScreen;