import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import { CardContainer } from '../../../AdminScreens/AssignedStaff/styles';

const Cards = (props:any) => {
  return (
    <View style={styles.CardContainer}>
      <TouchableOpacity onPress={props.vitalSign} style={{marginVertical: 8}}>
        <Image style={styles.card} source={require('../../../../assets/client_vital_sign.png')}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.nurseNotes} style={{marginVertical: 8}}>
        <Image style={styles.card} source={require('../../../../assets/client_nurse_notes.png')}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.profile} style={{marginVertical: 8}}>
        <Image style={styles.card} source={require('../../../../assets/client_profile_button.png')}/>
      </TouchableOpacity>
    </View>
  );
};

export default Cards;
