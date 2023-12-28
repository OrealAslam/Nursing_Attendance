import {PermissionsAndroid, ImageBackground} from 'react-native';
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
// import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/native';

const DashboardScreen = ({navigation}: {navigation: any}) => {
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
      setshiftstartat(moment().format('HH:mm'));
      let start_date = moment().format('Y-M-D HH:mm:ss');
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
    if (shiftstatus == 'ended' && click == 'no') {
      setshiftstatus('ended');
    }

    // trying to end shift
    if (shiftstatus == 'started' && click == 'yes') {
      // API call to end shift
      let end_date = moment().format('Y-M-D HH:mm:ss');
      setshiftendat(moment().format('HH:mm'));
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
      }
    }
    if (shiftstatus == 'started' && click == 'no') {
      setshiftstatus('started');
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
            console.log(locationaccess);
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
      let request = await get_shift_status();
      if (request.status == 'success') {
        setshiftstartat(
          moment(request.attendance_Status.start_time).format('HH:mm'),
        );
        let status = request.attendance_Status.status;
        setleadid(request.data.lead_id);
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
          settotalwotking(formatTime(totalDuration.hours(), totalDuration.minutes()));
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
  }, [isFocused]);

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
    </ImageBackground>
  );
};
export default DashboardScreen;
