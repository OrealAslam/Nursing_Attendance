import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Modal,
  Alert,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ContentStyle, CardStyle} from '../notestyles';
import {add_nurse_note, get_nurse_note} from '../../../Helper/AppHelper';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

const MainContent = (props: any) => {
  const isFocused = useIsFocused();
  const [select, setselect] = useState('morning');
  const [apidata, setapidata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [modal, setmodal] = useState(false);
  const [loader, setloader] = useState(false);
  const [description, setdescription] = useState('');
  const [shift, setshift] = useState('morning');

  useEffect(() => {
    (async () => {
      let requestData = await get_nurse_note();
      setfilterdata(requestData);
      setapidata(requestData);
    })();
  }, [isFocused]);

  // useEffect(() => {
  //   if(apidata.length > 0) {
  //     setfilterdata(searchByShift(apidata, select));
  //     console.log(filterdata.length);
  //   }
  // }, [select]);

  const displayRecord = () => {
    let list = filterdata.map((item: any, index: any) => {
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
  };

  const saveRecord = async () => {
    setloader(true);
    let response = await add_nurse_note(description, shift);
    if (response.status == 'success') {
      setloader(false);
      setmodal(false);
    }
  };

  const searchByShift = (array: any, date: string) => {
    return array.find((item: any) => item.shift_status === date);
  };

  return (
    <View style={ContentStyle.container}>
      <View style={ContentStyle.navigation}>
        <TouchableOpacity
          onPress={() => setselect('morning')}
          style={{marginHorizontal: 10}}>
          <Image
            style={ContentStyle.navImage}
            source={
              select == 'morning'
                ? require('../../../assets/morning.png')
                : require('../../../assets/morningunselect.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setselect('night')}
          style={{marginHorizontal: 10}}>
          <Image
            style={ContentStyle.navImage}
            source={
              select == 'night'
                ? require('../../../assets/night.png')
                : require('../../../assets/nightunselect.png')
            }
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={ContentStyle.cardContainer}>{displayRecord()}</View>
      </ScrollView>

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
