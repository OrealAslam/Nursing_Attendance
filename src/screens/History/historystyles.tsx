import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const HeaderStyle = StyleSheet.create({
  headerContainer: {
    width: width,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  col1: {
    width: (8 / 100) * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  col2: {
    width: (80 / 100) * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 7.03,
    height: 13.87,
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export const CardContainer = StyleSheet.create({
  container: {
    width: width,
    padding: 20,
    flexDirection: 'column',
  },
  heading: {
    color: '#5F5E5E',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 15,
  },
  card: {
    width: (88 / 100) * width,
    backgroundColor: '#F1F6F8',
    padding: 10,
    flexDirection: 'row',
    marginBottom: 10,
    borderLeftWidth: 3,
    alignSelf: 'center'
  },
  column1: {
    flexDirection: 'column',
    width: '57%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  column2: {
    width: '43%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  status: {
    color: '#2A2A2E',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '600',
  },
  day: {
    color: '#8A8B95',
    fontSize: 12,
    fontWeight: '400',
  },
  dutyStatus: {
    color: '#2A2A2E',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  dutyTime: {
    color: '#FF3366',
    fontSize: 16,
    fontWeight: '700',
  },
});
