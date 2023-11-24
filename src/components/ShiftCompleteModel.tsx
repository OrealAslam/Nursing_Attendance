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
      animation="bounceInDown"
      style={styles.container}
      duration={1700}>
      <View style={styles.modelContainer}>
        <Text style={styles.heading}>Shift Completed</Text>

        <View style={styles.shiftDteails}>
          <View style={styles.column1}>
            <Text>Date</Text>
            <Text style={styles.detail}>7/27/2023</Text>
          </View>
          <View style={styles.column1}>
            <Text>Duration</Text>
            <Text style={styles.detail}>07:27:15</Text>
          </View>
          <View style={styles.column1}>
            <Text>Start Time</Text>
            <Text style={styles.detail}>07:27 am</Text>
          </View>
          <View style={styles.column1}>
            <Text>End Time</Text>
            <Text style={styles.detail}>09:15 pm</Text>
          </View>
        </View>

        <TouchableOpacity onPress={()=>props.setshowshiftcomplete(false)}>
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
    width: (84 / 100) * width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    COLOR: '#2A2A2E',
  },
  shiftDteails: {
    flexDirection: 'column',
    marginVertical: 30,
    padding: 5,
  },
  column1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subHeading: {
    color: '#2A2A2E',
    fontSize: 15,
    fontWeight: '400',
  },
  detail: {
    color: '#2A2A2E',
    fontSize: 14,
    fontWeight: '700',
  },
});
export default ShiftCompleteModel;
