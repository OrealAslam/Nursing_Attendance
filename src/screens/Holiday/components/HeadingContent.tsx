import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const HeadingContent = (props: any) => {
  return (
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
  );
};

export default HeadingContent;
