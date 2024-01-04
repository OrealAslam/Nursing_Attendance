import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import React, {useState} from 'react';
import {HeaderStyle, ImagePicker} from '../profilestyles';
import {IMAGE_BASE_URL} from '../../../../Helper/AppHelper';

const ProfileHeader = (props: any) => {

  return (
    <>
      <View style={HeaderStyle.headerContainer}>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => props.navigateScreen('AdminDshboard')}>
          <Image
            style={HeaderStyle.backIcon}
            source={require('../../../../assets/backicon.png')}
          />
        </TouchableOpacity>
        <Text style={HeaderStyle.heading}>Profile</Text>
      </View>
      <View style={ImagePicker.container}>
        {/* {props.profilepicture != '' ? (
          <Image
            style={ImagePicker.imageStyle}
            source={{uri: IMAGE_BASE_URL + props.profilepicture}}
          />
        ) : ( */}
          <Image
            style={ImagePicker.imageStyle}
            source={require('../../../../assets/defaultprofileimage.png')}
          />
        {/* )} */}

        <TouchableOpacity
          onPress={() =>
            console.log('nn')
          }
          style={ImagePicker.editButton}>
          <Image
            style={ImagePicker.editButtonImg}
            source={require('../../../../assets/editprofilepicbtn.png')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProfileHeader;
