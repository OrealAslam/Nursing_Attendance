import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const StartTimerModel = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.modelContainer}>
        <Text style={styles.heading}>
          Are you sure you want to {props.shiftstatus} the care?
        </Text>
        <Text style={[styles.heading, {fontWeight: '500', textTransform: 'capitalize'}]}>
          {props.shiftstatus} Time: {moment().format('hh:mm A')}
        </Text>

        <View style={styles.buttonContainer}>
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
