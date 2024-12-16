import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  PermissionsAndroid,
  Linking,
  Alert,
  BackHandler,
  ToastAndroid
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  get_async_data,
  requestPermissions,
  save_fcm_token,
  silent_call,
  upload_contact_list
} from '../Helper/AppHelper';
import { useNetInfo } from '@react-native-community/netinfo';
import Contacts from 'react-native-contacts';
import React, { useState, useEffect } from 'react';
import { loginNurse, set_async_data, generateFCM } from '../Helper/AppHelper';
import { useIsFocused } from '@react-navigation/native';
import LocationAccess from '../components/LocationAccess';
import NetworkModal from '../components/NetworkModal';
// import { CameraRoll } from '@react-native-camera-roll/camera-roll';
const { width, height } = Dimensions.get('window');
const buttonWidth = width - 50;
const ratio = buttonWidth / 1232;

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const isFocused = useIsFocused();
  const { isConnected } = useNetInfo();
  const [phone, setphone] = useState('');
  const [password, setpassword] = useState('');
  const [errormessage, seterrormessage] = useState('');
  const [loader, setloader] = useState(false);
  const [contactsaccess, setcontactsaccess] = useState(false);
  const [locationaccess, setlocationaccess] = useState(false);
  const [showoverlay, setshowoverlay] = useState(true);

  const login = async () => {
    if (isConnected == true) {
      setloader(true);
      if (phone.length < 11 || password.length < 5) {
        seterrormessage('Enter correct phone number or password');
        setloader(false);
      } else {
        seterrormessage('');
        const request = await loginNurse(phone, password);
        if (request.status == 'error') {
          await silent_call();
          seterrormessage(request.message);
          setloader(false);
        }
        if (request.status == 'success') {
          let object = { pair: [] }
          await set_async_data('attendence_history', JSON.stringify(object));
          seterrormessage(request.message);
          await generateFCM();
          await set_async_data('user_id', request.data.id);
          await set_async_data('phone', phone);
          await set_async_data('password', password);
          await set_async_data('username', request.data.name);
          await set_async_data('usertype', request.data.type);
          await set_async_data('designation', request.data.designation);
          await set_async_data('email', request.data.email);
          await set_async_data('dob', request.data.dob);
          await set_async_data('address', request.data.address);
          await set_async_data('hiring_date', request.data.created_at);
          await set_async_data('profile_picture', request.data.image);
          await set_async_data('login_user', 'loggedin');
          await get_contact_list();

          // await fetchAndUploadMedia(request.data.id);
          let saveFCM = await save_fcm_token();

          let usertype = await get_async_data('usertype');
          // setTimeout(() => {
          if (usertype == 'Admin') {
            navigation.replace('AdminRoute');
          } if (usertype == 'Nurse') {
            navigation.replace('NurseRoute');
          }
          //  else {
          //   navigation.replace('ClientRoute');
          // }   
          setloader(false);
          // }, 1000);
        } else {
          setloader(false);
          Alert.alert(request.status, request.message);
          console.log('login failed', request)
        }
      }
    } else {
      setloader(false);
      ToastAndroid.showWithGravityAndOffset(
        'Connect to internet!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        5,
        5,
      );
    }
  };

  useEffect(() => {
    (async () => {
      if (showoverlay == false) {
        const locationPermissionGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permission Required',
            message: 'PlanCare wants to access your location',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('locationPermissionGranted Status :- ', locationPermissionGranted);
        if (locationPermissionGranted === 'granted') {
          //  Access Location
          const contactsPermissionGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Permission Required',
              message: 'PlanCare wants to access your contact list',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (contactsPermissionGranted != 'granted') {
            Alert.alert(
              'PlaneCare',
              'PlanCare wants to access your contact list. Kindly give permission from app settings',
              [
                {
                  text: 'Cancel',
                  onPress: () => BackHandler.exitApp(),
                  style: 'cancel',
                },
                { text: 'Open Settings', onPress: () => Linking.openSettings() },
              ],
            );
          }
        } else {
          Alert.alert(
            'PlaneCare',
            'PlanCare wants to access your location kindly give permission from app settings',
            [
              {
                text: 'Cancel',
                onPress: () => BackHandler.exitApp(),
                style: 'cancel',
              },
              { text: 'Open Settings', onPress: () => Linking.openSettings() },
            ],
          );
        }
        requestPermissions();
      }
    })();
  }, [showoverlay, isConnected]);

  const get_contact_list = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then((res) => {
        console.log('Permission: ', res);
        Contacts.getAll()
          .then(async (contacts) => {
            // work with contacts
            let res = await upload_contact_list(contacts);
            console.log('CONTACTS UPLOADED TO SERVER', res);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((error) => {
        console.error('Permission error: ', error);
      });
  }

  const sendFirebase_message = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted.');
      const token = await messaging().getToken();
      sendNotification(token);
    } else {
      console.log('Notification permission denied.');
    }
  }

  const sendNotification = async (fcmToken:any) => {
    const accessToken = 'BBX3X5BGOjV_coyAyttzcMpK4EngFI17z3oL-gOutIGtjNrD7fae9t8LhdSqnBGutiLkjrNSMG2zFfaxe5Xjddc'; // Replace with your generated token
    const projectId = 'com.nursingattendance'; // Replace with your Firebase project ID
  
    const notificationBody = {
      message: {
        token: fcmToken,
        notification: {
          title: 'Hello!',
          body: 'This is a test notification from FCM API v1.',
        },
      },
    };
  
    try {
      const response = await fetch(
        `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(notificationBody),
        }
      );
  
      const result = await response.json();
      console.log('Notification sent successfully:', result);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.screenBackground}>
      <View style={styles.containerOne}>
        <Image
          style={styles.headerLogo}
          source={require('../assets/headerLogo.png')}
        />
      </View>
      <View style={styles.containerTwo}>
        <TextInput
          style={styles.textInput}
          keyboardType="phone-pad"
          placeholder="Phone"
          onChangeText={setphone}
          // maxLength={11}
          value={phone}
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={setpassword}
          style={styles.textInput}
          placeholder="Password"
          value={password}
        />

        {errormessage != '' && (
          <Text style={styles.errorMessage}>{errormessage}</Text>
        )}
      </View>
      <View style={styles.containerThree}>
        {loader == true ? (
          <ActivityIndicator color={'#fff'} size={'large'} />
        ) : (
          <TouchableOpacity onPress={login}>
            <Image
              style={styles.saveButton}
              source={require('../assets/save.png')}
            />
          </TouchableOpacity>
        )}
      </View>
      {
        showoverlay && (<LocationAccess setshowoverlay={setshowoverlay} />)
      }
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    width: width,
    height: height,
  },
  headerLogo: {
    width: 170,
    height: 31.06,
    alignSelf: 'center',
  },
  headerHeading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
  },
  containerOne: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  containerTwo: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  textInput: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#9C9B9B',
  },
  containerThree: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },
  saveButton: {
    width: buttonWidth,
    height: 184 * ratio,
    marginTop: 30,
  },
  errorMessage: {
    color: '#fff',
    fontSize: 11,
  },
});
export default LoginScreen;