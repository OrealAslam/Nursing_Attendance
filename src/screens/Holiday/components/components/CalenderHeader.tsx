import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';

const CalenderHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.prevMonth} style={styles.button}>
        <Image
          style={styles.icon}
          source={require('../assets/prev_month.png')}
        />
      </TouchableOpacity>
      <Text style={{color: '#515151'}}>{props.currentmonth}, {props.currentyear}</Text>
      <TouchableOpacity onPress={props.nextMonth} style={styles.button}>
        <Image
          style={styles.icon}
          source={require('../assets/next_month.png')}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    width: 4.49,
    height: 8.87,
  },
  button: {
    padding: 10,
  },
});
export default CalenderHeader;
