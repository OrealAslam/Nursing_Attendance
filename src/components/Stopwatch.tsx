import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import moment from 'moment';

const StopWatch = () => {

  function calculateTimeDifference(targetTime:any) {
    // Parse the target time string into a Date object
    const targetDate = new Date(targetTime);

    // Get the current time
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = targetDate.getTime() - currentDate.getTime();

    if (timeDifference <= 0) {
      console.log('Target time has passed.');
      return;
    }

    // Calculate the time difference in seconds
    const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);

    // Function to display next time after every 1 second
    const interval = setInterval(() => {
      const now = new Date();
      const remainingTime = targetDate - now;

      if (remainingTime <= 0) {
        clearInterval(interval);
        console.log('Target time reached!');
        return;
      }

      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      console.log(`Next time in: ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
  }

  // Usage example:
  const targetTime = '2023-11-27 09:27:30'; // Replace this with your desired time in 'Y-M-D hh:mm:ss' format
  console.log(calculateTimeDifference(targetTime));

  return <View></View>;
};

export default StopWatch;
