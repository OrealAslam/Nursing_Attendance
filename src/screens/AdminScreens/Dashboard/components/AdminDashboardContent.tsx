import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {FooterStyle} from '../../../Dashboard/dashboardstyles';

const AdminDashboardContent = (props: any) => {
  return (
    <View style={FooterStyle.conatiner}>
      <TouchableOpacity
        style={{marginBottom: 10}}
        onPress={() => props.navigateScreen('AssignStaff')}>
        <Image
          style={FooterStyle.cardstyle}
          source={require('../../../../assets/staffassigned.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>props.navigateScreen('ViewAssignedStaff')} style={{marginBottom: 10}}>
        <Image
          style={FooterStyle.cardstyle}
          source={require('../../../../assets/viewassignedstaff.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={()=>props.navigateScreen('AttendenceRecord')}
        style={{marginBottom: 10}}
      >
        <Image
          style={FooterStyle.cardstyle}
          source={require('../../../../assets/attendencerecord.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AdminDashboardContent;
