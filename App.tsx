import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/routes/Route';
import {get_async_data} from './src/Helper/AppHelper';
import MainRoute from './src/routes/MainRoute';

const App = (navigation: any) => {
  const [splashClosed, setsplashClosed] = useState(false);
  const [userid, setuserid] = useState(null);

  useEffect(() => {
    (async () => {
      let user_id = await get_async_data('user_id');
      setuserid(user_id);
      setsplashClosed(true);
      SplashScreen.hide();
    })();
  }, []);

  return (
    <NavigationContainer>
      {splashClosed ? (
        <>{userid != null ? <MainRoute></MainRoute> : <Route></Route>}</>
      ) : null}
    </NavigationContainer>
  );
};

export default App;
