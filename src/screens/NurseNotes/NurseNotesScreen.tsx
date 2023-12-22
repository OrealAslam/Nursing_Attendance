import {ActivityIndicator, Dimensions, ImageBackground} from 'react-native';
import React, { useState,useEffect } from 'react';
import Header from './component/Header';
import MainContent from './component/MainContent';
import {useIsFocused} from '@react-navigation/native';
import { get_nurse_note } from '../../Helper/AppHelper';

const {width, height} = Dimensions.get('window');

const NurseNotesScreen = ({navigation}: {navigation: any}) => {
  const isFocused = useIsFocused();
  const [showaddicon, setshowaddicon] = useState(false);
  const [loader, setloader] = useState(true);
  const [data, setdata] = useState([]);
  const [datestring, setdatestring] = useState('');

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    (async () => {
      let requestData = await get_nurse_note();
      if(requestData){
        setloader(false)
        setdata(requestData);
      }
    })();
  }, [isFocused]);

  return (
    <ImageBackground
      style={{width: width, height: height}}
      source={require('../../assets/appbackground.png')}>
      <Header navigateScreen={navigateScreen} setshowaddicon={setshowaddicon} setdatestring={setdatestring} />
      {loader == true ? (<ActivityIndicator size={'large'} color={'#ddd'} style={{alignSelf:'center'}} />) : (<MainContent datestring={datestring} showaddicon={showaddicon} data={data} />)}
    </ImageBackground>
  );
};
export default NurseNotesScreen;