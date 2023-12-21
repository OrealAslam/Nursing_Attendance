import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const timerButton = width - 180;
const timerButtonRatio = timerButton / 816;

const cardWidth = width - 50;
const cardRatio = cardWidth / 1236;

const footerContainer = width;
const footerContainerRatio = footerContainer / 1440;


export const HeaderStyle = StyleSheet.create({
  headerContainer: {
    width: width,
    justifyContent: 'center',
    marginBottom: 20,
  },
  topHeader: {
    padding: 25,
    paddingBottom: 14,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backfaceVisibility
    // backgroundColor: '#f00'
  },
  headerLogo: {
    width: 106.15,
    height: 19,
    // top:
  },
  profileLogo: {
    width: 32,
    height: 32.02,
    // top: 10
  },
  headerBadge: {
    width: (86 / 100) * width,
    height: 40,
    backgroundColor: '#fff',
    marginTop: 0,
    alignSelf: 'center',
    borderRadius: 50,
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
    height: 786 * timerButtonRatio,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 15
    // paddingTop: 10,
    // backgroundColor: 'yellow'
  },
  column: {
    width: (33 / 100) * width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  icon: {
    width: 42,
    height: 42,
  },
  time: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  desc: {
    color: '#BDC6F4',
    fontWeight: '500',
    fontSize: 11,
    textAlign: 'center',
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
    fontWeight: '400',
  },
});

export const FooterStyle = StyleSheet.create({
  conatiner: {
    width: footerContainer,
    height: 1248 * footerContainerRatio,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 10,
    paddingTop: 20,
    paddingHorizontal: 0,
  },
  cardstyle: {
    width: cardWidth,
    height: 250 * cardRatio,
  },
});
