import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const {width} = Dimensions.get('screen');

const CalenderBody = (props: any) => {
  const [daysdata, setdaysdata] = useState([]);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const displayWeekDays = () => {
    let dayList = weekDays.map((item: any, index: any) => {
      return (
        <View style={styles.dayBox} key={index}>
          <Text style={styles.dayText}>{item}</Text>
        </View>
      );
    });
    return dayList;
  };

  const Days = () => {
    let days = [];
    for (let i = 1; i <= props.totaldaysinmonth; i++) {
      let d = <Text style={styles.dateText}>{i}</Text>;
      days.push(d);
    }

    // prepend days according to startdayofmonth of month
    for (let j = props.startdayofmonth; j > 0; j--) {
      let emptystart = <Text style={styles.dateText}>X</Text>;
      days.unshift(emptystart);
    }

    // append days according to lastdayofmonth of month
    for (let k = props.lastdayofmonth; k < 6; k++) {
      let emptyend = <Text style={styles.dateText}>X</Text>;
      days.push(emptyend);
    }

    setdaysdata(days);
  };

  const displayDays = () => {
    let jsx = daysdata.map((item: any, index: any) => {
      return (
        <TouchableOpacity
          // onPress={()=>{props.datePressed(index)}}
        style={[
            styles.date,
            index == 0 ? {backgroundColor: 'transparent'} : {},
          ]}
          key={index}>
          <Text style={styles.dateText}>{item}</Text>
        </TouchableOpacity>
      );
    });
    return jsx;
  };

  useEffect(() => {
    Days();
  }, [props.totaldaysinmonth]);

  return (
    <View style={{borderBottomWidth: .5, borderBottomColor: '#959595'}}>
      <View style={styles.dayContainer}>{displayWeekDays()}</View>

      <View style={styles.datesContainer}>{displayDays()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    flexDirection: 'row',
    width: width,
    marginBottom: 10,
  },
  dayBox: {
    width: '14.28%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: '#202020',
    fontSize: 13,
    fontWeight: '600',
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  date: {
    width: '14.28%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderColor: '#959595',
    borderTopWidth: 0.4,
    borderRightWidth: 0.4,
  },
  dateText: {
    fontSize: 14,
    paddingVertical: 8,
    color: '#515151',
    fontWeight: '600',
  },
});
export default CalenderBody;
