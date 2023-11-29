import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const CalenderNavigatorStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: 90,
    paddingVertical: 0,
    justifyContent: 'space-between'
  },
  navigationArea: {
    width: width,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
  monthyear: {
    color: '#666668',
    fontSize: 18,
    fontWeight: '600',
  },
  weekdayscontainer: {
    width: width,
    // padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#121E62'
  },
});
