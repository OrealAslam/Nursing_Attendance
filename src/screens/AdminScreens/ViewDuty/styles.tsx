import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const containerStyle = StyleSheet.create({
  container: {
    width: (95 / 100) * width,
    padding: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export const InputStyle = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#2A2A2E',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  inputBox: {
    borderColor: '#D1DCE1',
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 7,
    paddingLeft: 10,
  },
  searchBox:{
    width: (85 / 100) * width,
    alignSelf: 'center',
    backgroundColor: '#849BEE',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 49,
    fontSize: 12
  },
  vectorImg: {
    width: 7.5,
    height: 15,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 15,
    top: '58%',
  },
});

export const CardContainer = StyleSheet.create({
  container: {
    width: (85 / 100) * width,
    backgroundColor: '#F1F6F8',
    borderWidth: 1,
    borderColor: '#D1DBE1',
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 12
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#DB6651',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  key: {
    color: '#2A2A2E',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  value: {
    color: '#2A2A2E',
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '700'
  }
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
