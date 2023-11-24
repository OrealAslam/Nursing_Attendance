// This file contains all the confidential information abou the App along with API calls
import AsyncStorage from '@react-native-async-storage/async-storage';
export const BASE_URL = 'https://portal.plancare.pk/public/api/';
export const IMAGE_BASE_URL = 'https://portal.plancare.pk/';

const LOGIN_NURSE = BASE_URL + 'login_nurse';
const GET_HISTORY = BASE_URL + 'get_history';
const UPDATE_PASSWORD = BASE_URL + 'update_password';
const GET_NURSE_STATUS = BASE_URL + 'get_nures_status';
const SHIFT_STATUS = BASE_URL + 'get_nures_status';

export const UPDATE_PROFILE = BASE_URL + 'update_profile';

export const loginNurse = async (phone: any, password: any) => {
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

export const set_async_data = async (name: any, value: any) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const get_async_data = async (name: any) => {
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

export const get_history = async (id: any) => {
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

export const update_password = async (
  curr_pass: any,
  new_pass: any,
  confirm_pass: any,
) => {
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

export const update_user_profile = async (data: any) => {
  if (Object.keys(data.image).length > 0) {
    const request = await fetch(UPDATE_PROFILE, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();
    return response;
  } else {
    const request = await fetch(UPDATE_PROFILE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    return response;
  }
};

export const get_shift_status = async () => {
  const user_id = await get_async_data('user_id');
  const request = await fetch(SHIFT_STATUS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({user_id: 15}),
  });

  const resposne = await request.json();
  return resposne;
};
