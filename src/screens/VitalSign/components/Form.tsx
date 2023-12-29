import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');
const buttonWidth = width - 140;
const buttonratio = buttonWidth / 880;

const Form = (props: any) => {
  return (
    <>
      <View style={styles.fullWidthInputContainer}>
        <Text style={styles.label}>Blood Pressure</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          onChangeText={props.setbloodpressure}
        />
        <Text style={styles.text}>mm Hg</Text>
      </View>

      <View style={styles.halfWidthInputContainer}>
        <View style={{width: '48%'}}>
          <Text style={styles.label}>Pulse Rate</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={props.setpulserate}
          />
          <Text style={styles.text}>bpm</Text>
        </View>
        <View style={{width: '48%'}}>
          <Text style={styles.label}>Temperature</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={props.settemperature}
          />
        </View>
      </View>

      <View style={styles.fullWidthInputContainer}>
        <Text style={styles.label}>RESP</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          onChangeText={props.setresp}
        />
      </View>

      <View style={styles.halfWidthInputContainer}>
        <View style={{width: '48%'}}>
          <Text style={[styles.label, {textTransform: 'uppercase'}]}>BSR</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={props.setbsr}
          />
          <Text style={styles.text}>mg/dL</Text>
        </View>
        <View style={{width: '48%'}}>
          <Text style={[styles.label, {textTransform: 'uppercase'}]}>SPO2</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={props.setspo2}
          />
        </View>
      </View>

      <View style={styles.fullWidthInputContainer}>
        <Text style={styles.label}>Remarks</Text>
        <TextInput style={styles.textInput} onChangeText={props.setremarks} />
      </View>

      <Text style={styles.message}>{props.message}</Text>

      {props.loader == true ? (
        <ActivityIndicator size={'large'} color={'#000'} />
      ) : (
        <TouchableOpacity
          style={{marginTop: 10}}
          onPress={() => props.add_record()}>
          <Image
            style={{
              alignSelf: 'center',
              width: buttonWidth,
              height: 184 * buttonratio,
            }}
            source={require('../../../assets/done.png')}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fullWidthInputContainer: {
    width: (88 / 100) * width,
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  halfWidthInputContainer: {
    width: (88 / 100) * width,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#000',
    fontWeight: '500',
    fontSize: 13,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: '#F1F6F8',
    borderRadius: 6,
    paddingHorizontal: 13,
    paddingVertical: 8,
    color: '#000',
    fontWeight: '600',
  },
  text: {
    position: 'absolute',
    top: '48%',
    alignSelf: 'flex-end',
    paddingRight: 13,
    fontWeight: '500',
    color: '#000',
  },
  message: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 10,
    color: '#f00',
  },
});
export default Form;
