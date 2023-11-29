import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ContentStyle} from '../dashboardstyles';
import moment from 'moment';
import {formatTimeDifference} from '../../../Helper/AppHelper';

const DashboardContent = (props: any) => {

  const useIncrementTime = () => {
    let t = moment(props.workTime, 'hh:mm:ss');
    t = moment(
      formatTimeDifference(t.hours(), t.minutes(), t.seconds()),
      'hh:mm:ss',
    );
    const [currentTime, setCurrentTime] = useState(new Date(t));

    useEffect(() => {
      const intervalID = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = new Date(prevTime.getTime() + 1000); // Adding 1 second in milliseconds
          return newTime;
        });
      }, 1000);

      return () => {
        clearInterval(intervalID); // Clear interval on component unmount
      };
    }, []); // Run only once on mount

    return currentTime;
  };

  const updatedTime = useIncrementTime();

  return (
    <View style={ContentStyle.container}>
      <TouchableOpacity onPress={() => props.setstarttimermodel(true)}>
        <ImageBackground
          style={ContentStyle.timerButton}
          source={require('../../../assets/timerbutton.png')}>
          <Text style={ContentStyle.heading}>
            {props.shiftstatus == 'ended' ? `Start` : `End`}
          </Text>
          <Text style={ContentStyle.timer}>
            {props.shiftstatus == 'ended'
              ? `00:00:00`
              : `${moment(updatedTime).format('hh:mm:ss')}`}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardContent;
