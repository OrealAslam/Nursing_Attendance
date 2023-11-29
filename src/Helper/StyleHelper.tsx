import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const win = Dimensions.get('window');
const ratioBoardingBG = win.width / 360;

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
    flex: 1,
    backgroundColor: '#0F1E70',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelContainer: {
    width: (78 / 100) * width,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  heading: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    fontSize: 14,
    marginTop: 20,
    color: '#000',
  }
});
