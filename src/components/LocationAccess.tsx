import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  BackHandler,
  PermissionsAndroid
} from 'react-native';
import React from 'react';
import Contacts from 'react-native-contacts';

const { width, height } = Dimensions.get('window');

const btnWidth = width / 2 - 50;
const btnRatio = btnWidth / 460;

const LocationAccess = (props: any) => {

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <Text
          style={{
            color: '#000',
            fontSize: 14,
            fontWeight: '300',
            paddingHorizontal: 15,
            lineHeight: 25,
          }}>
          <Text style={{ fontSize: 16, color: '#323232', fontWeight: '700' }}>
            PlanCare
          </Text>{' '}
          collects the location data to mark your attendance when the app is
          closed or not in use.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => BackHandler.exitApp()}>
            <Image
              style={styles.btnImage}
              source={require('../assets/deny.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.setshowoverlay(false)}>
            <Image
              style={styles.btnImage}
              source={require('../assets/accept.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    backgroundColor: `rgba(0,0,0,0.5)`,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#fff',
    width: width,
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  btnImage: {
    width: btnWidth,
    height: 168 * btnRatio,
  },
});

export default LocationAccess;
