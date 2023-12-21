import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/routes/Route';
import {get_async_data, silent_call} from './src/Helper/AppHelper';
import MainRoute from './src/routes/MainRoute';
import {useNetInfo} from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import {
  View,
  BackHandler,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  PermissionsAndroid,
  Alert,
  ImageBackground,
} from 'react-native';
import {NetworkModelStyle} from './src/Helper/StyleHelper';
import AdminRoute from './src/routes/AdminRoute';

const {width, height} = Dimensions.get('window');
const buttonWidth = width - 180;
const buttonratio = buttonWidth / 560;

const App = (navigation: any) => {
  const {type, isConnected} = useNetInfo();
  const [splashClosed, setsplashClosed] = useState(false);
  const [userid, setuserid] = useState(null);
  const [usertype, setusertype] = useState(null);
  const [NetworkModel, setNetworkModel] = useState(false);

  useEffect(() => {
    (async () => {
      let user_id = await get_async_data('user_id');
      let userType = await get_async_data('usertype');
      await requestUserPermission();
      // console.log(await get_async_data('fcm_token'));
      setuserid(user_id);
      setusertype(userType);
      setsplashClosed(true);
      SplashScreen.hide();
    })();
  }, []);

  useEffect(() => {
    if (isConnected) {
      setNetworkModel(false);
    } else {
      setNetworkModel(true);
    }
  }, [isConnected]);

  async function requestUserPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    await silent_call(remoteMessage.notification?.body);
  });

  // foreground handler
  messaging().onMessage(async remoteMessage => {
    console.log('notificatio recived', remoteMessage);
    if (remoteMessage.notification?.body == '2') {
      Alert.alert(`${remoteMessage.notification?.title}`);
    } else {
      await silent_call(remoteMessage.notification?.body);
    }
  });

  return (
    <NavigationContainer>
      {splashClosed ? (
        <>
          {NetworkModel == true ? (
            <ImageBackground
              source={require('./src/assets/appbackground.png')}
              style={NetworkModelStyle.container}>
              <View style={NetworkModelStyle.modelContainer}>
                <Image
                  style={NetworkModelStyle.imgIcon}
                  source={require('./src/assets/networkerror.png')}
                />
                <Text style={[NetworkModelStyle.heading, {marginTop: 10}]}>Network Error</Text>
                <Text style={NetworkModelStyle.description}>
                  Failed to connect to Internet
                </Text>
                <Text style={[NetworkModelStyle.description, {marginBottom: 10}]}>Please Try again later!</Text>
                <TouchableOpacity onPress={() => BackHandler.exitApp()}>
                  <Image
                    style={{
                      alignSelf: 'center',
                      width: buttonWidth,
                      height: 148 * buttonratio,
                      marginTop: 20,
                    }}
                    source={require('./src/assets/exitApp.png')}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          ) : (
            <>
              {userid != null ? (
                usertype == 'Admin' ? (
                  <AdminRoute></AdminRoute>
                ) : (
                  <MainRoute></MainRoute>
                )
              ) : (
                <Route></Route>
              )}
            </>
          )}
        </>
      ) : null}
    </NavigationContainer>
  );
};

export default App;
