import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const Style = StyleSheet.create({
  calendarHeader: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: 0
  },
  yearContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  dateContainer: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  date: {
    fontSize: 18,
    fontWeight: '500',
  },
  year: {
    fontSize: 12,
  },
});
