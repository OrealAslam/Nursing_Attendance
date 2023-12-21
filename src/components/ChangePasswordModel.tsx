import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {update_password} from '../Helper/AppHelper';

const {width, height} = Dimensions.get('window');
const buttonWidth = width - 140;
const buttonratio = buttonWidth / 880;

const ChangePasswordModel = (props: any) => {
  const [currentpassword, setcurrentpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmnewpassword, setconfirmnewpassword] = useState('');
  const [loader, setloader] = useState(false);
  const [message, setmessage] = useState('');

  const updatePassword = async () => {
    if (
      currentpassword.length < 5 ||
      newpassword.length < 5 ||
      confirmnewpassword.length < 5
    ) {
      setmessage('password length must not be less than 5');
    } else {
      setloader(true);
      const request = await update_password(
        currentpassword,
        newpassword,
        confirmnewpassword,
      );
      if (request.status == 'success') {
        setmessage(request.message);
        setTimeout(() => {
          props.setmodel(false);
        }, 1000);
        setloader(false);
      } else {
        setmessage(request.message);
      }
      setloader(false);
    }
  };

  return (
    <Animatable.View
      animation="bounceInDown"
      style={styles.container}
      duration={1700}>
      <View style={styles.modelContainer}>

        <Text style={styles.heading}>New Password</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.inputText}
            value={currentpassword}
            onChangeText={setcurrentpassword}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.inputText}
            value={newpassword}
            onChangeText={setnewpassword}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.inputText}
            value={confirmnewpassword}
            onChangeText={setconfirmnewpassword}
            secureTextEntry={true}
          />
        </View>
        {loader == true ? (
          <ActivityIndicator size={'small'} color={'#000'} />
        ) : (
          <>
            <TouchableOpacity style={{marginTop: 10}} onPress={() => updatePassword()}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: buttonWidth,
                  height: 184 * buttonratio,
                }}
                source={require('../assets/done.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.setmodel(false)}>
              <Text style={{textAlign: 'center', marginTop: 5, marginBottom: 5}}>Close</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.error}>{message}</Text>
      </View>
    </Animatable.View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: `rgba(0,0,0,0.7)`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelContainer: {
    width: (84 / 100) * width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 12,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 37,
    width: '21%',
    alignSelf: 'center',
    borderBottomColor: '#B8B8B8',
    borderBottomWidth: 1,
  },
  inputContainer: {
    width: (70 / 100) * width,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  heading: {
    color: '#202020',
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    // marginBottom: 10,
  },
  label: {
    color: '#6A7C8D',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: .7,
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  inputText: {
    color: '#2A2A2E',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    textTransform: 'capitalize',
    paddingVertical: 8,
    borderColor: '#ECEEFA',
    borderWidth: 1,
    borderRadius: 6.3,
    marginBottom: 5
  },
  error: {
    textAlign: 'center',
    top: 5,
    color: '#f00',
    textTransform: 'capitalize',
    fontSize: 10,
  },
});

export default ChangePasswordModel;