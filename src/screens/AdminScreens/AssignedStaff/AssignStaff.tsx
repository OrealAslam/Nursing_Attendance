import {View, TouchableOpacity, Image, Dimensions, ActivityIndicator} from 'react-native';
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
    setloader(true);
    let user_id = await get_async_data('user_id');
    let obj = {
      client_id: clientid,
      staff_id: staffid,
      shift_type: shifttype,
      user_id: user_id
    }
    let response = await save_assign_nurse(obj);
    if(response.status == 'success') {
      setloader(false);
      console.log('RES :', response)
    } else{ 
      setloader(false);
      console.log(response)
    }
  };

  return (
    <View>
      <PageHeader navigateScreen={navigateScreen} />
      <PageContent
        leads={leads}
        staff={staff}
        shift={shift}
        setshifttype={setshifttype}
        setclientid={setclientid}
        setstaffid={setstaffid}
      />

      {
        loader == true ? (<ActivityIndicator size={'small'} color={'#000'}/>) :
        <TouchableOpacity onPress={save_data}>
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
      }

    </View>
  );
};

export default AssignStaff;
