import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window');
const buttonWidth = width - 140;
const buttonratio = buttonWidth / 880;

const ShiftCompleteModel = (props: any) => {
  return (
    <Animatable.View
      animation="bounceInUp"
      style={styles.container}
      duration={1700}>
      <View style={styles.modelContainer}>
        <Text style={styles.heading}>Shift Completed</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.inputText}
            value={'26/07/2023'}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Duration</Text>
          <TextInput
            style={styles.inputText}
            value={'07:30:15'}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Start Time</Text>
          <TextInput
            style={styles.inputText}
            value={'09:00 Am'}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>End Time</Text>
          <TextInput
            style={styles.inputText}
            value={'03:45 Pm'}
            editable={false}
          />
        </View>

        <TouchableOpacity style={{marginTop: 10}}>
          <Image
            style={{
              alignSelf: 'center',
              width: buttonWidth,
              height: 184 * buttonratio,
            }}
            source={require('../assets/done.png')}
          />
        </TouchableOpacity>
      </View>
    </Animatable.View>
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
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 37,
    width: '21%',
    alignSelf: 'center',
    borderBottomColor: '#B8B8B8',
    borderBottomWidth: 1,
  },
  inputContainer: {
    width: (80 / 100) * width,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 5,
  },
  heading: {
    color: '#202020',
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  label: {
    color: '#6A7C8D',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.7,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  inputText: {
    color: '#2A2A2E',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    textTransform: 'capitalize',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderColor: '#ECEEFA',
    borderWidth: 1,
    borderRadius: 6.3,
    marginBottom: 5,
  },
  error: {
    textAlign: 'center',
    top: 5,
    color: '#f00',
    textTransform: 'capitalize',
    fontSize: 10,
  },
});
export default ShiftCompleteModel;
