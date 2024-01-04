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
} from 'react-native';
import {
  get_async_data,
  save_fcm_token,
  upload_contact_list,
} from '../Helper/AppHelper';
import Contacts from 'react-native-contacts';
import React, {useState, useEffect} from 'react';
import {loginNurse, set_async_data, generateFCM} from '../Helper/AppHelper';
import {useIsFocused} from '@react-navigation/native';
import LocationAccess from '../components/LocationAccess';

const {width, height} = Dimensions.get('window');
const buttonWidth = width - 50;
const ratio = buttonWidth / 1232;

const LoginScreen = ({navigation}: {navigation: any}) => {
  const isFocused = useIsFocused();
  const [phone, setphone] = useState('');
  const [password, setpassword] = useState('');
  const [errormessage, seterrormessage] = useState('');
  const [loader, setloader] = useState(false);
  const [contactsaccess, setcontactsaccess] = useState(false);
  const [locationaccess, setlocationaccess] = useState(false);
  const [showoverlay, setshowoverlay] = useState(true);

  const login = async () => {
    setloader(true);
    if (phone.length < 11 || password.length < 5) {
      seterrormessage('Enter correct phone number or password');
    } else {
      seterrormessage('');
      const request = await loginNurse(phone, password);
      if (request.status == 'error') {
        seterrormessage(request.message);
      }
      if (request.status == 'success') {
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
        await save_fcm_token();

        let usertype = await get_async_data('usertype');
        // setTimeout(() => {
          console.log('usertype', usertype);
          if (usertype == 'Admin') {
            navigation.replace('AdminRoute');
          } if(usertype == 'Nurse') {
            navigation.replace('NurseRoute');
          }
          //  else {
          //   navigation.replace('ClientRoute');
          // }   
          setloader(false);       
        // }, 1000);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if(showoverlay == false) {
        const locationPermissionGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permission Required',
            message: 'PlanCare wants to access your location',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
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
                {text: 'Open Settings', onPress: () => Linking.openSettings()},
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
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
        }
      }
    })();
  }, [showoverlay]);

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
          maxLength={11}
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
          <TouchableOpacity onPress={() => login()}>
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