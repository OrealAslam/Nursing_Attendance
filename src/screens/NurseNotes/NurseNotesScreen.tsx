import {Dimensions, ImageBackground} from 'react-native';
import React from 'react';
import Header from './component/Header';
import MainContent from './component/MainContent';

const {width, height} = Dimensions.get('window');

const NurseNotesScreen = ({navigation}: {navigation: any}) => {
  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  return (
    <ImageBackground
      style={{width: width, height: height}}
      source={require('../../assets/appbackground.png')}>
      <Header navigateScreen={navigateScreen} />
      <MainContent />
    </ImageBackground>
  );
};
export default NurseNotesScreen;
