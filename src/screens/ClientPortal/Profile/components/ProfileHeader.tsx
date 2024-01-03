import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {HeaderStyle} from '../profilestyles';

const ProfileHeader = (props: any) => {

  return (
    <View style={HeaderStyle.headerContainer}>
      <View style={HeaderStyle.col1}>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => props.navigateScreen('ClientDashboard')}>
          <Image
            style={HeaderStyle.backIcon}
            source={require('../../../../assets/backicon.png')}
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
