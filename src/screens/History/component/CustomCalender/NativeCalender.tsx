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
    // starting day of month
    let totaldays = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
    settotaldaysinmonth(totaldays);
    setstartdayofmonth(startOfMonth(dt).getDay());

    // end day of month
    let lastday = moment().endOf('month').format('d');
    setlastdayofmonth(parseInt(lastday));

  }, []);

  useEffect(()=>{
    let totaldays = new Date(currentyear, currentmonth + 1, 0).getDate();
    if(currentmonth == 0) {
      setcurrentmonth(11);
      setcurrentyear(currentyear - 1);
    }
    // starting day of month
    settotaldaysinmonth(totaldays);
    let firstDay = new Date(currentyear, currentmonth, 1);
    let lastDay = new Date(currentyear, currentmonth + 1, 0);
    // console.log('START DAY', firstDay.getDay());
    // console.log('LAST DAY', lastDay.getDay());
    setstartdayofmonth(firstDay.getDay());

    // end day of month
    setlastdayofmonth(lastDay.getDay());
    
  },[currentmonth, currentyear]);


  const prevMonth = () => {
    if(currentmonth == 0) {
      setcurrentmonth(11);
      setcurrentyear(currentyear - 1);
    }
    else{
      setcurrentmonth(currentmonth - 1);
    }
  };

  const nextMonth = () => {
    if(currentmonth == 11) {
      setcurrentmonth(0);
      setcurrentyear(currentyear + 1);
    }
    else{
      setcurrentmonth(currentmonth + 1);
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
        highlightDate={props.highlightDate}
        datePressed={(date: any) => { 
          props.setdatepressed(date)
        }}
        history={props.history}
      />
    </View>
  );
};

export default NativeCalender;
