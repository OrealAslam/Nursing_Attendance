import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const headerImageRatio = width / 1440;

const cardWidth = width - 60;
const cardRatio = cardWidth / 1240;

const whatsappImageWidth = width - 190;
const whatsappImageRatio = whatsappImageWidth / 620;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageHeader: {
    width: width,
    height: 972 * headerImageRatio,
    justifyContent: 'center',
  },
  title: {
    color: '#CDD4FE',
    fontSize: 16,
    fontWeight: '500',
  },
  name: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  waveIcon: {
    width: 21.61,
    height: 21.76,
  },
  CardContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  card: {
    width: cardWidth,
    height: 312 * cardRatio,
  },
  whatsappContainer: {
    width: 88/100 * width,
    alignSelf: 'center'
  },
  whatsappImage: {
    width: whatsappImageWidth,
    height: 223 * whatsappImageRatio,
    alignSelf: 'flex-end',
    marginTop: 10
  }
});

export const ImagePicker = StyleSheet.create({
  container: {
    width: (80 / 100) * width,
    alignSelf: 'center',
  },
  imageStyle: {
    width: 69.73,
    height: 69.73,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    left: '18%',
  },
  editButtonImg: {
    width: 16.71,
    height: 16.71,
  },
});
