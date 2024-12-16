import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/routes/Route';
import {get_async_data, silent_call} from './src/Helper/AppHelper';
import NurseRoute from './src/routes/NurseRoute';
import ClientRoute from './src/routes/ClientRoutes';
import {useNetInfo} from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Alert, LogBox} from 'react-native';
import AdminRoute from './src/routes/AdminRoute';
// import NetworkModal from './src/components/NetworkModal';

const App = () => {
  LogBox.ignoreAllLogs();
  const {type, isConnected} = useNetInfo();
  const [splashClosed, setsplashClosed] = useState(false);
  const [userid, setuserid] = useState(null);
  const [usertype, setusertype] = useState(null);
  // const [NetworkModel, setNetworkModel] = useState(false);

  useEffect(() => {
    (async () => {
      let user_id = await get_async_data('user_id');
      let userType = await get_async_data('usertype');
      await requestUserPermission();
      setuserid(user_id);
      setusertype(userType);
      setsplashClosed(true);
      SplashScreen.hide();
    })();
  }, []);
  

  async function requestUserPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Auth status:', authStatus);
    }
  }



  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(remoteMessage)
    await silent_call(remoteMessage.notification?.body);
  });

  // foreground handler
  messaging().onMessage(async remoteMessage => {
    if (remoteMessage.notification?.body == '2') {
      Alert.alert(`${remoteMessage.notification?.title}`);
      console.log(remoteMessage.notification)
    } else {
      await silent_call(remoteMessage.notification?.body);
    }
  });

  return (
    <NavigationContainer>
      {splashClosed ? (
        <>
          {/* {NetworkModel == true ? (
            <NetworkModal />
          ) : (
            <> */}
              {userid != null ? (
                usertype == 'Admin' ? (
                  <AdminRoute></AdminRoute>
                  // ) : usertype == 'Nurse' ? (
                  // <NurseRoute></NurseRoute>
                ) : (
                  <NurseRoute></NurseRoute>
                )
              ) : (
                <Route></Route>
              )}
            {/* </>
          )} */}
        </>
      ) : null}
    </NavigationContainer>
  );
};
export default App;
