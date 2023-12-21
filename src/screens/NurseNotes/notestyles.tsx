import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const navIconWidth = (25 / 100) * width;
const navIconRatio = navIconWidth / 423;

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
  calenderContainer: {
    width: (90 / 100) * width,
    paddingVertical: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export const ContentStyle = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  navImage: {
    width: navIconWidth,
    height: 155 * navIconRatio,
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 15,
  },
});

export const CardStyle = StyleSheet.create({
  card: {
    width: (86 / 100) * width,
    alignSelf: 'center',
    marginVertical: 5,
  },
  time: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#5A5A5C',
    fontWeight: '400',
    marginLeft: 5,
  },
  mainDescription: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F1F6F8',
    borderRadius: 14,
    marginTop: 7,
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
