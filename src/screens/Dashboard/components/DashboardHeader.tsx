import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HeaderStyle} from '../dashboardstyles';
import {get_nurse_status, set_async_data} from '../../../Helper/AppHelper';

const DashboardHeader = (props: any) => {
  const [clientname, setclientname] = useState('');
  useEffect(() => {
    (async () => {
      const response = await get_nurse_status();
      if (response.status == 'success') {
        // await set_async_data('lead_id', response.data.lead_id)
        setclientname(response.data.clent_name);
      }
    })();
  }, []);

  return (
    <View style={HeaderStyle.headerContainer}>
      <View style={HeaderStyle.topHeader}>
        <Image
          style={HeaderStyle.headerLogo}
          source={require('../../../assets/headerLogo.png')}
        />
        <TouchableOpacity onPress={() => props.navigateScreen('ProfileScreen')}>
          <Image
            style={HeaderStyle.profileLogo}
            source={require('../../../assets/profileIcon.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={HeaderStyle.headerBadge}>
        <Text style={HeaderStyle.badgeText}>{clientname}</Text>
      </View>
    </View>
  );
};

export default DashboardHeader;
