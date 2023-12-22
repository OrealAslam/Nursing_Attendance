import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

const HolidayCalender = (props: any) => {
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));

  return (
    <Calendar
      style={{width: '94%', alignSelf: 'center'}}
      // Specify the current date
      current={selected}
      // Callback that gets called when the user selects a day
      onDayPress={day => {
        console.log('selected day', day);
      }}
      // Mark specific dates as marked
      markingType={'period'}
      markedDates={props.markedDates}
    />
  );
};

export default HolidayCalender;
