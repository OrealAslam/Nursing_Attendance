import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import DashboardHeader from './components/DashboardHeader';
import DashboardContent from './components/DashboardContent';
import DashboardFooter from './components/DashboardFooter';
import ShiftCompleteModel from '../../components/ShiftCompleteModel';
import StartTimerModel from '../../components/StartTimerModel';
import {
  get_shift_status,
  formatTimeDifference,
  end_shift,
  start_shift,
} from '../../Helper/AppHelper';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';

const DashboardScreen = ({navigation}: {navigation: any}) => {
  const [starttimermodel, setstarttimermodel] = useState(false);
  const [showshiftcomplete, setshowshiftcomplete] = useState(false);
  const [shiftstatus, setshiftstatus] = useState('ended');
  const [shiftstarttime, setshiftstarttime] = useState('');
  const [workTime, setworkTime] = useState('');
  const [leadid, setleadid] = useState(null);
  const [attendenceid, setattendenceid] = useState(null);
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [shiftTime, setshiftTime] = useState('');

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  const updateShift = (status: any) => {
    // start / stop shift according to status(yes/no)
    checkingShiftStatus(status);
    setstarttimermodel(false);
  };

  const checkingShiftStatus = async (click: string) => {
    // trying to start shift
    if (shiftstatus == 'ended' && click == 'yes') {
      if (shiftstatus != 'ended') {
        // API call to start shift
        let start_date = moment().format('Y-m-d HH:mm:ss');
        let response = await start_shift(
          leadid,
          attendenceid,
          longitude,
          latitude,
          start_date,
          shiftTime,
        );
        if (response.status == 'success') {
          setshiftstatus('started');
        }
      }
    }
    if (shiftstatus == 'ended' && click == 'no') {
      setshiftstatus('ended');
    }

    // trying to end shift
    if (shiftstatus == 'started' && click == 'yes') {
      // API call to end shift
      let end_date = moment().format('Y-m-d HH:mm:ss');
      let response = await end_shift(
        leadid,
        attendenceid,
        longitude,
        latitude,
        end_date,
        shiftTime,
      );
      console.log('API RES :', response);
      if (response.status == 'success') {
        setshiftstatus('ended');
      }
    }
    if (shiftstatus == 'started' && click == 'no') {
      setshiftstatus('started');
    }
  };

  function calculateTimeDifference(startDateString: any, endDateString: any) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const differenceInMillis = Math.abs(
      endDate.getTime() - startDate.getTime(),
    );

    // Convert milliseconds to human-readable format (hours, minutes, seconds)
    const hours = Math.floor(differenceInMillis / (1000 * 60 * 60));
    const minutes = Math.floor(
      (differenceInMillis % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((differenceInMillis % (1000 * 60)) / 1000);

    return {hours, minutes, seconds};
  }

  useEffect(() => {
    (async () => {
      let request = await get_shift_status();
      if (request.status == 'success') {
        let status = request.attendance_Status.status;
        setleadid(request.data.lead_id);
        setattendenceid(request.attendance_Status.attendance_id);
        Geolocation.getCurrentPosition(info => {
          setlatitude(info.coords.latitude);
          setlongitude(info.coords.longitude);
        });
        setshiftTime(request.data.shift_status);
        if (status == 'ended') {
          setshiftstatus('ended');
        } else {
          setshiftstarttime(request.attendance_Status.start_time);
          setshiftstatus(status);
          let attendenceNoted = request.attendance_Status.start_time;
          let now = moment(new Date());
          const totalDuration = moment.duration(now.diff(attendenceNoted));
          // console.log(calculateTimeDifference(attendenceNoted, now))
          setworkTime(
            formatTimeDifference(
              totalDuration.hours(),
              totalDuration.minutes(),
              totalDuration.seconds(),
            ),
          );
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <DashboardHeader navigateScreen={navigateScreen} />

      <DashboardContent
        setstarttimermodel={setstarttimermodel}
        starttimermodel={starttimermodel}
        shiftstatus={shiftstatus}
        workTime={workTime}
      />

      <DashboardFooter navigateScreen={navigateScreen} />
      {showshiftcomplete && (
        <ShiftCompleteModel setshowshiftcomplete={setshowshiftcomplete} />
      )}

      {starttimermodel && (
        <StartTimerModel
          updateShift={updateShift}
          shiftstatus={shiftstatus}
          shiftstarttime={shiftstarttime}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1E70',
  },
});

export default DashboardScreen;