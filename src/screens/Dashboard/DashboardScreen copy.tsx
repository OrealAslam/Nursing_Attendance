import {PermissionsAndroid, ImageBackground, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import DashboardHeader from './components/DashboardHeader';
import DashboardContent from './components/DashboardContent';
import DashboardFooter from './components/DashboardFooter';
import ShiftCompleteModel from '../../components/ShiftCompleteModel';
import StartTimerModel from '../../components/StartTimerModel';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  get_shift_status,
  formatTimeDifference,
  end_shift,
  start_shift,
  get_async_data,
  get_history,
  set_async_data,
} from '../../Helper/AppHelper';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
// import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/native';
import OverlayLoader from '../../components/OverlayLoader';

const DashboardScreen = ({navigation}: {navigation: any}) => {
  const {isConnected} = useNetInfo();
  const isFocused = useIsFocused();
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
  const [locationaccess, setlocationaccess] = useState(false);
  const [shiftstartat, setshiftstartat] = useState('--:--');
  const [shiftendat, setshiftendat] = useState('--:--');
  const [totalwotking, settotalwotking] = useState('--:--');
  const [loader, setloader] = useState(true);

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
      // API call to start shift
      setloader(true);
      // check_for_offline_start();
      let start_date = moment().format('Y-M-D HH:mm:ss');
      console.log(start_date);
      setshiftendat('--:--');
      if (isConnected) {
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
          await totalWorkingHours();
        }
      } else {
        await check_for_offline_attendence();
        setshiftstatus('started');
      }
      setloader(false);
    }
    if (shiftstatus == 'ended' && click == 'no') {
      setshiftstatus('ended');
    }

    // trying to end shift
    if (shiftstatus == 'started' && click == 'yes') {
      // API call to end shift
      setloader(true);
      let end_date = moment().format('Y-M-D HH:mm:ss');
      setshiftendat(moment().format('hh:mm a'));
      await set_async_data('shift_end_time', end_date);
      if (isConnected) {
        let response = await end_shift(
          leadid,
          attendenceid,
          longitude,
          latitude,
          end_date,
          shiftTime,
        );
        if (response.status == 'success') {
          setshiftstatus('ended');
          setloader(false);
          await totalWorkingHours();
        } else {
          setshiftstatus('ended');
          setloader(false);
        }
      } else {
        setshiftstatus('ended');
        setloader(false);
        await check_for_offline_attendence();
      }
      setloader(false);
    }
    if (shiftstatus == 'started' && click == 'no') {
      setshiftstatus('started');
    }
  };

  const check_for_offline_attendence = async () => {
    // check if attendence is already started or not
    let start = await get_async_data('shift_start_time');
    let end = await get_async_data('shift_end_time');
    if (start != null) {
      setshiftstatus('started');
      setshiftstartat(moment(start).format('HH:mm A'));
    }
    if (end != null) {
      setshiftstatus('ended');
      setshiftendat(moment(end).format('HH:mm A'));
    }
  };

  const access_device_location = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permission Required',
          message: 'Nursing Attendence wants to access your location',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            setlatitude(position.coords.latitude);
            setlongitude(position.coords.longitude);
            setlocationaccess(true);
          },
          error => {
            setlocationaccess(false);
          },
        );
      } else {
        setlocationaccess(false);
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.warn('Error', err);
    }
  };

  useEffect(() => {
    (async () => {
      setloader(true);
      if (isConnected) {
        await check_for_offline_attendence();
        totalWorkingHours();
        let request = await get_shift_status();
        if (request.status == 'success') {
          setshiftstartat(
            moment(request.attendance_Status.start_time).format('hh:mm a'),
          );
          let status = request.attendance_Status.status;
          setleadid(request.data.lead_id);
          await set_async_data('lead_id', request.data.lead_id);
          setattendenceid(request.attendance_Status.attendance_id);
          await access_device_location();
          setshiftTime(request.data.shift_status);
          if (status == 'ended') {
            setshiftstatus('ended');
            setshiftstartat('--:--');
          } else {
            setshiftstarttime(request.attendance_Status.start_time);
            setshiftstatus(status);
            setshiftendat('--:--');
            let attendenceNoted = request.attendance_Status.start_time;
            let now = moment(new Date());
            const totalDuration = moment.duration(now.diff(attendenceNoted));
            settotalwotking(
              formatTime(totalDuration.hours(), totalDuration.minutes()),
            );
            setworkTime(
              formatTimeDifference(
                totalDuration.hours(),
                totalDuration.minutes(),
                totalDuration.seconds(),
              ),
            );
          }
          setloader(false);
        } else {
          Alert.alert('Error', 'Server Error');
        }
      } else {
        await access_device_location();
        // check for offline pending attendence
        setloader(false);
        await check_for_offline_attendence();
      }
    })();
  }, [isFocused, isConnected]);

  const formatTime = (hours: any, minutes: any) => {
    let h = hours.toString();
    let m = minutes.toString();

    if (h.length < 2) {
      h = '0' + hours.toString();
    }
    if (m.length < 2) {
      m = '0' + minutes;
    }
    return `${h}:${m}`;
  };

  const totalWorkingHours = async () => {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in 'YYYY-MM-DD' format
    let user_id = await get_async_data('user_id');
    const response = await get_history(user_id);
    if (response.status == 'success') {
      if (response.data.length > 0) {
        let object = response.data;
        const objectsWithTodayDate = object.filter(
          (obj: any) => obj.created_at.slice(0, 10) === today,
        );
        if (objectsWithTodayDate.length > 0) {
          settotalwotking(objectsWithTodayDate[0].time_duration);
        }
      }
    }
  };

  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={require('../../assets/appbackground.png')}>
      <DashboardHeader navigateScreen={navigateScreen} />

      <DashboardContent
        shiftstatus={shiftstatus}
        setstarttimermodel={setstarttimermodel}
        starttimermodel={starttimermodel}
        workTime={workTime}
        shiftendat={shiftendat}
        shiftstartat={shiftstartat}
        totalwotking={totalwotking}
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
          locationaccess={locationaccess}
        />
      )}

      {loader && <OverlayLoader />}
    </ImageBackground>
  );
};

export default DashboardScreen;
