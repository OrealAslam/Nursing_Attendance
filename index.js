/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { silent_call } from './src/Helper/AppHelper';

  // Register background handler (QUIT MODE)
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('RECIEVED FROM BG :', remoteMessage.notification);
    await silent_call(remoteMessage.notification?.body);
  });

AppRegistry.registerComponent(appName, () => App);
