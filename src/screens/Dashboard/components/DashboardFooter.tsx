import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import {FooterStyle} from '../dashboardstyles';

const DashboardFooter = (props: any) => {
  return (
    <View style={FooterStyle.conatiner}>
      <TouchableOpacity style={{marginBottom: 10}} onPress={() => props.navigateScreen('HistoryScreen')}>
        <Image
          style={FooterStyle.cardstyle}
          source={require('../../../assets/history.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigateScreen('HolidayScreen')}>
        <Image
          style={FooterStyle.cardstyle}
          source={require('../../../assets/holidayrequest.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DashboardFooter;
