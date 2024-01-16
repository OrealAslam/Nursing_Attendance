import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import {set_async_data} from '../Helper/AppHelper';

const {width, height} = Dimensions.get('window');

const timerImgWidth = width - 190;
const timerImgRatio = timerImgWidth / 353;

const StartFreeTimer = (props: any) => {
  const [loader, setloader] = useState(false);

  const updateShift = async (status: any) => {
    if (status == 'yes') {
      await props.freeattendance();
      await set_async_data('free_attendance_marked', 'marked');
      setloader(true);
    }
    props.setshowmodel(false);
  };

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

        <Text
          style={{
            color: '#202020',
            fontWeight: '600',
            fontSize: 17,
            textAlign: 'center',
            marginVertical: 10,
          }}>
          Verification
        </Text>
        <Text style={styles.heading}>
          Are you sure you want to start your Attendance?
        </Text>

        <View style={styles.buttonContainer}>
          {loader == true ? (
            <ActivityIndicator
              size={'large'}
              style={styles.loader}
              color={'#e4e4e4'}
            />
          ) : (
            <>
              <TouchableOpacity onPress={() => updateShift('yes')}>
                <Image
                  style={{width: 93.13, height: 36.5}}
                  source={require('../assets/yes.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateShift('no')}>
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
  loader: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
export default StartFreeTimer;
