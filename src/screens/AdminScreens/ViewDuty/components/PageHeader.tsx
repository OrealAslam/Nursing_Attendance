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
      <View style={styles.col1}>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => props.navigateScreen('AdminDshboard')}>
          <Image
            style={styles.backIcon}
            source={require('../../../../assets/backicon.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.col2}>
        <Text style={styles.heading}>View Duties</Text>
      </View>
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
  col1: {
    width: (8 / 100) * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  col2: {
    width: (80 / 100) * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 7.03,
    height: 13.87,
  },
  heading: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default PageHeader;
