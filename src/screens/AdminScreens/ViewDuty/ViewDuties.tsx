import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import PageHeader from './components/PageHeader';
import {view_assigned_staff} from '../../../Helper/AppHelper';
import {CardContainer, InputStyle} from './styles';

const {width, height} = Dimensions.get('window');

const ViewDuties = ({navigation}: {navigation: any}) => {
  const [assignedstaff, setassignedstaff] = useState([]);
  const [apidata, setapidata] = useState([]);
  const [loader, setloader] = useState(true);
  const [searchText, setsearchText] = useState('');

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  const handleSearch = (text: any) => {
    setsearchText(text);
    if (searchText.length > 0) {
      // Filter the data based on the search text
      const filteredData = assignedstaff.filter((item: any) =>
        item.Nurse_Name.toLowerCase().includes(text.toLowerCase()),
      );
      setassignedstaff(filteredData);
    } else {
      setassignedstaff(apidata);
    }
  };

  useEffect(() => {
    if (searchText.length > 0) {
      // Filter the data based on the search text
      const filteredData = assignedstaff.filter((item: any) =>
        item.Nurse_Name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setassignedstaff(filteredData);
    } else {
      setassignedstaff(apidata);
    }
  }, [searchText]);

  useEffect(() => {
    (async () => {
      setloader(true);
      const request = await view_assigned_staff();
      if (request) setloader(false);
      setapidata(request);
      setassignedstaff(request);
    })();
  }, []);

  const dislay_assigned_staff = () => {
    let data = assignedstaff.map((item: any, index: any) => {
      return (
        <View style={CardContainer.container} key={index}>
          <View style={CardContainer.row}>
            <Text style={CardContainer.key}>Client Name</Text>
            <Text style={CardContainer.value}>{item.Patient_Name}</Text>
          </View>
          <View style={CardContainer.row}>
            <Text style={CardContainer.key}>Staff Name</Text>
            <Text style={CardContainer.value}>{item.Nurse_Name}</Text>
          </View>
          <View style={CardContainer.row}>
            <Text style={CardContainer.key}>Shift Type</Text>
            <Text style={CardContainer.value}>{item.Shift_Time == null ? 'N/A' : item.Shift_Time}</Text>
          </View>
        </View>
      );
    });
    return data;
  };

  return (
    <ImageBackground
      style={{width: width, height: height}}
      source={require('../../../assets/appbackground.png')}>
      <PageHeader navigateScreen={navigateScreen} />
      {loader == true ? (
        <View>
          <ActivityIndicator size={'large'} color={'#fff'} />
        </View>
      ) : (
        <>
          <TextInput
            onChangeText={setsearchText}
            placeholder="Search Staff"
            style={InputStyle.searchBox}
            keyboardType="default"
            value={searchText}
          />

          <View
            style={{
              paddingVertical: 10,
              marginTop: 29,
              backgroundColor: '#fff',
              borderTopLeftRadius: 35,
              borderTopEndRadius: 35,
              height: '100%',
            }}>
            <ScrollView>{dislay_assigned_staff()}</ScrollView>
          </View>
        </>
      )}
    </ImageBackground>
  );
};

export default ViewDuties;
