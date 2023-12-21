import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {HeaderStyle} from '../holidaystyles';
import HeadingContent from './HeadingContent';

const HolidayHeader = (props: any) => {
  return (
    <>
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
          <Text style={HeaderStyle.heading}>Leave Request</Text>
        </View>
      </View>

      <HeadingContent />
    </>
  );
};

export default HolidayHeader;
