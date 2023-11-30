import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

const useTimeUpdater = (initialTime: any) => {
  const [currentTime, setCurrentTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeArray = currentTime.split(':').map(Number);
      let [hours, minutes, seconds] = timeArray;

      seconds += 1;
      if (seconds === 60) {
        seconds = 0;
        minutes += 1;
        if (minutes === 60) {
          minutes = 0;
          hours += 1;
          if (hours === 24) {
            hours = 0;
          }
        }
      }

      const updatedTime = `${String(hours).padStart(2, '0')}:${String(
        minutes,
      ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setCurrentTime(updatedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  return currentTime;
};

// Example usage in a functional component
const TimerHook = () => {
  const currentTime = useTimeUpdater('13:59:40');

  return (
    <View>
      <Text>Current Time:</Text>
      <Text>{currentTime}</Text>
    </View>
  );
};

export default TimerHook;
