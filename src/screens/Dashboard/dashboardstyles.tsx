import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const timerButton = width - 70;
const timerButtonRatio = timerButton / 1084;

const cardWidth = width - 40;
const cardRatio = cardWidth / 1236;

export const HeaderStyle = StyleSheet.create({
  headerContainer: {
    width: width,
    justifyContent: 'center',
    marginBottom: 35,
  },
  topHeader: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLogo: {
    width: 134.08,
    height: 24,
  },
  profileLogo: {
    width: 38,
    height: 38.02,
  },
  headerBadge: {
    width: (86 / 100) * width,
    height: 40,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  badgeText: {
    color: '#3F414F',
    fontSize: 14,
    fontWeight: '600',
  },
});

export const ContentStyle = StyleSheet.create({
  timerButton: {
    width: timerButton,
    height: 1044 * timerButtonRatio,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  heading: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 43.47,
    fontWeight: '600',
  },
  timer: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '400'
  },
});

export const FooterStyle = StyleSheet.create({
  conatiner: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  cardstyle: {
    width: cardWidth,
    height: 284 * cardRatio,
  },
});
