import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {containerStyle, InputStyle} from '../styles';
import SelectDropdown from 'react-native-select-dropdown';
import {searchBox} from '../../../../components/CalenderComponent/StyleHelper/Style';

const PageContent = (props: any) => {
  const [searchClientText, setsearchClientText] = useState('');
  const [searchStaffText, setsearchStaffText] = useState('');
  const [filteredClient, setfilteredClient] = useState([]);
  const [filteredStaff, setfilteredStaff] = useState([]);
  const [closeclientsuggestion, setcloseclientsuggestion] = useState(false);
  const [closestaffsuggestion, setclosestaffsuggestion] = useState(false);

  const handleClientSearch = (text: any) => {
    // Filter the data based on the search text
    const filteredData = props.leads.filter((item: any) =>
      item.client_name.toLowerCase().includes(text.toLowerCase()),
    );
    setsearchClientText(text);
    // console.log(filteredData)
    // Update the filtered data to be displayed
    setfilteredClient(filteredData);
  };

  const handleStaffSearch = (text: any) => {
    // Filter the data based on the search text
    const filteredData = props.staff.filter((item: any) =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setsearchStaffText(text);
    // Update the filtered data to be displayed
    setfilteredStaff(filteredData);
  };

  return (
    <View style={containerStyle.container}>
      <View style={InputStyle.inputContainer}>
        <Text style={InputStyle.label}>Client Name</Text>
        <TextInput
          value={searchClientText}
          onChangeText={handleClientSearch}
          onChange={() => setcloseclientsuggestion(false)}
          placeholder="Search Client"
          style={InputStyle.inputBox}
          keyboardType="default"
        />
        {filteredClient.length > 0 &&
        searchClientText.length > 0 &&
        closeclientsuggestion != true ? (
          <View style={searchBox.container}>
            <FlatList
              data={filteredClient}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={searchBox.item}
                  onPress={() => {
                    setcloseclientsuggestion(true);
                    setsearchClientText(item?.client_name);
                    props.setclientid(item.id)
                  }}>
                  <Text
                    style={{fontWeight: '400', color: '#000', fontSize: 14}}>
                    {item?.client_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <></>
        )}
      </View>

      <View style={InputStyle.inputContainer}>
        <Text style={InputStyle.label}>Staff Name</Text>
        <TextInput
          onChangeText={handleStaffSearch}
          onChange={() => setclosestaffsuggestion(false)}
          placeholder="Search Staff"
          style={InputStyle.inputBox}
          keyboardType="default"
          value={searchStaffText}
        />
        {filteredStaff.length > 0 &&
        searchStaffText.length > 0 &&
        closestaffsuggestion != true ? (
          <View style={searchBox.container}>
            <FlatList
              data={filteredStaff}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={searchBox.item}
                  onPress={() => {
                    setsearchStaffText(item?.name);
                    setclosestaffsuggestion(true);
                    props.setstaffid(item.id);
                  }}>
                  <Text
                    style={{fontWeight: '400', color: '#000', fontSize: 14}}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <></>
        )}
      </View>

      <View style={InputStyle.inputContainer}>
        <Text style={InputStyle.label}>Shift Type</Text>
        <SelectDropdown
          data={props.shift}
          onSelect={(selectedItem, index) => {
            props.setshifttype(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultValueByIndex={0}
          buttonStyle={[InputStyle.inputBox, {width: '100%'}]}
          buttonTextStyle={{
            position: 'absolute',
            right: 0,
            fontSize: 14,
            fontWeight: '400'
          }}
          dropdownStyle={{
            justifyContent: 'flex-start',
            backgroundColor: '#fff',
            shadowOffset: 0,
            shadowColor: '#fff'
          }}
          rowTextStyle={{fontSize: 14, left: 10, position: 'absolute'}}
        />
      </View>
    </View>
  );
};

export default PageContent;
