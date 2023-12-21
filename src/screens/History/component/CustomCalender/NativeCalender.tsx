import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import CalenderHeader from './components/CalenderHeader';
import CalenderBody from './components/CalenderBody';
import moment from 'moment';

const NativeCalender = () => {
  const [currentyear, setcurrentyear] = useState(0);
  const [currentmonth, setcurrentmonth] = useState(0);
  const [totaldaysinmonth, settotaldaysinmonth] = useState(0);
  const [startdayofmonth, setstartdayofmonth] = useState(0);
  const [lastdayofmonth, setlastdayofmonth] = useState(0);
  const monthArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const startOfMonth = (date: any) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  useEffect(() => {
    const dt = new Date();
    setcurrentyear(dt.getFullYear());
    setcurrentmonth(dt.getMonth());

    // starting day of month
    let totaldays = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
    settotaldaysinmonth(totaldays);
    setstartdayofmonth(startOfMonth(dt).getDay());

    // end day of month
    let lastday = moment().endOf('month').format('d');
    setlastdayofmonth(parseInt(lastday));
  }, [currentyear, currentmonth]);

  const datePressed = (date: any) => {
    console.log('first', date);
  };

  const prevMonth = () => {
    return ;
    // if(currentmonth > 0) {
    //     console.log('called')
        // setcurrentmonth(currentmonth - 1);
    // }
    // else{ return; }
  };

  const nextMonth = () => {
    // if(currentmonth < 11) {
    //     setcurrentmonth(currentmonth + 1);
    // }
    // else{ return; }
    return;
  };

  return (
    <View style={{borderBottomColor: '#959595'}}>
      <CalenderHeader
        currentyear={currentyear}
        currentmonth={monthArray[currentmonth]}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <CalenderBody
        totaldaysinmonth={totaldaysinmonth}
        startdayofmonth={startdayofmonth}
        lastdayofmonth={lastdayofmonth}
        datePressed={datePressed}
      />
    </View>
  );
};

export default NativeCalender;
