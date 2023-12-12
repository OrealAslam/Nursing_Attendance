import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {get_today_attendace} from '../../../../Helper/AppHelper';

const {width, height} = Dimensions.get('window');

const PageContent = (props: any) => {
  const [btntext, setbtntext] = useState('Select Shift');
  const [dropdown, setdropdown] = useState(false);
  const [apidata, setapidata] = useState([
    {
      id: 1,
      staff_name: null,
      phone: null,
      status: null,
      clent_assgin: null,
      Clent_name: null,
      shift_time: null,
      City: null,
    },
  ]);
  const [loader, setloader] = useState(true);
  const [filteredData, setfilteredData] = useState([
    {
      id: 1,
      staff_name: null,
      phone: null,
      status: null,
      clent_assgin: null,
      Clent_name: null,
      shift_time: null,
      City: null,
    },
  ]);

  const display_staff_list = () => {
    let list = props.items.map((item: any, index: any) => {
      return (
        <View
          style={[
            styles.optionContainer,
            index % 2 == 0
              ? {borderBottomColor: '#eef', borderBottomWidth: 0.5}
              : {},
          ]}
          key={index}>
          <TouchableOpacity onPress={() => select_option(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        </View>
      );
    });
    return list;
  };

  const select_option = (item: any) => {
    setbtntext(item);
    setdropdown(false);
  };

  useEffect(() => {
    (async () => {
      let data = await get_today_attendace();
      setapidata(data);
      setfilteredData(data);
      setloader(false);
    })();
  }, []);

  const display_attendence_record = () => {
    let list = filteredData.map((item: any, index) => {
      return (
        <View style={styles.attendenceBody} key={index}>
          <View style={styles.dateColumn}>
            <Text style={{color: '#2A2A2E', fontWeight: '700', fontSize: 12}}>
              {item.staff_name}
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
              {item.shift_time}
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
              {item.status == 'Not Checked' ? 'Absent' : 'Present'}
            </Text>
          </View>
        </View>
      );
    });
    return list;
  };

  // Hook Call to filter data
  useEffect(() => {
    if (btntext == 'Day Shift') {
      let filter = filterData(btntext);
      setfilteredData(filter);
    }
    if (btntext == 'Night Shift') {
      let filter = filterData(btntext);
      setfilteredData(filter);
    }
    if (btntext == 'Both') {
      setfilteredData(apidata);
    }
  }, [btntext]);

  const filterData = (shift_status: any) => {
    const nightShiftData = apidata.filter(
      item => item.shift_time === shift_status,
    );
    return nightShiftData;
  };

  return (
    <>
      {loader == true ? (
        <ActivityIndicator color={'#000'} size={'large'} />
      ) : (
        <>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.inputBox}
              onPress={() => setdropdown(!dropdown)}>
              <Text style={styles.clientName}>{btntext}</Text>
            </TouchableOpacity>
            {dropdown && (
              <View style={styles.listContainer}>{display_staff_list()}</View>
            )}
          </View>
          {/* Main Content Area */}

            <View style={styles.attendenceTable}>
              <View style={styles.column}>
                <Text style={styles.label}>Staff Name</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Shift Type</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Attendence</Text>
              </View>
            </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{maxHeight: 75/100 * height}}>
            {display_attendence_record()}
          </ScrollView>
        </>
      )}
    </>
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
    marginTop: 20,
    borderTopColor: '#D1DBE1',
    borderTopWidth: 2,
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
export default PageContent;