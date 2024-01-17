import {
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import VitalHeader from './components/VitalHeader';
import {ContentStyle} from './vitalstyles';
import Card from './components/Card';
import Form from './components/Form';
import {
  add_vital_record,
  get_async_data,
  get_vital_record,
} from '../../Helper/AppHelper';
import {useIsFocused} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');

const VitalSignScreen = ({navigation}: {navigation: any}) => {
  const isFocused = useIsFocused();
  const [newrecord, setnewrecord] = useState(false);
  const [loader, setloader] = useState(false);
  const [bloodpressure, setbloodpressure] = useState('');
  const [pulserate, setpulserate] = useState('');
  const [temperature, settemperature] = useState('');
  const [resp, setresp] = useState('');
  const [bsr, setbsr] = useState('');
  const [spo2, setspo2] = useState('');
  const [remarks, setremarks] = useState('');
  const [record, setrecord] = useState([]);
  const [showaddicon, setshowaddicon] = useState(false);
  const [datestring, setdatestring] = useState('');
  const [message, setmessage] = useState('');

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  const add_record = async () => {
    let check = check_for_empty_fields();
    if(check == false) {
      setmessage('Could not submit empty form');
    } else{
      setloader(true);
      let lead_id = await get_async_data('lead_id');
      let user_id = await get_async_data('user_id');
      let obj = {
        lead_id: lead_id, // 465,
        staff_id: user_id, //1,
        blood_pressure: bloodpressure,
        pulse_rate: pulserate,
        remarks: remarks,
        resp: resp,
        spo2: spo2,
        bsr: bsr,
        temperature: temperature,
      };
      const response = await add_vital_record(obj);
      if (response.status == 'success') {
        setloader(false);
        setnewrecord(false);
        ToastAndroid.showWithGravityAndOffset(
          'Record Added Successfully!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          5,
          5,
        );
      } else {
        console.log(response);
        setloader(false);
      }
    }
  };

  const check_for_empty_fields = () => {
    if (
      bloodpressure == '' &&
      pulserate == '' &&
      temperature == '' &&
      resp == '' &&
      bsr == '' &&
      spo2 == '' &&
      remarks == ''
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    (async () => {
      let response = await get_vital_record();
      setrecord(response);
    })();
  }, [isFocused, loader]);

  return (
    <ImageBackground
      style={{width: width, height: height}}
      source={require('../../assets/appbackground.png')}>
      <VitalHeader
        navigateScreen={navigateScreen}
        setshowaddicon={setshowaddicon}
        setdatestring={setdatestring}
      />

      <View style={ContentStyle.container}>
        {newrecord == true ? (
          <Form
            setbloodpressure={setbloodpressure}
            setpulserate={setpulserate}
            settemperature={settemperature}
            setresp={setresp}
            setbsr={setbsr}
            setspo2={setspo2}
            setremarks={setremarks}
            loader={loader}
            add_record={add_record}
            message={message}
          />
        ) : (
          <>
            <ScrollView>
              <Card record={record} datestring={datestring} />
            </ScrollView>
            <View style={{position: 'absolute', bottom: 60}}>
              <TouchableOpacity onPress={() => setnewrecord(true)}>
                <Image
                  style={{
                    width: 53,
                    height: 53,
                    alignSelf: 'center',
                  }}
                  source={require('../../assets/addIcon.png')}
                />
              </TouchableOpacity>
            </View>
            {/* ) : (<></>)} */}
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default VitalSignScreen;
