import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import { HeaderStyle } from '../../../Dashboard/dashboardstyles';
import {IMAGE_BASE_URL, get_async_data, get_nurse_status} from '../../../../Helper/AppHelper';
import { useIsFocused } from '@react-navigation/native';

const AdminDashboardHeader = (props: any) => {
  const [username, setusername] = useState('');
  const [profilepicture, setprofilepicture] = useState('');
  const isFocused = useIsFocused();
  
  useEffect(()=>{
    (async ()=>{
      let username = await get_async_data('username');
      let profile_picture = await get_async_data('profile_picture');
      setprofilepicture(profile_picture);
      setusername(username);
    })()
  }, [isFocused]);

  return (
    <View style={HeaderStyle.headerContainer}>
      <View style={HeaderStyle.topHeader}>
        <View>
          {
            profilepicture != '' ? ( <Image
              style={HeaderStyle.adminPhoto}
              source={{uri: IMAGE_BASE_URL + profilepicture}}
            />) : (
              <Image
                style={HeaderStyle.adminPhoto}
                source={require('../../../../assets/defaultprofileimage.png')}
              />
            )
          }
          <Image
            style={HeaderStyle.editButtonImg}
            source={require('../../../../assets/editprofilepicbtn.png')}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={() => props.navigateScreen('ProfileScreen')}>
            <Image
              style={HeaderStyle.profileLogo}
              source={require('../../../../assets/profileIcon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{width: '84%',alignSelf: 'center'}}>
        <Text style={HeaderStyle.title}>Welcome</Text>
        <Text style={HeaderStyle.adminName}>{username} <Image style={HeaderStyle.waveIcon} source={require('../../../../assets/wave.png')}/></Text>
      </View>
    </View>
  );
};

export default AdminDashboardHeader;
