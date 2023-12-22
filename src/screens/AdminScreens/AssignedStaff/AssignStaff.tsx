import {
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  ActivityIndicator,
  View
} from 'react-native';
import React, {useState, useEffect} from 'react';
import PageHeader from './components/PageHeader';
import PageContent from './components/PageContent';
import {
  get_async_data,
  get_leads,
  get_staff,
  save_assign_nurse,
} from '../../../Helper/AppHelper';

const {width, height} = Dimensions.get('window');
const buttonWidth = width - 80;
const buttonRatio = buttonWidth / 1232;

const AssignStaff = ({navigation}: {navigation: any}) => {
  const [leads, setleads] = useState([]);
  const [staff, setstaff] = useState([]);
  const [shift, setshift] = useState(['Day Shift', 'Night Shift']);
  const [clientid, setclientid] = useState(null);
  const [staffid, setstaffid] = useState(null);
  const [shifttype, setshifttype] = useState('Day Shift');
  const [loader, setloader] = useState(false);
  const [message, setmessage] = useState('');

  useEffect(() => {
    (async () => {
      let response = await get_leads();
      let staffdata = await get_staff();
      if (response.status == 'success') {
        setleads(response.data);
      }
      setstaff(staffdata);
    })();
  }, []);

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  const save_data = async () => {
    // console.log('call')
    if (clientid == null || staffid == null) {
      setmessage('Client Name/Staff Name must not be empty');
    } else {
      setmessage('');
      setloader(true);
      let user_id = await get_async_data('user_id');
      let obj = {
        staff_id: staffid,
        client_id: clientid,
        shift_type: shifttype,
        user_id: user_id,
      };
      let response = await save_assign_nurse(obj);
      if (response.status == 'success') {
        setloader(false);
        setmessage('Staff assigned succesfully');
      } else {
        setloader(false);
      }
    }
  };

  return (
    <ImageBackground
    style={{width: width, height: height}}
    source={require('../../../assets/appbackground.png')}>
      <PageHeader navigateScreen={navigateScreen} />

      <View style={{paddingVertical: 10, width: width, height: '100%',borderTopLeftRadius: 35,backgroundColor:'#fff'}}>
        <PageContent
          leads={leads}
          staff={staff}
          shift={shift}
          setshifttype={setshifttype}
          setclientid={setclientid}
          setstaffid={setstaffid}
        />

        {loader == true ? (
          <ActivityIndicator size={'small'} color={'#000'} />
        ) : (
          <TouchableOpacity onPress={() => save_data()}>
            <Image
              style={{
                width: buttonWidth,
                height: 200 * buttonRatio,
                alignSelf: 'center',
                marginTop: 40,
              }}
              source={require('../../../assets/submit.png')}
            />
          </TouchableOpacity>
        )}

        <Text style={{textAlign: 'center', marginTop: 10, color: 'red'}}>
          {message}
        </Text>

      </View>
    </ImageBackground>
  );
};

export default AssignStaff;
