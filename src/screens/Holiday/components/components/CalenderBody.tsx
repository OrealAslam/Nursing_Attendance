import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {parseDate} from '../../../../Helper/AppHelper';

const {width} = Dimensions.get('screen');

const CalenderBody = (props: any) => {
  const [daysdata, setdaysdata] = useState([]);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [selectdate, setselectdate] = useState(props.highlightDate);

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
      let d = i;
      // let d = <Text style={styles.dateText}>{i}</Text>;
      days.push(d);
    }

    // prepend days according to startdayofmonth of month
    for (let j = props.startdayofmonth; j > 0; j--) {
      // let emptystart = <Text style={styles.dateText}>X</Text>;
      let emptystart = (
        <Text style={[styles.dateText, {color: '#fff'}]}>--</Text>
      );
      days.unshift(emptystart);
    }

    // append days according to lastdayofmonth of month
    for (let k = props.lastdayofmonth; k < 6; k++) {
      let emptyend = <Text style={[styles.dateText, {color: '#fff'}]}>--</Text>;
      days.push(emptyend);
    }
    setdaysdata(days);
  };

  const displayDays = () => {
    let jsx = daysdata.map((item: any, index: any) => {
      let type = typeof item;
      let highlight = false;
      let parsed = parseDate(props.currentyear, props.currentmonth + 1, item);
      let markedDate = markeddate(parsed);
      
      // check for active date
      if (type == 'number') {
        if (props.highlightDate.includes(parsed)) {
          highlight = true;
        } else {
          highlight = false;
        }
      }
      return (
        <TouchableOpacity
          onPress={() => {
            if (type != 'object') {
              props.setdateArray(parsed);
              setselectdate(parsed);
            } else {
              console.log('not date');
            }
          }}
          style={[
            styles.date,
            highlight == true
              ? markedDate.status == 1 ? {backgroundColor: '#ff471a'} : markedDate.status == 2 ? {backgroundColor: '#2eb8b8'} : {backgroundColor: '#6AD239'}
              : {backgroundColor: 'transparent'},
          ]}
          key={index}>
          <Text
            style={[
              styles.dateText,
              highlight == true ? {color: '#fff'} : {color: '#515151'},
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    });
    return jsx;
  };

  const markeddate = (date: any) => {
    let find = props.history.find((item: any) => item.date === date);
    if (find != undefined) {
      return find;
    } else {
      return false;
    }
  };

  useEffect(() => {
    Days();
  }, [props.totaldaysinmonth]);

  return (
    <View>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    borderRadius: 25,
  },
  dateText: {
    fontSize: 12,
    paddingVertical: 10,
    color: '#515151',
    fontWeight: '700',
  },
  mark: {
    width: 8,
    height: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    left: 5,
  },
});

export default CalenderBody;