import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import React from 'react';
import {HeaderStyle} from '../historystyles';
import moment from 'moment';
const {width, height} = Dimensions.get('window');

const HistoryHeader = (props: any) => {
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
          <Text style={HeaderStyle.heading}>Work History</Text>
        </View>
      </View>

      <View style={{width: width, paddingHorizontal: 30, paddingBottom: 15}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '700',
            textTransform: 'lowercase',
          }}>
          {moment().format('Do')}
        </Text>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: '600'}}>
          <Text style={{color: '#19B1F0'}}>{moment().format('MMMM')}</Text>,{' '}
          {moment().format('YYYY')}
        </Text>
      </View>
    </>
  );
};
export default HistoryHeader;
