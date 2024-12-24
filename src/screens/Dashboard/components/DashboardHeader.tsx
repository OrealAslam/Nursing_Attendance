import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';
import { HeaderStyle } from '../dashboardstyles';
import { set_async_data } from '../../../Helper/AppHelper';
const DashboardHeader = (props: any) => {
  const [staffsuggestion, setstaffsuggestion] = useState(false);
  const [filteredData, setfilteredData] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleStaffSearch = (text: any) => {
    setstaffsuggestion(true);
    props.setclientname(text);
    let filter = props.availableLeads.filter((item: any) => {
      return item.client_name.toLowerCase().includes(text.toLowerCase());
    });
    setfilteredData(filter);
  }

  const display_attendence_record = () => {
    let list = filteredData.map((item: any, index) => {
      return (
        <TouchableOpacity key={index} style={styles.searchResult} onPress={() => set_client(item)}>
          <Text style={{ color: '#000', fontSize: 13, fontWeight: '300' }}>{item.client_name}</Text>
        </TouchableOpacity>
      );
    });
    return list;
  };

  const set_client = async (client: any) => {
    await set_async_data('lead_id', client.id);
    props.setleadid(client.id)
    props.setclient(client);
    props.setclientname(client.client_name);
    setstaffsuggestion(false);
  }

  const handleSelect = (item: any) => {
    props.setSelectedValue(item);
    setDropdownVisible(false);
  };

  return (
    <View style={HeaderStyle.headerContainer}>
      <View style={HeaderStyle.topHeader}>
        <Image
          style={HeaderStyle.headerLogo}
          source={require('../../../assets/headerLogo.png')}
        />
        <TouchableOpacity onPress={() => props.navigateScreen('ProfileScreen')}>
          <Image
            style={HeaderStyle.profileLogo}
            source={require('../../../assets/profileIcon.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={HeaderStyle.headerBadge}>
        <TextInput
          style={HeaderStyle.badgeText}
          value={props.clientname}
          onChangeText={handleStaffSearch}
          editable={props.lockheader == true ? false : true} // based on start/end status of shift
        />

        {/* Dropdown Trigger */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => {
            if (props.lockheader == true) {
              return null;
            } else {
              setDropdownVisible(!isDropdownVisible)
            }
          }}
        >
          <Text style={styles.dropdownText}>
            {props.selectedValue }
          </Text>
          <Image style={{ width: 11, height: 7, marginLeft: 5, marginTop: 3 }} source={require('../../../assets/downarrow.png')} />
        </TouchableOpacity>

      </View>

      {/* DISPLAY SEARCH RESULTS */}
      {staffsuggestion && (
        <ScrollView style={styles.searchContainer} showsVerticalScrollIndicator={false}>
          {display_attendence_record()}
        </ScrollView>
      )}

      {/* Dropdown Options */}
      {isDropdownVisible && (
        <View style={[styles.searchContainer, { width: '22%', alignSelf: 'flex-end', right: '7%', top: '101%' }]}>
          <FlatList
            data={['Day Shift', 'Night Shift', 'Double Shift']}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}


    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: '105%',
    width: '85%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    maxHeight: 250,
    zIndex: 1,
    borderRadius: 10
  },
  searchResult: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  dropdownButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdownText: {
    fontSize: 12,
    color: '#333',
  },
  dropdownItem: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
    // borderEndEndRadius: 9
  },
  itemText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'left'
  },
});
export default DashboardHeader;