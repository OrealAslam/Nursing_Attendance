import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CardContainer} from '../historystyles';
import moment, {max} from 'moment';
import {Calendar} from 'react-native-calendars';
import Label from './Label';
import {CalenderDateStyle} from '../../../components/CalenderComponent/StyleHelper/CalenderDateStyle';
import NativeCalender from './CustomCalender/NativeCalender';

const HistoryContent = (props: any) => {
  const [historyData, sethistoryData] = useState(props.history);
  const [datepressed, setdatepressed] = useState(moment().format('YYYY-MM-DD'));
  const [result, setresult] = useState(null);

  const searchByCreatedAt = (array: any, date: string) => {
    return array.find((item: any) => item.created_at === date);
  };

  useEffect(() => {
    let response = searchByCreatedAt(props.history, datepressed);
    if (response != undefined) {
      setresult(response);
    } else {
      setresult({
        created_at: datepressed,
        staff_id: 1,
        status: 'Duty Time',
        time_duration: '00:00:00',
      });
    }
  }, [datepressed]);

  return (
    <View style={{width: '100%', alignSelf: 'center'}}>
      <Calendar
        current={moment().format('YYYY-MM-DD')}
        onDayPress={day => {
          setdatepressed(day.dateString);
        }}
        markingType="dot"
        enableSwipeMonths={true}
        shouldRasterizeIOS={true}
        // markedDates={{
        //   ['2023-12-13']: {
        //     selected: true,
        //     marked: true,
        //     disableTouchEvent: true,
        //   },
        //   ['2023-12-14']: {selected: true, marked: true, dotColor: '#6AD239'},
        //   ['2023-12-15']: {
        //     marked: true,
        //     dotColor: '#6AD239',
        //     disableTouchEvent: true,
        //   },
        //   ['2023-12-16']: {marked: true},
        //   ['2023-12-18']: {
        //     disabled: true,
        //     activeOpacity: 0,
        //     disableTouchEvent: false,
        //   },
        // }}
        theme={{
          textSectionTitleColor: '#000',
          todayBackgroundColor: '#0D20A1',
          todayButtonTextColor: '#fff',
          todayButtonFontWeight: '600',
        }}
      />

      {/* <NativeCalender /> */}
      <Label />

      {result != null ? (
        <View style={{width: '100%', padding: 10}}>
          <View style={CardContainer.card}>
            <View style={CardContainer.column1}>
              <Text style={CardContainer.status}>Absent</Text>
              <Text style={{color: '#646464', fontSize: 9, fontWeight: '600'}}>
                {moment(result['created_at']).format('DD, MMMM YYYY')}
              </Text>
            </View>

            <View style={CardContainer.column2}>
              <Text style={CardContainer.dutyTime}>
                {result['time_duration']}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
export default HistoryContent;
