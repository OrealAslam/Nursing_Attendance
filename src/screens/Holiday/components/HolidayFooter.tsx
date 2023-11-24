import {View, Text} from 'react-native';
import React from 'react';
import {MainContent} from '../holidaystyles';

const HolidayFooter = () => {
  return (
    <View style={MainContent.footerContainer}>
      <View style={MainContent.column}>
        <View style={MainContent.mark1}></View>
        <Text style={MainContent.statement}>Holiday request pending</Text>
      </View>
      <View style={MainContent.column}>
        <View style={MainContent.mark2}></View>
        <Text style={MainContent.statement}>Holiday request Approved</Text>
      </View>
      <View style={MainContent.column}>
        <View style={MainContent.mark3}></View>
        <Text style={MainContent.statement}>Holiday request Rejected</Text>
      </View>
    </View>
  );
};

export default HolidayFooter;
