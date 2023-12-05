import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/routes/Route';
import {get_async_data} from './src/Helper/AppHelper';
import MainRoute from './src/routes/MainRoute';
import {useNetInfo} from '@react-native-community/netinfo';
// import Geolocation from '@react-native-community/geolocation';
import {
  View,
  BackHandler,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {NetworkModelStyle} from './src/Helper/StyleHelper';
// import LocationAccess from './src/components/LocationAccess';

const {width, height} = Dimensions.get('window');
const buttonWidth = width - 200;
const buttonratio = buttonWidth / 480;

const App = (navigation: any) => {
  const {type, isConnected} = useNetInfo();
  const [splashClosed, setsplashClosed] = useState(false);
  const [userid, setuserid] = useState(null);
  const [NetworkModel, setNetworkModel] = useState(false);
  // const [locationaccess, setlocationaccess] = useState(false);

  useEffect(() => {
    (async () => {
      let user_id = await get_async_data('user_id');
      // let loc_access = await get_async_data('loc_access');
      // if (loc_access == 'accessed') setlocationaccess(true);
      setuserid(user_id);
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

  return (
    <NavigationContainer>
      {splashClosed ? (
        <>
          {NetworkModel == true ? (
            <View style={NetworkModelStyle.container}>
              <View style={NetworkModelStyle.modelContainer}>
                <Text style={NetworkModelStyle.heading}>Network Error</Text>
                <Text style={NetworkModelStyle.description}>
                  Failed to connect to Internet. Try again Later!
                </Text>
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
            </View>
          ) : (
            // locationaccess == false ? (<LocationAccess />) :
            <>{userid != null ? <MainRoute></MainRoute> : <Route></Route>}</>
          )}
        </>
      ) : null}
    </NavigationContainer>
  );
};

export default App;
