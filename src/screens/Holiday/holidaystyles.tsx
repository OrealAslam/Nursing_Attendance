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
  backIcon: {
    width: 7.03,
    height: 13.87,
  },
  heading: {
    color: '#2A2A2E',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: '24%',
  },
});

export const MainContent = StyleSheet.create({
  container: {
    width: width,
  },
  statusMessage: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#818080',
    marginVertical: 20
  },
  footerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 80/100 * width,
    alignSelf: 'center',
    paddingVertical: 20
  },
  column: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 10
  },
  mark1: {
    width: 11.33,
    height: 11.33,
    backgroundColor: '#F84365',
    borderRadius: 20
  },
  mark2: {
    width: 11.33,
    height: 11.33,
    backgroundColor: '#17D62A',
    borderRadius: 20
  },
  mark3: {
    width: 11.33,
    height: 11.33,
    backgroundColor: '#BDBDBD',
    borderRadius: 20
  },
  statement: {
    color: '#636363',
    fontSize: 11,
    marginLeft: 10
  }
});
