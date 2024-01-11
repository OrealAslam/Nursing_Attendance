import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CardContainer} from '../historystyles';
import moment from 'moment';
import Label from './Label';
import NativeCalender from './CustomCalender/NativeCalender';

const HistoryContent = (props: any) => {
  const [datepressed, setdatepressed] = useState(moment().format('YYYY-MM-DD'));
  const [result, setresult] = useState(null);

  const searchByCreatedAt = (array: any, date: string) => {
    return array.find((item: any) => item.created_at === date);
  };

  useEffect(() => {
    let response = searchByCreatedAt(props.history, datepressed);
    if (response != undefined) {
      console.log('RES', response)
      setresult(response);
      console.log('pressed', response)
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
      <NativeCalender setdatepressed={setdatepressed} highlightDate={datepressed} history={props.history} />
      <Label />

      {result != null ? (
        <View style={{width: '100%', padding: 10}}>
          <View style={[CardContainer.card, (result['time_duration'] != '00:00:00') || (result['status'] == 'free Day') ? {borderLeftColor: '#74CAE3'} : {borderLeftColor: '#FF3366'}]}>
            <View style={CardContainer.column1}>
              <Text style={CardContainer.status}>{(result['time_duration'] != '00:00:00') || (result['status'] == 'free Day') ? 'Present' : 'Absent'}</Text>
              <Text style={{color: '#646464', fontSize: 9, fontWeight: '600'}}>
                {moment(result['created_at']).format('DD, MMMM YYYY')}
              </Text>
            </View>

            <View style={CardContainer.column2}>
              <Text style={[CardContainer.dutyTime, (result['time_duration'] != '00:00:00') || (result['status'] == 'free Day') ? {color: '#74CAE3'}: {color: '#FF3366'}]}>
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
