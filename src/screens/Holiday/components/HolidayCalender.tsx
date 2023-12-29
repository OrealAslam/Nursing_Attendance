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
      allowRangeSelection={true}
      // Callback that gets called when the user selects a day
      onDayPress={day => {
        props.check_for_already_selected(day.dateString);
      }}
      // Mark specific dates as marked
      markingType={'period'}
      markedDates={props.markedDates}
      minDate={moment().format('YYYY-MM-DD')}
      disableAllTouchEventsForDisabledDays={true}
      isMultiSelection={true}
    />
  );
};

export default HolidayCalender;