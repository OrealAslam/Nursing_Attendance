import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {FooterStyle} from '../../../Dashboard/dashboardstyles';

const AdminDashboardContent = (props: any) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.navigateScreen('AttendenceRecord')}
        style={{marginBottom: 10}}>
        <Image
          style={FooterStyle.attendenceImg}
          source={require('../../../../assets/attendencerecord.png')}
        />
      </TouchableOpacity>

      <View style={{flexDirection:'row',justifyContent:'space-between', marginTop: 20}}>
        <TouchableOpacity
          style={{marginBottom: 10}}
          onPress={() => props.navigateScreen('AssignStaff')}>
          <Image
            style={FooterStyle.adminCards}
            source={require('../../../../assets/staffassigned.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigateScreen('ViewDuties')}
          style={{marginBottom: 10}}>
          <Image
            style={FooterStyle.adminCards}
            source={require('../../../../assets/viewassignedstaff.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminDashboardContent;
