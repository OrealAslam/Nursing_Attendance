import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Linking,
  Image,
} from 'react-native';
import React from 'react';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const timerImgWidth = width - 190;
const timerImgRatio = timerImgWidth / 353;

const StartTimerModel = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.modelContainer}>
        <Image
          style={{
            width: 88.17,
            height: 98.78,
            alignSelf: 'center',
            marginBottom: 20,
          }}
          source={require('../assets/timer.png')}
        />
        {/* <Image style={{width:timerImgWidth,height:396*timerImgRatio}} source={require('../assets/timer.png')} /> */}
        {props.locationaccess == false ? (
          <>
            <Text style={styles.heading}>
              Please check Location and Contacts permission from Settings
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.heading}>
              Are you sure you want to{' '}
              {props.shiftstatus == 'started' ? 'end' : 'start'} this care?
            </Text>
          </>
        )}

        <View style={styles.buttonContainer}>
          {props.locationaccess == false ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openSettings()}>
                <Text style={{color: '#fff'}}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#A7B7DF'}]}
                onPress={() => props.updateShift('no')}>
                <Text style={{color: '#fff'}}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => props.updateShift('yes')}>
                <Image
                  style={{width: 93.43, height: 36.71}}
                  source={require('../assets/yes.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.updateShift('no')}>
                <Image
                  style={{width: 93.43, height: 36.71}}
                  source={require('../assets/no.png')}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: `rgba(0,0,0,0.7)`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelContainer: {
    width: (85 / 100) * width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 18,
  },
  heading: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6A7C8D',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#041276',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 94,
  },
});
export default StartTimerModel;
