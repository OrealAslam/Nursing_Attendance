import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {parseDate} from '../../../../../Helper/AppHelper';

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
      let emptystart = <Text style={styles.dateText}>--</Text>;
      days.unshift(emptystart);
    }

    // append days according to lastdayofmonth of month
    for (let k = props.lastdayofmonth; k < 6; k++) {
      let emptyend = <Text style={styles.dateText}>--</Text>;
      days.push(emptyend);
    }
    setdaysdata(days);
  };

  const displayDays = () => {
    let jsx = daysdata.map((item: any, index: any) => {
      let type = typeof item;
      let highlight = false;
      let parsed = parseDate(props.currentyear, props.currentmonth + 1, item);
      let markColor = dateMarkColor(parsed);
      // check for active date
      if (type == 'number') {
        if (parsed == selectdate) {
          highlight = true;
        } else {
          highlight = false;
        }
      }
      return (
        <TouchableOpacity
          onPress={() => {
            if (type != 'object') {
              props.datePressed(parsed);
              setselectdate(parsed);
            } else {
              console.log('not date');
            }
          }}
          style={[
            styles.date,
            highlight == true
              ? {backgroundColor: '#0D20A1'}
              : {backgroundColor: 'transparent'},
          ]}
          key={index}>
          <View style={[styles.mark,{backgroundColor: markColor}]}></View>
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

  const dateMarkColor = (date:any) => {
    let find = props.history.find((item: any) => item.created_at === date);
    if(find == undefined) {
      return '#FF3366';
    } else if(find.status == 'Duty Time') {
      return '#74CAE3';
    } else{ return '#6AD239'; }
  }

  useEffect(() => {
    Days();
  }, [props.totaldaysinmonth]);

  return (
    <View style={{borderBottomWidth: 0.5, borderBottomColor: '#959595'}}>
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
    borderColor: '#959595',
    borderTopWidth: 0.4,
    borderRightWidth: 0.4,
  },
  dateText: {
    fontSize: 12,
    paddingVertical: 10,
    color: '#515151',
    fontWeight: '600',
  },
  mark: {width: 8, height: 8,borderRadius: 20,alignSelf: 'flex-start', left: 5},
});
export default CalenderBody;
