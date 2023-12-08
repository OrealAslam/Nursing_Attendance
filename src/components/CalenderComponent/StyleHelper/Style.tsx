import { StyleSheet, Dimensions, ImageBackground } from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textTransform: 'capitalize',
    color: '#666668',
    fontSize: 18,
    fontWeight: '500'
  },
  calenderContainer: {
    width: (100 / 100) * width,
    backgroundColor: '#fff', 
   borderRadius: 24, 
   paddingBottom: 15
  },
  calendarHeader: {
    backgroundColor: '#3980FF',
    flexDirection: 'column',
    padding: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  }
});

export const searchBox = StyleSheet.create({
  container: {
    width: '95%',
    maxHeight: 200,
    ImageBackground: '#fff',
    overflow: 'scroll'
  },
  item: {
    width: '100%',
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: '#CCDDE4'
  }
});
