import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

const HolidayFooter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={[styles.icon, {backgroundColor: '#74CAE3'}]}></View>
        <Text style={styles.label}>Approved</Text>
      </View>
      <View style={styles.column}>
        <View style={[styles.icon, {backgroundColor: '#FF3366'}]}></View>
        <Text style={styles.label}>Rejected</Text>
      </View>
      <View style={styles.column}>
        <View style={[styles.icon, {backgroundColor: '#6AD239'}]}></View>
        <Text style={styles.label}>Pending</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 85/100 * width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 5
  },
  column: {
    width: '33.33%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 14,
    height: 14,
    borderRadius: 50,
  },
  label: {
    color: '#6A7C8D',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 7,
  },
});
export default HolidayFooter;
