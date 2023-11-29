import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const CalenderDateStyle = StyleSheet.create({
  container: {
    width: width,
    marginTop: 15,
    paddingHorizontal: 5,
    // paddingVertical: 10,
  },
  dateContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap'
  },
  date: {
    width: (width - 10) / 7,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  displayBorder: {
    borderWidth: 1,
    borderColor: '#949494'
  },
  dateText: {
    fontSize: 14,
    color: '#121E62',
    fontWeight: '700'
  },    
  selectedDate: {
    backgroundColor: '#2861C6',
  },
  dateTextSelected: {
    color: '#fff'
  }
});
