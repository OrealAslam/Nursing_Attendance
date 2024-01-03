import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

const OverlayLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={'#aeaeae'} size={50} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgba(0,0,0,0.6)`,
  },
});
export default OverlayLoader;
