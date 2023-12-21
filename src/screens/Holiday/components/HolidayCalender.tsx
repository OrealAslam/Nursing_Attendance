import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';

const HolidayCalender = (props: any) => {
  const [selected, setSelected] = useState('');

  // console.log('PROPS DATA', props.markedDates)
  return (
    <Calendar
      style={{width: '94%', alignSelf: 'center'}}
      // Specify the current date
      current={'2023-12-18'}
      // Callback that gets called when the user selects a day
      onDayPress={day => {
        console.log('selected day', day);
      }}
      // Mark specific dates as marked
      markingType={'period'}
      // markedDates={props.markedDates}
      markedDates={{
        ['2023-12-12']: {startingDay: true, color: '#FF3366', textColor: '#fff'},
        ['2023-12-21']: {startingDay: true, color: '#FF3366', textColor: '#fff'},
        ['2023-12-22']: {endingDay: true, color: '#6AD239', textColor: '#fff'},
        '2023-12-24': {startingDay: true, color: '#74CAE3', textColor: '#fff'},
        '2023-12-25': {color: '#74CAE3', textColor: '#fff'},
        '2023-12-26': {endingDay: true, color: '#74CAE3', textColor: '#fff'},
      }}
    />
  );
};

export default HolidayCalender;
