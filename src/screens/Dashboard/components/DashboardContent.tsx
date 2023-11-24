import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ContentStyle} from '../dashboardstyles';
import moment from 'moment';

const DashboardContent = (props: any) => {
  const [time, settime] = useState(moment().format('hh:mm:ss A'));

  const live_clock = () => {
    let current_time = setInterval(() => {
      settime(moment().format('hh:mm:ss A'));
    }, 1000);
  };

  useEffect(()=>{
    live_clock();
  }, [time]);


  return (
    <View style={ContentStyle.container}>
      <TouchableOpacity onPress={() => props.setstarttimermodel(true)}>
        <ImageBackground
          style={ContentStyle.timerButton}
          source={require('../../../assets/timerbutton.png')}>
          <Text style={ContentStyle.heading}>
            {props.shiftstatus == 'end' ? `Start` : `End`}
          </Text>
          <Text style={ContentStyle.timer}>
            {props.shiftstatus == 'end' ? `00:00:00` : `${time}`}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardContent;
