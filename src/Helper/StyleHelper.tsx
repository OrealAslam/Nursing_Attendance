import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const win = Dimensions.get('window');
const ratioBoardingBG = win.width / 360;

const iconRatio = (width - 190) / 428;
export const headerStyle = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#3980FF',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto-Medium',
  },
  backBtn: {
    position: 'absolute',
    left: 25,
    width: 25,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnImg: {width: 7.01, height: 13.84},
  headerHeading: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#2E2E2E',
  },
  addNewWrap: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    position: 'absolute',
    bottom: 0,
  },
  symptonHeading: {
    color: '#41403F',
    fontStyle: 'normal',
    fontWeight: '700',
    textTransform: 'capitalize',
    marginTop: 10,
    fontSize: 15,
  },
});

export const NetworkModelStyle = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelContainer: {
    width: (85 / 100) * width,
    backgroundColor: '#fff',
    paddingVertical: 25,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgIcon: {
    width: width - 190,
    height: 331 * iconRatio,
    alignSelf: 'center',
    marginVertical: 10
  },
  heading: {
    fontSize: 19,
    fontWeight: '600',
    color: '#202020',
  },
  description: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20,
    color: '#6A7C8D',
  }
});
