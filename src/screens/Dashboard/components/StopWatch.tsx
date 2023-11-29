import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment'; // Import Moment.js
import {parseTimeStringToDate} from '../../../Helper/AppHelper';

const StopWatch = (props: any) => {
  const [time, setTime] = useState(moment.duration(0)); // Using Moment.js duration for time
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(props.workTime);

  const startStopwatch = () => {
    startTimeRef.current = Date.now() - time.asMilliseconds();

    intervalRef.current = setInterval(() => {
      setTime(moment.duration(Date.now() - startTimeRef.current));
    }, 1000);
    setRunning(true);
  };

  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(moment.duration(0));
    setRunning(false);
  };

  const resumeStopwatch = () => {
    startTimeRef.current = Date.now() - time.asMilliseconds();
    intervalRef.current = setInterval(() => {
      setTime(moment.duration(Date.now() - startTimeRef.current));
    }, 1000);
    setRunning(true);
  };

  // Get hours, minutes, and seconds from the time duration
  const hours = time.hours().toString().padStart(2, '0');
  const minutes = time.minutes().toString().padStart(2, '0');
  const seconds = time.seconds().toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>
        {hours}:{minutes}:{seconds}
      </Text>
      <View style={styles.buttonContainer}>
        {running ? (
          <TouchableOpacity
            style={[styles.button, styles.pauseButton]}
            onPress={pauseStopwatch}>
            <Text style={styles.buttonText}>Pause {props.workTime}</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.startButton]}
              onPress={startStopwatch}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={resetStopwatch}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </>
        )}
        {!running && (
          <TouchableOpacity
            style={[styles.button, styles.resumeButton]}
            onPress={resumeStopwatch}>
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    color: 'green',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: 'blue',
  },
  timeText: {
    fontSize: 48,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startButton: {
    backgroundColor: '#2ecc71',
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    marginRight: 10,
  },
  pauseButton: {
    backgroundColor: '#f39c12',
  },
  resumeButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StopWatch;
