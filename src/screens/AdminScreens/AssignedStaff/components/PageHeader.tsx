import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

const PageHeader = (props: any) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => props.navigateScreen('AdminDshboard')}>
        <Image
          style={styles.backIcon}
          source={require('../../../../assets/backicon.png')}
        />
      </TouchableOpacity>
      <Text style={styles.heading}>Assigned Staff</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 7.03,
    height: 13.87,
  },
  heading: {
    color: '#2A2A2E',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: '29%'
  },
});

export default PageHeader;
