import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const HeaderStyle = StyleSheet.create({
  headerContainer: {
    width: width,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 7.03,
    height: 13.87,
  },
  heading: {
    color: '#2A2A2E',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: '37%',
  },
});

export const CardContainer = StyleSheet.create({
  container: {
    width: width,
    padding: 20,
    flexDirection: 'column'
  },
  heading: {
    color: '#5F5E5E',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 15
  },
  card: {
    width: 88/100 * width,
    borderWidth: 1,
    borderColor: '#D1DCE1',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    marginBottom: 10
  },
  column1: {
    flexDirection: 'column',
    flexBasis: 'auto',
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#9FB4C0'
  },
  column2: {
    flexDirection: 'row',
    flexBasis: 'auto',
    width: '83%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  date: {
    color: '#0A1B7D',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600'
  },
  day: {
    color: '#8A8B95',
    fontSize: 12,
    fontWeight: '400'
  },
  dutyStatus: {
    color: '#2A2A2E',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  dutyTime: {
    color: '#515151',
    fontSize: 16,
    fontWeight: '400'
  }
});
