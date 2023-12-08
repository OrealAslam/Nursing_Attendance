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
    width: (90 / 100) * width,
    borderWidth: 1,
    borderColor: '#D1DBE1',
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 12
  },
  row: {
    paddingHorizontal: 5,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#CCDDE4',
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
