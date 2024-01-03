import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import NativeCalender from './component/NativeCalender';
import {get_user_leave_request} from '../../Helper/AppHelper';

const LeaveRequest = ({navigation}: {navigation: any}) => {
    const [holidayHistory, setholidayHistory] = useState([]);
  useEffect(() => {
    (async () => {
      let data = await get_user_leave_request();
      if (data.status == 'success') {
        setholidayHistory(data.data);
      } else{
        setholidayHistory([]);
      }
    })();
  }, []);
  return (
    <View>
      <NativeCalender holidayHistory={holidayHistory} />
    </View>
  );
};

export default LeaveRequest;
