import {Image, Dimensions, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { TextArea } from '../profilestyles';
const {width} = Dimensions.get('window');

const buttonWidth = width - 50;
const ratio = buttonWidth / 1235;

const FooterComponent = (props:any) => {
  return (
    <>
      <TouchableOpacity onPress={()=>props.updateRecord()}>
        <Image
          style={{
            width: buttonWidth,
            height: 184 * ratio,
            alignSelf: 'center',
            marginTop: 45,
          }}
          source={require('../../../assets/profilesave.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>props.setmodel(true)} style={{alignSelf: 'center', marginTop :10}}>
        <Text style={TextArea.changePasswordText}>Change Your Password</Text>
      </TouchableOpacity>
    </>
  );
};

export default FooterComponent;
