import {
  View,
  Text,
  ImageBackground,
  BackHandler,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {NetworkModelStyle} from '../Helper/StyleHelper';

const {width, height} = Dimensions.get('window');
const buttonWidth = width - 180;
const buttonratio = buttonWidth / 560;

const NetworkModal = (props: any) => {
  return (
    <ImageBackground
      source={require('../assets/appbackground.png')}
      style={NetworkModelStyle.container}>
      <View style={NetworkModelStyle.modelContainer}>
        <Image
          style={NetworkModelStyle.imgIcon}
          source={require('../assets/networkerror.png')}
        />
        <Text style={[NetworkModelStyle.heading, {marginTop: 10}]}>
          Network Error
        </Text>
        <Text style={NetworkModelStyle.description}>
          Failed to connect to Internet
        </Text>
        <Text style={[NetworkModelStyle.description, {marginBottom: 10}]}>
          Please Try again later!
        </Text>
        <TouchableOpacity onPress={() => BackHandler.exitApp()}>
          <Image
            style={{
              alignSelf: 'center',
              width: buttonWidth,
              height: 148 * buttonratio,
              marginTop: 20,
            }}
            source={require('../assets/exitApp.png')}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default NetworkModal;
