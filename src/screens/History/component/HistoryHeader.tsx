import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {HeaderStyle} from '../historystyles';

const HistoryHeader = (props: any) => {
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
        <Text style={HeaderStyle.heading}>History</Text>
      </View>
    </>
  );
};
export default HistoryHeader;
