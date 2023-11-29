import {View, Text} from 'react-native';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import CalenderNavigator from './components/CalenderNavigator';
import DateComponent from './components/DateComponent';
import {nDays, days, months} from '../../Helper/AppHelper';
import {styles} from './StyleHelper/Style';

const Calender = (props: any) => {
  const [activeDate, setactiveDate] = useState(new Date());
  const [year, setyear] = useState(activeDate.getFullYear());
  const [month, setmonth] = useState(activeDate.getMonth());
  const [firstDay, setfirstDay] = useState(new Date(year, month, 1).getDay());
  const [datepressed, setdatepressed] = useState(activeDate.getDate());
  const [returndate, setreturndate] = useState(new Date());
  const [datecolor, setdatecolor] = useState('');

  useEffect(() => {
    let correctMonth = month + 1;
    let date = year + '-' + correctMonth + '-' + datepressed;
    setreturndate(new Date(date));
  }, [year, month, datepressed]);

  useEffect(() => {
    var maxDays = nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
  }, [activeDate]);

  const previousMonth = () => {
    setmonth(month - 1);
    if (month == 0) {
      setmonth(11);
      setyear(year - 1);
      setfirstDay(new Date(year, month, 1).getDay());
    } else {
      setfirstDay(new Date(year, month, 1).getDay());
    }
  };
  const nextMonth = () => {
    setmonth(month + 1);
    if (month == 11) {
      setmonth(0);
      setyear(year + 1);
      setfirstDay(new Date(year, month, 1).getDay());
    } else {
      setfirstDay(new Date(year, month, 1).getDay());
    }
  };
  const returnData = () => {
    let date = new Date(returndate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    props.changeDate(year + '-' + month + '-' + date.getDate());
    props.modalVisible(false);
  };

  const pressedDate = (date: any) => {
    manageDateInArray(`${year}-${month + 1}-${date}`, global.DateArray);
    setdatepressed(date);
  };

  // const getObjectByDate = (dateToFind: any) => {
  //   return global.DateArray.find((item:any) => item.date === dateToFind);
  // };

  const manageDateInArray = (dateString: any, array: any) => {
    const index = array.indexOf(dateString);

    if (index !== -1) {
      // If the date already exists in the array, remove it
      array.splice(index, 1);
      setdatecolor('remove');
    } else {
      // If the date doesn't exist in the array, add it
      array.push(dateString);
      setdatecolor('add');
    }

    return array;
  };

  return (
    <View style={styles.calenderContainer}>
      <CalenderNavigator
        previousMonth={previousMonth}
        nextMonth={nextMonth}
        month={month}
        year={year}
      />
      <DateComponent
        prependDays={firstDay}
        setdatepressed={setdatepressed}
        datepressed={datepressed}
        datecolor={datecolor}
        days={nDays[month]}
        pressedDate={pressedDate}
        month={month}
        year={year}
      />
    </View>
  );
};

export default Calender;
