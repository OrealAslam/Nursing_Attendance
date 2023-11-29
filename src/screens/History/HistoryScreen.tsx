import {View, Text, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import HistoryHeader from './component/HistoryHeader';
import HistoryContent from './component/HistoryContent';
import {get_async_data, get_history} from '../../Helper/AppHelper';
import {CardContainer} from './historystyles';
import {useIsFocused} from '@react-navigation/native';
import StopWatch from '../../components/Stopwatch';
import moment from 'moment';

const HistoryScreen = ({navigation}: {navigation: any}) => {
  const isFocused = useIsFocused();
  const [history, sethistory] = useState([]);
  const [loader, setloader] = useState(true);

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    (async () => {
      let user_id = await get_async_data('user_id');
      const response = await get_history(user_id);

      if (response.status == 'success') {
        sethistory(response.data);
      }
      setloader(false);
    })();
  }, [isFocused]);


  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HistoryHeader navigateScreen={navigateScreen} />
      {
        loader == true ? (<ActivityIndicator size={'large'} color={'#e0e0e0'} />) : 
        <HistoryContent history={history}/>
      }
    </View>
  );
};

export default HistoryScreen;
