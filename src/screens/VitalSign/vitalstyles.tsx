import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const HeaderStyle = StyleSheet.create({
  headerContainer: {
    width: width,
    padding: 15,
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

export const ContentStyle = StyleSheet.create({
  container: {
    width: width,
    height: 85/100 * height,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    paddingBottom: 25
  },
  heading: {
    color: '#000',
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 15,
  },
  scrollView: {
    maxHeight: (78 / 100) * height,
  },
});

export const CalenderStyle = StyleSheet.create({
  daycol: {
    width: '14.28%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dayText: {
    color: '#C3CBE7',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  dateText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '700',
    padding: 4,
  },
  navigationRow: {
    width: 90/100 * width,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: 7
  },
  navBtn: {
    padding: 4,
    marginHorizontal: 7
  }
});

export const CardStyle = StyleSheet.create({
  cardcontainer: {
    width: 90/100 * width,
    height: 'auto',
    backgroundColor: '#F1F6F8',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 16,
    marginVertical: 10,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  column1: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  subColumn: {
    borderLeftWidth: 3,
    borderLeftColor: '#D0E3EA',
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginVertical: 10
  },  
  title: {
    color:'#5A5A5C',
    fontSize: 11,
    fontWeight:'500'
  },
  measurement: {
    color: '#2A2A2E',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 4
  },
  tempText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#353535'
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5
  },
  boldText: {
    color: '#2A2A2E',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 3
  },
  row3: {
    width: 65/100 * width,
    paddingVertical: 7,
    marginTop: 10,
    left: '4%'
  },
  description: {
    color: '#2A2A2E',
    fontSize: 10.99,
    fontStyle: 'normal',
    // fontWeight: '600'
  }
});
