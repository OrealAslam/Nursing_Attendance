import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TextInput,
  ImageBackground,
  StyleSheet,
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
      // return (
      //   <View style={CardContainer.container} key={index}>
      //     <View style={CardContainer.row}>
      //       <Text style={CardContainer.key}>Client Name</Text>
      //       <Text style={CardContainer.value}>{item.Patient_Name}</Text>
      //     </View>
      //     <View style={CardContainer.row}>
      //       <Text style={CardContainer.key}>Staff Name</Text>
      //       <Text style={CardContainer.value}>{item.Nurse_Name}</Text>
      //     </View>
      //     <View style={CardContainer.row}>
      //       <Text style={CardContainer.key}>Shift Type</Text>
      //       <Text style={CardContainer.value}>
      //         {item.Shift_Time == null ? 'N/A' : item.Shift_Time}
      //       </Text>
      //     </View>
      //   </View>
      // );

      return (
        <View style={styles.attendenceBody} key={index}>
          <View style={styles.dateColumn}>
            <Text style={{color: '#2A2A2E', fontWeight: '700', fontSize: 12}}>
            {item.Patient_Name}
            </Text>
          </View>
          <View style={styles.shiftColumn}>
            <Text
              style={{
                color: '#2A2A2E',
                fontWeight: '700',
                fontSize: 12,
                textAlign: 'center',
              }}>
              {item.Nurse_Name}
            </Text>
          </View>
          <View style={styles.attendenceColumn}>
            <Text
              style={[
                styles.attendenceStatus,
                item.status == 'Not Checked'
                  ? {color: '#F73939'}
                  : {color: '#28A314'},
              ]}>
              {item.Shift_Time == null ? 'N/A' : item.Shift_Time}
            </Text>
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
            <View style={styles.attendenceTable}>
              <View style={styles.column}>
                <Text style={styles.label}>Client Name</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Staff Name</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Shift Type</Text>
              </View>
            </View>
            <ScrollView>{dislay_assigned_staff()}</ScrollView>
          </View>
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: width,
    paddingHorizontal: 10,
  },
  inputBox: {
    width: (40 / 100) * width,
    borderWidth: 1,
    borderColor: '#D1DCE1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: 'flex-end',
  },
  clientName: {
    color: '#2A2A2E',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  listContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 30,
    right: 10,
    backgroundColor: '#fff',
    width: (40 / 100) * width,
    maxHeight: (25 / 100) * height,
    alignSelf: 'flex-end',
    borderRadius: 8,
  },
  optionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  attendenceTable: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    width: (30 / 100) * width,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#2A2A2E',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  attendenceBody: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateColumn: {
    width: (27 / 100) * width,
    padding: 10
  },
  shiftColumn: {
    width: (33 / 100) * width,
  },
  attendenceColumn: {
    width: (25 / 100) * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendenceStatus: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default ViewDuties;
