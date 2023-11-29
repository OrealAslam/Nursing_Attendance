import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CalenderDateStyle} from '../StyleHelper/CalenderDateStyle';
import {styles} from '../StyleHelper/Style';
import {globalDate, parseDate} from '../../../Helper/AppHelper';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
const DateComponent = (props: any) => {
  const isFocused = useIsFocused();
  const [data, setdata] = useState([1]);
  const [prepend, setprepend] = useState([0]);

  useEffect(() => {
    let arr = [];
    let prep = [];
    for (let i = 1; i <= props.days; i++) {
      arr.push(i);
    }
    setdata(arr);

    for (let i = 0; i < props.prependDays; i++) {
      prep.push(i);
    }
    setprepend(prep);
  }, [props.days, isFocused]);

  const getObjectByDate = (dateToFind: any) => {
    if (global.DateArray.find((item: any) => item.date === dateToFind) != undefined) {
      return global.DateArray.find((item: any) => item.date === dateToFind);
    }
  };

  const printDays = () => {
    let jsx = data.map((item, index) => {
      let dateToFind = `${props.year}-${Number(props.month) + 1}-${
        data[index]
      }`;
      dateToFind = parseDate(
        new Date(dateToFind).getFullYear(),
        new Date(dateToFind).getMonth() + 1,
        new Date(dateToFind).getDate(),
      );
      let matched = getObjectByDate(dateToFind);
      return (
        <TouchableOpacity
          onPress={() => {
            props.pressedDate(item);
          }}
          style={[
            CalenderDateStyle.date,
            CalenderDateStyle.displayBorder,
            props.datepressed == item
              ? {backgroundColor: '#0D20A1'}
              : matched != undefined && matched.status == 0
              ? {backgroundColor: '#F84365'}
              : matched != undefined && matched.status == 1
              ? {backgroundColor: '#17D62A'}
              : matched != undefined && matched.status == 2
              ? {backgroundColor: '#BDBDBD'}
              : {},
          ]}
          key={index}>
          <Text
            style={[
              styles.fontStyle,
              CalenderDateStyle.dateText,
              props.datepressed == item
                ? CalenderDateStyle.dateTextSelected
                : matched != undefined && matched.status == 0
                ? {color: '#fff'}
                : matched != undefined && matched.status == 1 
                // : matched != undefined && matched.status == 1
                ? {color: '#fff'}
                : {},
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    });
    return jsx;
  };

  const prependDays = () => {
    let append = prepend.map((item, index) => {
      return (
        <TouchableOpacity style={CalenderDateStyle.date} key={index}>
          <Text style={[styles.fontStyle, CalenderDateStyle.dateText]}></Text>
        </TouchableOpacity>
      );
    });
    return append;
  };

  return (
    <View style={CalenderDateStyle.container}>
      <View style={CalenderDateStyle.dateContainer}>
        {prependDays()}
        {printDays()}
      </View>
    </View>
  );
};

export default DateComponent;
