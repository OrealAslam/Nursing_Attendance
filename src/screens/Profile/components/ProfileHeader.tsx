import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import {HeaderStyle, ImagePicker} from '../profilestyles';
import {IMAGE_BASE_URL, get_async_data, upload_user_image} from '../../../Helper/AppHelper';

const ProfileHeader = (props: any) => {

  const pickImage = async () => {
    let username = await get_async_data('username');
    let dob = await get_async_data('dob');
    let address = await get_async_data('address');
    let id = await get_async_data('user_id');

    let finalObj = {
      id: id,
      name: username,
      dob: dob,
      address: address,
      image: {},
    };
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      // Upload FiLe Here
      const formData = new FormData();
      formData.append('image', {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      });
      finalObj.image = formData?._parts[0][1];


      let response = await upload_user_image(finalObj);

      console.log('RESPONSE', response);

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('cancel', err);
      } else {
        // Handle other errors
        console.log('other', err);
      }
    }
  };

  return (
    <View style={HeaderStyle.headerContainer}>
      <View style={HeaderStyle.col1}>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => props.navigateScreen('DashboardScreen')}>
          <Image
            style={HeaderStyle.backIcon}
            source={require('../../../assets/backicon.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={HeaderStyle.col2}>
        <Text style={HeaderStyle.heading}>Profile</Text>
      </View>
    </View>
  );
};

export default ProfileHeader;
