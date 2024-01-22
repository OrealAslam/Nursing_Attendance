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
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ContentStyle, CardStyle} from '../notestyles';
import {add_nurse_note} from '../../../Helper/AppHelper';
import moment from 'moment';

const MainContent = (props: any) => {
  const [result, setresult] = useState(props.data);
  const [modal, setmodal] = useState(false);
  const [description, setdescription] = useState('');
  const [shift, setshift] = useState('');
  const [modalshift, setmodalshift] = useState('morning');
  const [message, setmessage] = useState('');

  const saveRecord = async () => {
    if (description.length < 1) {
      setmessage('could not enter empty record');
    } else {
      props.setloader(true);
      let response = await add_nurse_note(description, modalshift);
      if (response.status == 'success') {
        setmessage('Added Successfully');
        props.setloader(false);
        ToastAndroid.showWithGravityAndOffset(
          'Record Added Successfully!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          5,
          5,
        );
        setmodal(false);
      } else {
        // setmodal(false);
        console.log('ELSE RES', response);
        props.setloader(false);
        setmessage('Unable to add a note');
      }
    }
  };

  const displayRecord = () => {
    if (result != undefined) {
      let list = result.map((item: any, index: any) => {
        return (
          <View style={CardStyle.card} key={index}>
            <Text style={CardStyle.time}>
              {moment(item.created_at).format('HH:mm A')}
            </Text>
            <View style={CardStyle.mainDescription}>
              <Text style={{color: '#353535',fontSize:12,fontWeight:'500'}}>{item.notes}</Text>
            </View>
          </View>
        );
      });
      return list;
    }
  };

  const searchByShiftTime = (array: any, time: string, date: string) => {
    let filter = [];
    if (shift != '') {
      filter = array.filter((item: any) => item.shift_status === time);
      if (date != '') {
        filter = filter.filter((record: any) =>
          record.created_at.startsWith(moment(date).format('YYYY-MM-DD')),
        );
      }
      return filter;
    } else {
      if (date != '') {
        filter = props.data.filter((record: any) =>
          record.created_at.startsWith(moment(date).format('YYYY-MM-DD')),
        );
        return filter;
      } else {
        return props.data;
      }
    }
  };

  useEffect(() => {
    setresult(props.data);
    let data = searchByShiftTime(props.data, shift, props.datestring);
    setresult(data);
  }, [shift, props.data, props.datestring]);

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

      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}>
        <View style={ContentStyle.cardContainer}>{displayRecord()}</View>
      </ScrollView>
      {/* {props.showaddicon && ( */}

      <View style={{position: 'absolute', bottom: 60}}>
        <TouchableOpacity
          onPress={() => {
            setmodal(true);
          }}>
          <Image
            style={{
              width: 53,
              height: 53,
              alignSelf: 'center',
            }}
            source={require('../../../assets/addIcon.png')}
          />
        </TouchableOpacity>
      </View>
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
              <View style={ContentStyle.navigation}>
                <TouchableOpacity
                  onPress={() => setmodalshift('morning')}
                  style={{marginHorizontal: 10}}>
                  <Image
                    style={ContentStyle.navImage}
                    source={
                      modalshift == 'morning'
                        ? require('../../../assets/morning.png')
                        : require('../../../assets/morningunselect.png')
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setmodalshift('night')}
                  style={{marginHorizontal: 10}}>
                  <Image
                    style={ContentStyle.navImage}
                    source={
                      modalshift == 'night'
                        ? require('../../../assets/night.png')
                        : require('../../../assets/nightunselect.png')
                    }
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="default"
                onChangeText={setdescription}
              />
              <Text style={styles.message}>{message}</Text>

              {props.loader == true ? (
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
  message: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 10,
    color: '#000',
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
    height: 80,
    // lineHeight: 70,
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
