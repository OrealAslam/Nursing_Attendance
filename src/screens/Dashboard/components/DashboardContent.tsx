import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ContentStyle} from '../dashboardstyles';
import moment from 'moment';
import {formatTimeDifference} from '../../../Helper/AppHelper';

const DashboardContent = (props: any) => {
  // const useIncrementTime = () => {
  //   if(props.workTime != '') {
  //     let t = moment(props.workTime, 'hh:mm:ss');
  //     t = moment(
  //       formatTimeDifference(t.hours(), t.minutes(), t.seconds()),
  //       'hh:mm:ss',
  //     );
  //     console.log('STR t', t)
  //     const [currentTime, setCurrentTime] = useState(new Date(t));

  //     useEffect(() => {
  //       const intervalID = setInterval(() => {
  //         setCurrentTime(prevTime => {
  //           const newTime = new Date(prevTime.getTime() + 1000); // Adding 1 second in milliseconds
  //           return newTime;
  //         });
  //       }, 1000);

  //       return () => {
  //         clearInterval(intervalID); // Clear interval on component unmount
  //       };
  //     }, []); // Run only once on mount

  //     return currentTime;
  //   }
  // };
  // const updatedTime = useIncrementTime();

  const useTimeUpdater = (initialTime: any) => {
    if (initialTime != '') {
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
    }
  };

  const updatedTime = useTimeUpdater(props.workTime.toString());

  return (
    <View style={ContentStyle.container}>
      <TouchableOpacity onPress={() => props.setstarttimermodel(true)}>
        <Image
          style={ContentStyle.timerButton}
          source={props.shiftstatus == 'started' ? require('../../../assets/clockout.png') : require('../../../assets/clockin.png')}
        />
      </TouchableOpacity>

      <View style={ContentStyle.infoContainer}>
        <View style={ContentStyle.column}>
          <Image
            style={ContentStyle.icon}
            source={require('../../../assets/checkin.png')}
          />
          <Text style={ContentStyle.time}>{props.shiftstartat}</Text>
          <Text style={ContentStyle.desc}>Clock In</Text>
        </View>
        <View style={ContentStyle.column}>
          <Image
            style={ContentStyle.icon}
            source={require('../../../assets/checkout.png')}
          />
          <Text style={ContentStyle.time}>{props.shiftendat}</Text>
          <Text style={ContentStyle.desc}>Clock Out</Text>
        </View>
        <View style={ContentStyle.column}>
          <Image
            style={ContentStyle.icon}
            source={require('../../../assets/interval.png')}
          />
          <Text style={ContentStyle.time}>{props.totalwotking}</Text>
          <Text style={ContentStyle.desc}>Working Hours</Text>
        </View>
      </View>
    </View>
  );
};

export default DashboardContent;
