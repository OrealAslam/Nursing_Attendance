import { PermissionsAndroid, ImageBackground, Alert, Platform, Linking, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import DashboardContent from './components/DashboardContent';
import DashboardFooter from './components/DashboardFooter';
import ShiftCompleteModel from '../../components/ShiftCompleteModel';
import { useNetInfo } from '@react-native-community/netinfo';
import StartTimerModel from '../../components/StartTimerModel';
import {
  get_shift_status,
  end_shift,
  start_shift,
  get_async_data,
  get_history,
  set_async_data,
  BASE_URL,
  update_history_array,
  uploadLocalHistory,
  UPLOAD_NURSE_MEDIA,
  get_nurse_status,
  get_leads
} from '../../Helper/AppHelper';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import { useIsFocused } from '@react-navigation/native';
import OverlayLoader from '../../components/OverlayLoader';
import StartFreeTimer from '../../components/StartFreeTimer';


const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const isFocused = useIsFocused();
  const { isConnected } = useNetInfo();
  const [starttimermodel, setstarttimermodel] = useState(false);
  const [showshiftcomplete, setshowshiftcomplete] = useState(false);
  const [shiftstatus, setshiftstatus] = useState('ended');
  const [shiftstarttime, setshiftstarttime] = useState('');
  const [workTime, setworkTime] = useState('');
  const [leadid, setleadid] = useState(null);
  const [attendanceid, setattendanceid] = useState(null);
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [shiftTime, setshiftTime] = useState('');
  const [locationaccess, setlocationaccess] = useState(false);
  const [shiftstartat, setshiftstartat] = useState('--:--');
  const [shiftendat, setshiftendat] = useState('--:--');
  const [totalwotking, settotalwotking] = useState('--:--');
  const [loader, setloader] = useState(true);
  const [showmodel, setshowmodel] = useState(false);
  const [userid, setuserid] = useState(null);

  const [leads, setleads] = useState([]);
  const [lockheader, setlockheader] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Day Shift');
  const [clientname, setclientname] = useState('');
  const [client, setclient] = useState({ address: null, city: null, client_name: null, created_at: null, id: null, patient_name: null, phone_number: null });

  // NotificationSetting.openAppNotificationSettings();

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
      let start_time = moment().format('YYYY-MM-DD hh:mm:ss');
      if (isConnected) {
        let response = await start_shift(
          leadid,
          longitude,
          latitude,
          start_time,
          selectedValue,
          clientname
        );
        if (response.status == 'success') {
          setlockheader(true);
          await set_async_data('start_time_submit_request', 'submitted');
          setshiftstatus('started');
          setloader(false);
          setattendanceid(response.attendaces_id);
          setshiftstartat(moment().format('hh:mm a'));
          await set_async_data(
            'attendance_id',
            response.attendaces_id,
          );
          await set_async_data('start_time', start_time);
          await set_async_data('longitude', longitude);
          await set_async_data('latitude', latitude);
          await set_async_data('lead_id', leadid);
          await set_async_data('shift_time', selectedValue);
          await set_async_data('clientname', clientname);
          setshiftendat('--:--');
          await totalWorkingHours();
        } else {
          // trying to submit free attendance when already exists
          settotalwotking('Free Today');
          Alert.alert('Message', 'Your today attendance already exists.');
          setloader(false);
        }
      } else {
        await set_async_data('start_time', start_time);
        await set_async_data('longitude', longitude);
        await set_async_data('latitude', latitude);
        await set_async_data('start_time_submit_request', 'not submitted');
        // await set_async_data('attendance_id', null);
        setshiftstartat(moment().format('hh:mm a'));
        setshiftendat('--:--');
        setshiftstatus('started');
        setloader(false);
      }
    }
    if (shiftstatus == 'ended' && click == 'no') {
      setshiftstatus('ended');
    }

    // trying to end shift
    if (shiftstatus == 'started' && click == 'yes') {
      // API call to end shift
      setloader(true);
      let leadid = await get_async_data('lead_id');
      console.log('end time lead_id', leadid)
      let endTime = moment().format('YYYY-MM-DD hh:mm:ss');
      if (isConnected) {
        let response = await end_shift(
          leadid,
          attendanceid,
          longitude,
          latitude,
          endTime,
          selectedValue
        );
        if (response.status == 'success') {
          setlockheader(false);
          console.log('ended', response);
          await set_async_data('start_time', null);
          await set_async_data('attendance_id', null);
          await set_async_data('lead_id', null);
          await set_async_data('shift_time', null);
          await set_async_data('clientname', null);
          setshiftstatus('ended');
          setshiftendat(moment().format('hh:mm a'));
          setloader(false);
          await totalWorkingHours();
        } else {
          console.log('unable to end attendance online', response);
        }
        setloader(false);
      } else {
        // check if already started
        let alreadyStarted = await get_async_data('start_time');
        let alreadySubmit = await get_async_data('start_time_submit_request');
        if (alreadyStarted != null && alreadySubmit != 'submitted') {
          let lead_id = await get_async_data('lead_id');
          await update_history_array(
            alreadyStarted,
            endTime,
            lead_id,
            // shiftTime,
            selectedValue
          );
        }
        setshiftendat(moment().format('hh:mm a'));
        await set_async_data('end_time', endTime);
        setshiftendat(moment().format('hh:mm a'));
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
          message: 'Nursing attendance wants to access your location',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('ACCESS_FINE_LOCATION', granted)
      if (granted === 'granted') {
        setlocationaccess(true);
        Geolocation.getCurrentPosition(
          position => {
            setlatitude(position.coords.latitude);
            setlongitude(position.coords.longitude);
          },
          error => {
            console.log('POS DENIED', error);
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
      await access_device_location();
      let start_time = await get_async_data('start_time');
      let end_time = await get_async_data('end_time');
      let lead_id = await get_async_data('lead_id');
      let clientName = await get_async_data('clientname');
      let shift = await get_async_data('shift_time');
      let fcm_token = await get_async_data('fcm_token');
      let user_id = await get_async_data('user_id');
      setuserid(user_id);
      setleadid(lead_id);
      setclientname(clientName);
      setshiftstartat(start_time);
      setSelectedValue(shift);

      if (isConnected) {
        let request = await get_shift_status();
        await uploadLocalHistory();

        let leadsData = await get_leads();
        setleads(leadsData.data || []); // Ensure an array is set

        if (request.status == 'success') {
          await set_async_data('free_attendance_marked', null);
          let status = request.attendance_Status.status;

          // await set_async_data('lead_id', request.data.lead_id);
          // await set_async_data('shift_time', request.data.shift_status);
          setshiftTime(request.data.shift_status);
          // console.log('CLIENT NAME :- ', request.data.clent_name)
          // setleadid(request.data.lead_id);
          if (status == 'started') {
            setlockheader(true);
            setattendanceid(request.attendance_Status.attendance_id);
            await set_async_data('start_time_submit_request', 'submitted');
            if (end_time != null) {
              // check if user try to end attendance offline
              let submit = await submit_offline_end_attendence(
                end_time,
                request.attendance_Status.attendance_id,
              );
              console.log('offline end request', submit);
              if (submit.status == 'success') {
                console.log('submitted offline ended attendance');
                await set_async_data('attendence_id', null);
                await set_async_data('start_time', null);
                await set_async_data('end_time', null);
                await set_async_data('start_time_submit_request', null);
                await set_async_data('clientname', null);
                await set_async_data('lead_id', null);
                setshiftstatus('ended');
                setshiftstartat('--:--');
              }
            } else {
              console.log(
                'end time null',
                request.attendance_Status.attendance_id,
              );
              await set_async_data(
                'attendance_id',
                request.attendance_Status.attendance_id,
              );
              await set_async_data(
                'start_time',
                request.attendance_Status.start_time,
              );
              setshiftstarttime(request.attendance_Status.start_time);
              setshiftTime(request.data.shift_status);
              setshiftstatus(status);
              setshiftendat('--:--');
              let attendanceNoted = request.attendance_Status.start_time;
              let now = moment(new Date());
              const totalDuration = moment.duration(now.diff(attendanceNoted));
              settotalwotking(
                formatTime(totalDuration.hours(), totalDuration.minutes()),
              );
              setshiftstartat(
                moment(request.attendance_Status.start_time).format('hh:mm a'),
              );
            }
          }

          if (status == 'ended') {
            setlockheader(false);
            setleadid(request.data.lead_id);
            setclientname(request.data.clent_name);
            setSelectedValue(request.data.shift_status);
            await set_async_data('lead_id', request.data.lead_id);
            await set_async_data('shift_time', request.data.shift_status);
            await set_async_data('clientname', request.data.clent_name);
            if (start_time != null) {
              let leadsData = await get_leads();
              // submit offline start attendance here
              console.log('sending start request', start_time);
              let request = await submit_offline_start_attendence(start_time);
              console.log('REQUEST', request);
              if (request.status == 'error') {
                setshiftstatus('ended');
                setshiftstartat('--:--');
              } else {
                console.log('GENERATED ID', request.attendaces_id);
                setattendanceid(request.attendaces_id);
                await set_async_data('start_time_submit_request', 'submitted');
              }
            } else {
              setshiftstatus('ended');
              await set_async_data('attendance_id', null);
              setattendanceid(null);
              setshiftendat('--:--');
            }
          }
        }

        if (request.status == 'error') {
          // Nurse is free
          setshiftTime('Free');
        }
        await totalWorkingHours();
      } else {
        // change checkIn/Out according to start/end Time
        let shift = await get_async_data('shift_time');
        setshiftTime(shift);
        await update_btn_state(start_time, end_time);
        let localHistory = await get_async_data('attendence_history');
      }
      setloader(false);
    })();
  }, [isFocused, isConnected]);

  const submit_offline_start_attendence = async (startTime: any) => {
    let shiftTime = await get_async_data('shift_time');
    let leadid = await get_async_data('lead_id');
    let clientname = await get_async_data('clientname');
    let request = await start_shift(
      leadid,
      longitude,
      latitude,
      startTime,
      shiftTime,
      clientname
    );
    return request;
  };

  const submit_offline_end_attendence = async (
    endTime: any,
    attendenceid: any,
  ) => {
    let shiftTime = await get_async_data('shift_time');
    let leadid = await get_async_data('lead_id');
    let clientname = await get_async_data('clientname');

    let request = await end_shift(
      leadid,
      attendenceid,
      longitude,
      latitude,
      endTime,
      shiftTime
    );
    return request;
  };

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

  const update_btn_state = async (start: any, end: any) => {
    console.log('start', start);
    console.log('end', end);
    if (end != null && start != null) {
      setshiftstatus('ended');
      setshiftendat(moment(end).format('hh:mm a'));
    }
    if (start == null) {
      setshiftstatus('ended');
    }
    if (start != null) {
      setshiftstatus('started');
      setshiftstartat(moment(start).format('hh:mm a'));
    }
  };

  const totalWorkingHours = async () => {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in 'YYYY-MM-DD' format

    let user_id = await get_async_data('user_id');
    const response = await get_history(user_id);
    if (response.status == 'success') {
      if (response.data.length > 0) {
        const objectsWithTodayDate = response.data.filter(
          (obj: any) => obj.created_at === today,
          // (obj: any) => obj.created_at.slice(0, 10) === today,
        );
        settotalwotking(objectsWithTodayDate[0].time_duration);
      } else {
        settotalwotking('00:00:00');
      }
    }
  };

  const freeattendance = async () => {
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
    console.log('Free Attendence Obj', obj);
    const request = await fetch(BASE_URL + 'attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(obj),
    });
    const resposne = await request.json();
    console.log('Free Shift API Call', resposne);
    if (resposne.status == 'success') {
      await set_async_data('free_attendance_marked', 'marked');
    }
    if (resposne.status == 'error') {
      Alert.alert('Message', resposne.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: `rgba(96,96,247,1)` }}>
      <DashboardHeader navigateScreen={navigateScreen}
        selectedValue={selectedValue}
        clientname={clientname}
        setclientname={setclientname}
        setSelectedValue={setSelectedValue}
        setclient={setclient}
        client={client}
        lockheader={lockheader}
        availableLeads={leads}
        setleadid={setleadid}
      />

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
          freeattendance={freeattendance}
          setshowmodel={setshowmodel}
        />
      )}

      {loader && <OverlayLoader />}
    </View>
  );
};
export default DashboardScreen;