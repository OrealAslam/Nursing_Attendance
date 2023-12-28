import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ContentStyle, CardStyle} from '../notestyles';
import {add_nurse_note} from '../../../Helper/AppHelper';
import moment from 'moment';

const MainContent = (props: any) => {
  const [result, setresult] = useState(props.data);
  const [modal, setmodal] = useState(false);
  const [loader, setloader] = useState(false);
  const [description, setdescription] = useState('');
  const [shift, setshift] = useState('');

  const saveRecord = async () => {
    setloader(true);
    let response = await add_nurse_note(description, shift);
    if (response.status == 'success') {
      setloader(false);
      setmodal(false);
    }
  };

  const displayRecord = () => {

    if(result != undefined) {
      let list = result.map((item: any, index: any) => {
        return (
          <View style={CardStyle.card} key={index}>
            <Text style={CardStyle.time}>
              {moment(item.created_at).format('HH:mm A')}
            </Text>
            <View style={CardStyle.mainDescription}>
              <Text>{item.notes}</Text>
            </View>
          </View>
        );
      });
      return list;
    }
  };

  const searchByShiftTime = (array: any, time: string, date:string) => {
    let filter = [];
    if(shift != '') {
      filter = array.filter((item:any) => item.shift_status === time);
      if(date != ''){
        filter = filter.filter((record:any) => record.created_at.startsWith(moment(date).format('YYYY-MM-DD')));
      }
      return filter;
    } else{
      if(date != ''){
        filter = props.data.filter((record:any) => record.created_at.startsWith(moment(date).format('YYYY-MM-DD')));
        return filter;
      } else{ 
        return props.data;
      }
    }
  };

  useEffect(() => {
    setresult(props.data);
    let data = searchByShiftTime(props.data, shift, props.datestring);
    setresult(data);
  }, [shift, props.data, props.datestring]);


  // const testFunc = () => {
  //   const data = [
  //     {"Patient_Name": "Ms Sadia Zaman", "created_at": "2023-12-20 15:36:04", "id": 1, "lead_id": 465, "notes": "Morning desc", "shift_status": "morning", "staff_id": 1, "staff_name": "Amir Ch", "status": 0},
  //     {"Patient_Name": "Ms Sadia Zaman", "created_at": "2023-12-21 15:29:07", "id": 2, "lead_id": 465, "notes": "My test description", "shift_status": "night", "staff_id": 1, "staff_name": "Amir Ch", "status": 0},
  //     {"Patient_Name": "Ms Sadia Zaman", "created_at": "2023-12-20 12:20:06", "id": 3, "lead_id": 465, "notes": "this is testing note", "shift_status": "", "staff_id": 1, "staff_name": "Amir Ch", "status": 0},
  //     {"Patient_Name": "Ms Sadia Zaman", "created_at": "2023-12-02 12:19:14", "id": 4, "lead_id": 465, "notes": "this is testing note", "shift_status": "", "staff_id": 1, "staff_name": "Amir Ch", "status": 0},
  //     {"Patient_Name": "Ms Sadia Zaman", "created_at": "2023-12-11 12:18:53", "id": 5, "lead_id": 465, "notes": "this is testing note", "shift_status": "", "staff_id": 1, "staff_name": "Amir Ch", "status": 0}
  //   ];    
  //   const filteredRecords = data.filter(record => record.created_at.startsWith("2023-12-20"));    
  // }

  return (
    <View style={ContentStyle.container}>
      <View style={ContentStyle.navigation}>
        <TouchableOpacity
          onPress={() => setshift('morning')}
          style={{marginHorizontal: 10}}>
          <Image
            style={ContentStyle.navImage}
            source={
              shift == 'morning'
                ? require('../../../assets/morning.png')
                : require('../../../assets/morningunselect.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setshift('night')}
          style={{marginHorizontal: 10}}>
          <Image
            style={ContentStyle.navImage}
            source={
              shift == 'night'
                ? require('../../../assets/night.png')
                : require('../../../assets/nightunselect.png')
            }
          />
        </TouchableOpacity>
      </View>

      <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
        <View style={ContentStyle.cardContainer}>{displayRecord()}</View>
      </ScrollView>
      {/* {props.showaddicon && ( */}
        <TouchableOpacity
          onPress={() => {
            setmodal(true);
          }}>
          <Image
            style={{
              width: 53,
              height: 53,
              alignSelf: 'center',
              position: 'absolute',
              bottom: 210,
            }}
            source={require('../../../assets/addIcon.png')}
          />
        </TouchableOpacity>
      {/* )} */}

      {/* Modal */}
      {modal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setmodal(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="default"
                onChangeText={setdescription}
              />

              {loader == true ? (
                <ActivityIndicator
                  size={'small'}
                  color="#000"
                  style={{alignSelf: 'center', marginTop: 25}}
                />
              ) : (
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={saveRecord}>
                  <Text style={styles.textStyle}>Save Record</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#f1f6f1',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 35,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  textInput: {
    width: '95%',
    height: 70,
    lineHeight: 70,
    textAlign: 'left',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 0,
    color: '#000',
    fontWeight: '600',
  },
});

export default MainContent;
