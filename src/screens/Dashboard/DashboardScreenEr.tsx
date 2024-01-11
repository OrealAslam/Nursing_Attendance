import {PermissionsAndroid, ImageBackground, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import DashboardHeader from './components/DashboardHeader';
import DashboardContent from './components/DashboardContent';
import DashboardFooter from './components/DashboardFooter';
import ShiftCompleteModel from '../../components/ShiftCompleteModel';
import {useNetInfo} from '@react-native-community/netinfo';
import StartTimerModel from '../../components/StartTimerModel';
import {
  get_shift_status,
  formatTimeDifference,
  end_shift,
  start_shift,
  free_shift,
  get_async_data,
  get_history,
  set_async_data,
  submit_offline_attendence_array,
  BASE_URL,
  END_SHIFT,
} from '../../Helper/AppHelper';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
// import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/native';
import OverlayLoader from '../../components/OverlayLoader';
import StartFreeTimer from '../../components/StartFreeTimer';

const DashboardScreen = ({navigation}: {navigation: any}) => {
  const isFocused = useIsFocused();
  const {isConnected} = useNetInfo();
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
  const [showmodel, setshowmodel] = useState(false);

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  const updateShift = (status: any) => {
    // start / stop shift according to status(yes/no)
    checkingShiftStatus(status);
    setstarttimermodel(false);
  };

  const checkingShiftStatus = async (click: string) => {
    let leadid = await get_async_data('lead_id');
    let user_id = await get_async_data('user_id');
    let attendenceid = await get_async_data('attendance_id');
    let shift_time = await get_async_data('shift_time');
    let online_start_time = await get_async_data('online_start_time');
    // trying to start shift
    if (shiftstatus == 'ended' && click == 'yes') {
      // API call to start shift
      setloader(true);
      setshiftstartat(moment().format('HH:mm'));
      let start_date = moment().format('YYYY-MM-DD hh:mm:ss');

      if (isConnected) {
        let response = await start_shift(
          leadid,
          longitude,
          latitude,
          start_date,
          shiftTime,
        );
        if (response.status == 'success') {
          await set_async_data('attendance_id', response.attendance_id);
          await set_async_data('online_start_time', start_date);
          setshiftstatus('started');
          setshiftendat('--:--');
          setshiftstartat(moment().format('hh:mm a'));
          setloader(false);
          await totalWorkingHours();
        }
        if (response.status == 'error') {
          setshiftstatus('ended');
          Alert.alert('Error', response.message);
          setloader(false);
          await totalWorkingHours();
        }
      } else {
        setshiftstatus('started');
        await set_async_data(
          'start_time',
          moment().format('YYYY-MM-DD hh:mm:ss'),
        );
        setshiftendat('--:--');
        setshiftstartat(moment().format('hh:mm a'));
        console.log('offline start ');
        setloader(false);
      }
    }
    if (shiftstatus == 'ended' && click == 'no') {
      setshiftstatus('ended');
    }

    // trying to end shift
    if (shiftstatus == 'started' && click == 'yes') {
      // API call to end shift
      if (isConnected) {
        setloader(true);
        let end_date = moment().format('YYYY-MM-DD hh:mm:ss');

        let response = await end_shift(
          leadid,
          attendenceid,
          longitude,
          latitude,
          end_date,
          shiftTime,
        );
        if (response.status == 'success') {
          await set_async_data('online_start_time', null);
          setshiftstatus('ended');
          setshiftendat(moment().format('hh:mm a'));
          setloader(false);
          await totalWorkingHours();
        } else {
          setshiftstatus('started');
          setloader(false);
          await totalWorkingHours();
        }
      } else {
        setloader(true);
        let end_date = moment().format('YYYY-MM-DD hh:mm:ss');
        setshiftendat(moment().format('hh:mm a'));
        await set_async_data('end_time', end_date);
        // trying to end free shift
        if (shift_time == 'free') {
          await set_async_data(
            'start_time',
            moment().format('YYYY-MM-DD hh:mm:ss'),
          );
          setshiftstartat(moment().format('hh:mm a'));
          setshiftstatus('ended');
          setloader(false);
        }
        // check if start_time exists
        // if exists its mean k checkIn/checkOut 2no hi without internet connectivty perform howa ha
        let started = await get_async_data('start_time');
        if (started != null) {
          await set_async_data('end_time', end_date);
          let arr = {
            start: started,
            end: end_date,
            longitude: longitude,
            latitude: latitude,
            lead_id: leadid,
            staff_id: user_id,
            shift_status: shiftTime,
          };
          // console.log(JSON.stringify(arr))
          let attendence_history = await get_async_data('attendence_history');
          let attendence_history_data = JSON.parse(attendence_history);
          console.log('OLD HISTORY', attendence_history_data);
          attendence_history_data.pair.push(arr);

          await set_async_data(
            'attendence_history',
            JSON.stringify(attendence_history_data),
          );
          console.log('UPDATED HISTORY', attendence_history_data);
        }
        // online start and offline end
        if(online_start_time != null) {
          setshiftendat('ended');
        }
        setshiftstatus('ended');
        setloader(false);
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

  const submit_offline_started_attendence = async (started_offline: any) => {
    // jb internet connect hoga then jo attendence start ki thi offline k time uski server to request share kry ge.
    let leadid = await get_async_data('lead_id');
    let shiftTime = await get_async_data('shift_time');
    let free_attendence_offline = await get_async_data(
      'free_attendence_offline',
    );
    if (free_attendence_offline == 'saved') {
      // check for free shift offline attendence start
      await free_shift(longitude, latitude, started_offline);
    }

    if (started_offline != null) {
      let response = await start_shift(
        leadid,
        longitude,
        latitude,
        started_offline,
        shiftTime,
      );
      if (response.status == 'success') {
        await set_async_data('attendence_id', response.attendence_id);
        setshiftstatus('started');
        setshiftendat('--:--');
        setshiftstartat(moment(started_offline).format('hh:mm a'));
        await set_async_data('start_time', null);
        await totalWorkingHours();
      }
    }
  };

  const submit_offline_ended_attendence = async () => {
    // jb internet connect hoga then jo attendence end ki thi offline k time uski server to request send kry ge.
    let end_date = await get_async_data('end_time');
    let attendenceid = await get_async_data('attendence_id');
    let shiftTime = await get_async_data('shift_time');
    let lead_id = await get_async_data('lead_id');
    setshiftendat(moment(end_date).format('hh:mm a'));
    if (end_date != null) {
      let response = await end_shift(
        lead_id,
        attendenceid,
        longitude,
        latitude,
        end_date,
        shiftTime,
      );
      if (response.status == 'success') {
        console.log('submited offline attendence')
        setshiftstatus('ended');
        setloader(false);
        await totalWorkingHours();
      } else {
        console.log('not able to submit offline attendence');
      }
    }
  };

  useEffect(() => {
    (async () => {
      setloader(true);
      let online_start_time = await get_async_data('online_start_time');
      let started_offline = await get_async_data('start_time');
      let ended_offline = await get_async_data('end_time');
      if (isConnected) {
        await access_device_location();
        let id = await get_async_data('user_id');        
        console.log('offline end', ended_offline)
        if (started_offline != null) {
          await submit_offline_started_attendence(started_offline);
        }
        if (ended_offline != null) {
          await submit_offline_ended_attendence();
        }

        if (online_start_time != null) {
          setshiftstatus('started');
        }
        totalWorkingHours();
        let request = await get_shift_status();
        if (request.status == 'success') {
          await set_async_data('free_attendence_marked', null);
          await set_async_data('lead_id', request.data.lead_id);
          await set_async_data('shift_time', request.data.shift_status);
          await totalWorkingHours();
          let status = request.attendance_Status.status;
          setleadid(request.data.lead_id);
          if (status == 'started') {
            setattendenceid(request.attendance_Status.attendance_id);
            await set_async_data(
              'attendance_id',
              request.attendance_Status.attendance_id,
            );
            setshiftstartat(
              moment(request.attendance_Status.start_time).format('hh:mm a'),
            );
          }
          if (status == 'ended') {
            setshiftstatus('ended');
            setshiftendat('--:--');
          }
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
            // setworkTime(
            //   formatTimeDifference(
            //     totalDuration.hours(),
            //     totalDuration.minutes(),
            //     totalDuration.seconds(),
            //   ),
            // );
          }
          await check_for_offline_attendence();
          setloader(false);
        } else {
          // free attendence
          await set_async_data('shift_time', 'free');
          setshiftTime('free');
          setloader(false);
        }
        await submit_offline_attendence_array();
      } else {
        await access_device_location();
        setloader(false);
        if (online_start_time != null) {
          setshiftstatus('started');
          setshiftstartat(moment(online_start_time).format('hh:mm a'))
        }

        if(started_offline != null) {
          setshiftstatus('started');
          setshiftstartat(moment(started_offline).format('hh:mm a'))
        }

        if(ended_offline != null) {
          setshiftstatus('ended');
          setshiftendat(moment(started_offline).format('hh:mm a'))
        }
      }
      setloader(false);
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
        const objectsWithTodayDate = response.data.filter(
          (obj: any) => obj.created_at.slice(0, 10) === today,
        );
        settotalwotking(objectsWithTodayDate[0].time_duration);
      }
    }
  };

  const check_for_offline_attendence = async () => {
    let end_time = await get_async_data('end_time');
    let leadid = await get_async_data('lead_id');
    let shiftTime = await get_async_data('shift_time');
    let attendenceid = await get_async_data('attendance_id');

    if (end_time != null) {
      let response = await end_shift(
        leadid,
        attendenceid,
        longitude,
        latitude,
        end_time,
        shiftTime,
      );
      console.log('Response offline', response);
      if (response.status == 'success') {
        await totalWorkingHours();
      }
    }
  };

  const freeAttendence = async () => {
    let staff_id = await get_async_data('user_id');
    let obj = {
      status: 'free',
      id: null,
      staff_id: staff_id,
      lead_id: null,
      longitude: longitude,
      latitude: latitude,
      start_time: moment().format('YYYY-MM-DD hh:mm:ss'),
      shift_status: 'Day Shift',
    };
    if (isConnected) {
      const request = await fetch(BASE_URL + 'attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(obj),
      });
      const resposne = await request.json();
      if (resposne.status == 'success') {
        await set_async_data('free_attendence_marked', 'marked');
      }
      if (resposne.status == 'error') {
        Alert.alert('Message', resposne.message);
      }
    } else {
      await set_async_data(
        'start_time',
        moment().format('YYYY-MM-DD hh:mm:ss'),
      );
      await set_async_data('free_attendence_offline', 'saved');
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
        setshowmodel={setshowmodel}
        shiftTime={shiftTime}
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

      {showmodel && (
        <StartFreeTimer
          freeAttendence={freeAttendence}
          setshowmodel={setshowmodel}
        />
      )}

      {loader && <OverlayLoader />}
    </ImageBackground>
  );
};
export default DashboardScreen;
