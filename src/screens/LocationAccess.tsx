import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

const {width} = Dimensions.get('window');
const containerRatio = (width - 50) / 1272;

const LocationAccess = ({navigation}: {navigation: any}) => {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/transparentContainer.png')}
        style={styles.infoContainer}>
        <Text style={styles.text}>
          PlanCare collects the location data to mark your attendance when the
          app is closed or not in use.
        </Text>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => BackHandler.exitApp()}>
            <Text style={[styles.button, {color: '#4FB2FF'}]}>DENY</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={[styles.button, {color: '#FF6582'}]}>ACCEPT</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121E62',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    width: width - 50,
    height: 1036 * containerRatio,
    backgroundColor: '#020A38',
    borderRadius: 16,
    position: 'absolute',
    paddingVertical: 15,
    paddingHorizontal: 20,
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    zIndex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 'auto',
  },
  button: {
    fontSize: 21,
    fontWeight: '700',
  },
});
export default LocationAccess;
