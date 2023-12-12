import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const buttonWidth = width - 50;
const ratio = buttonWidth / 1232;

export const HeaderStyle = StyleSheet.create({
  headerContainer: {
    width: width,
    padding: 15,
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
    marginLeft: '37%',
  },
});

export const ImagePicker = StyleSheet.create({
  container: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageStyle: {
    width: 116,
    height: 116,
    borderRadius: 100
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    left: '62%',
  },
  editButtonImg: {
    width: 27.8,
    height: 27.8,
  },
  saveButton: {
    width: buttonWidth,
    height: 184 * ratio,
    // marginTop: 30,
  },
});

export const TextArea = StyleSheet.create({
  inputContainer: {
    width: (85 / 100) * width,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  label: {
    color: '#A1A1A1',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 5
  },
  inputText:{
    color: '#2A2A2E',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
    paddingVertical: 0,
    borderBottomColor: '#CADFF8',
    borderBottomWidth: 1
  },
  changePasswordText: {
    color: '#A1A1A1',
    fontSize: 13
  }
});
