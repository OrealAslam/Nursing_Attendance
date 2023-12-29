import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CalenderHeader from './components/CalenderHeader';
import CalenderBody from './components/CalenderBody';
import moment from 'moment';

const NativeCalender = (props: any) => {
  const [dt, setdt] = useState(new Date());
  const [currentyear, setcurrentyear] = useState(dt.getFullYear());
  const [currentmonth, setcurrentmonth] = useState(dt.getMonth());
  const [totaldaysinmonth, settotaldaysinmonth] = useState(0);
  const [startdayofmonth, setstartdayofmonth] = useState(0);
  const [lastdayofmonth, setlastdayofmonth] = useState(0);
  const [dateArray, setdateArray] = useState([]);
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

  let arr: any = dateArray;

  const startOfMonth = (date: any) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  useEffect(() => {
    // starting day of month
    let totaldays = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
    settotaldaysinmonth(totaldays);
    setstartdayofmonth(startOfMonth(dt).getDay());

    // end day of month
    let lastday = moment().endOf('month').format('d');
    setlastdayofmonth(parseInt(lastday));
  }, []);

  useEffect(() => {
    let history:any = [];
    // populate dateArray with history data  
    if (props.holidayHistory.length > 0) {
      props.holidayHistory.map((item: any, index: any) => {
        history.push(item.date);
      });
      setdateArray(history);
    }
    console.log(history)
  }, [props.holidayHistory]);

  useEffect(() => {
    let totaldays = new Date(currentyear, currentmonth + 1, 0).getDate();
    // starting day of month
    settotaldaysinmonth(totaldays);
    let firstDay = new Date(currentyear, currentmonth, 1);
    let lastDay = new Date(currentyear, currentmonth + 1, 0);
    setstartdayofmonth(firstDay.getDay());

    // end day of month
    setlastdayofmonth(lastDay.getDay());
  }, [currentmonth, currentyear]);

  const prevMonth = () => {
    if (currentmonth == 0) {
      setcurrentmonth(11);
      setcurrentyear(currentyear - 1);
    } else {
      setcurrentmonth(currentmonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentmonth == 11) {
      setcurrentmonth(0);
      setcurrentyear(currentyear + 1);
    } else {
      setcurrentmonth(currentmonth + 1);
    }
  };

  const filterArray = (date: any) => {
    if (arr.includes(date)) {
      // remove from array
      var index = arr.indexOf(date);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    } else {
      arr.push(date);
      return arr;
    }
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
        currentmonth={currentmonth}
        currentyear={currentyear}
        highlightDate={dateArray}
        setdateArray={(date: any) => {
          setdateArray(filterArray(date));
        }}
        history={props.holidayHistory}
      />
    </View>
  );
};

export default NativeCalender;
