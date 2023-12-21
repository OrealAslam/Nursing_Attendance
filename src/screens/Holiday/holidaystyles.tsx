import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const buttonWidth = width - 50;
const ratio = buttonWidth / 1232;

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

export const MainContent = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  statusMessage: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#818080',
    marginVertical: 20,
  },
});
