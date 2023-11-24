import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {HeaderStyle} from '../holidaystyles';

const HolidayHeader = (props: any) => {
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
        <Text style={HeaderStyle.heading}>Holidays Request</Text>
      </View>
    </>
  );
};

export default HolidayHeader;
