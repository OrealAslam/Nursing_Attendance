import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Linking,
} from 'react-native';
import React from 'react';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const StartTimerModel = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.modelContainer}>
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
              {props.shiftstatus == 'started' ? 'end' : 'start'} the care?
            </Text>
            <Text style={[styles.heading, {fontWeight: '500'}]}>
              {/* {props.shiftstatus == 'started' ? 'end' : 'start'} Time:{' '} */}
              {/* {props.shiftstarttime} */}
            </Text>
          </>
        )}

        <View style={styles.buttonContainer}>
          {props.locationaccess == false ? (
            <>
              <TouchableOpacity style={styles.button} onPress={() => Linking.openSettings()}>
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
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.updateShift('yes')}>
                <Text style={{color: '#fff'}}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#A7B7DF'}]}
                onPress={() => props.updateShift('no')}>
                <Text style={{color: '#fff'}}>No</Text>
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
    width: (84 / 100) * width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
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
