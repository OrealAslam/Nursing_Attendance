import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import React, {useState} from 'react';
import {HeaderStyle, ImagePicker} from '../profilestyles';
import {IMAGE_BASE_URL} from '../../../Helper/AppHelper';
import * as Picker from 'react-native-image-picker';

const ProfileHeader = (props: any) => {

  let uploadImage = async (imageData: any) => {
    const formdata = new FormData();
    // formdata.append('image', {
    //   originalName: imageData.fileName,
    //   mimeType: imageData.type,
    //   error: 0,
    //   hashName: '',
    //   pathName: imageData.originalPath,
    //   fileName: imageData.fileName,
    //   uri: imageData.uri,
    //   type: imageData.type,
    //   name: imageData.fileName,
    // });
    formdata.append('image', {
      uri: imageData.uri,
      type: imageData.type,
      name: imageData.fileName,
    });
    props.setimageData(formdata._parts[0][1]);
  };

  return (
    <>
      <View style={HeaderStyle.headerContainer}>
        <TouchableOpacity
          onPress={() => props.navigateScreen('DashboardScreen')}>
          <Image
            style={HeaderStyle.backIcon}
            source={require('../../../assets/backicon.png')}
          />
        </TouchableOpacity>
        <Text style={HeaderStyle.heading}>Profile</Text>
      </View>
      <View style={ImagePicker.container}>
        {props.profilepicture != '' ? (
          <Image
            style={ImagePicker.imageStyle}
            source={{uri: IMAGE_BASE_URL + props.profilepicture}}
          />
        ) : (
          <Image
            style={ImagePicker.imageStyle}
            source={require('../../../assets/defaultprofileimage.png')}
          />
        )}

        <TouchableOpacity
          onPress={() =>
            Picker.launchCamera(
              {
                assetRepresentationMode: 'auto',
                mediaType: 'photo',
                quality: 1,
                // includeExtra: true,
                includeBase64: false,
                presentationStyle: 'overFullScreen',
                // saveToPhotos: true
                
              },
              async (response: any) => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else {
                  await uploadImage(response.assets[0]);
                }
              },
            )
          }
          style={ImagePicker.editButton}>
          <Image
            style={ImagePicker.editButtonImg}
            source={require('../../../assets/editprofilepicbtn.png')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProfileHeader;
