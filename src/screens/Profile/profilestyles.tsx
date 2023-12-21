import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const buttonWidth = width - 50;
const ratio = buttonWidth / 1232;

export const HeaderStyle = StyleSheet.create({
  headerContainer: {
    width: width,
    height: (15 / 100) * height,
    paddingHorizontal: 15,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start'
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

export const ImagePicker = StyleSheet.create({
  container: {
    width: width,
    alignItems: 'center',
    top: '-7%'
  },
  imageStyle: {
    width: 101,
    height: 101,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff'
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    left: '57%',
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

export const MainContainer = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});

export const TextArea = StyleSheet.create({
  inputContainer: {
    width: (88 / 100) * width,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  label: {
    color: '#6A7C8D',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  inputText: {
    color: '#515151',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
    paddingHorizontal: 10,
    borderColor: '#ECEEFA',
    borderWidth: 1,
    borderRadius: 7,
  },
  changePasswordText: {
    color: '#A1A1A1',
    fontSize: 13,
  },
});
