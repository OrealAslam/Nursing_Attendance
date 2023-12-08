import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HeaderStyle} from '../../../Dashboard/dashboardstyles';
import {get_nurse_status} from '../../../../Helper/AppHelper';

const AdminDashboardHeader = (props: any) => {
  return (
    <View style={HeaderStyle.headerContainer}>
      <View style={HeaderStyle.topHeader}>
        <Image
          style={HeaderStyle.headerLogo}
          source={require('../../../../assets/headerLogo.png')}
        />
        <TouchableOpacity onPress={() => props.navigateScreen('ProfileScreen')}>
          <Image
            style={HeaderStyle.profileLogo}
            source={require('../../../../assets/profileIcon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminDashboardHeader;
