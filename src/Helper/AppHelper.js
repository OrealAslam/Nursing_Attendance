// This file contains all the confidential information abou the App along with API calls
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'https://portal.plancare.pk/public/api/';
export const IMAGE_BASE_URL = 'https://portal.plancare.pk/';

global.DateArray = [];

const LOGIN_NURSE = BASE_URL + 'login_nurse';
const GET_HISTORY = BASE_URL + 'get_history';
const UPDATE_PASSWORD = BASE_URL + 'update_password';
const GET_NURSE_STATUS = BASE_URL + 'get_nures_status';
const SHIFT_STATUS = BASE_URL + 'get_nures_status';
const END_SHIFT = BASE_URL + 'attendance';
const START_SHIFT = BASE_URL + 'attendance';
const LEAVE_REQUEST = BASE_URL + 'leave_request';
const GET_USER_LEAVE_REQUEST = BASE_URL + 'get_user_leave_request';
export const UPDATE_PROFILE = BASE_URL + 'update_profile';

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
  let name = await get_async_data('username');
  let designation = await get_async_data('designation');
  let email = await get_async_data('email');
  let dob = await get_async_data('dob');
  let address = await get_async_data('address');
  let hiring_date = await get_async_data('hiring_date');
  let profile_picture = await get_async_data('profile_picture');

  return {
    name: name,
    designation: designation,
    email: email,
    dob: dob,
    address: address,
    hiring_date: hiring_date,
    profile_picture: profile_picture,
  };
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
  // if (Object.keys(data.image).length > 0) {
  //   const request = await fetch(UPDATE_PROFILE, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       'X-Requested-With': 'XMLHttpRequest',
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   const response = await request.json();
  //   return response;
  // } else {
  const request = await fetch(UPDATE_PROFILE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(data),
  });
  const response = await request.json();
  if (response.status == 'success') {
    await set_async_data('username', data.name);
    await set_async_data('dob', data.dob);
    await set_async_data('address', data.address);
  }
  return response;
  // }
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
  attendenceid,
  longitude,
  latitude,
  start_time,
  shift_status,
) => {
  const user_id = await get_async_data('user_id');

  let obj = {
    status: 'start',
    id: attendenceid,
    staff_id: user_id,
    lead_id: leadid,
    longitude: longitude,
    latitude: latitude,
    start_time: start_time,
    shift_status: shift_status,
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

// -----------------------------------------------------------------------------------------------------------------

// CUCTOM DATE PICKER HELPER FUNCTIONS

export const getMonthName = dateString => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const parts = dateString.split('-');
  const monthNumber = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (monthNumber >= 1 && monthNumber <= 12 && day >= 1 && day <= 31) {
    const monthName = months[monthNumber - 1];
    let name = monthName + ', ' + day;
    return name.toString();
  } else {
    return 'Invalid Date';
  }
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const globalDate = new Date();

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const addMonth = month => {
  if (month == 11) {
  }
};

export const subMonth = month => {
  if (month == 1) {
  }
};
