import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import { HeaderStyle } from '../../../Dashboard/dashboardstyles';
import {get_nurse_status} from '../../../../Helper/AppHelper';

const AdminDashboardHeader = (props: any) => {
  return (
    <View style={HeaderStyle.headerContainer}>
      <View style={HeaderStyle.topHeader}>
        <View>
          <Image
            style={HeaderStyle.adminPhoto}
            source={require('../../../../assets/adminphoto.jpg')}
          />
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
        <Text style={HeaderStyle.adminName}>Sahroon Sohail <Image style={HeaderStyle.waveIcon} source={require('../../../../assets/wave.png')}/></Text>
      </View>
    </View>
  );
};

export default AdminDashboardHeader;
