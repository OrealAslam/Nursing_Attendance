import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

import React, {useState} from 'react';
import {loginNurse, set_async_data} from '../Helper/AppHelper';
const {width, height} = Dimensions.get('window');
const buttonWidth = width - 50;
const ratio = buttonWidth / 1232;

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [phone, setphone] = useState('');
  const [password, setpassword] = useState('');
  const [errormessage, seterrormessage] = useState('');
  const [loader, setloader] = useState(false);

  const Login = async () => {
    setloader(true);
    if (phone.length < 11 || password.length < 5) {
      seterrormessage('Enter correct phone number or password');
    } else {
      seterrormessage('');
      const request = await loginNurse(phone, password);
      if (request.status == 'error') {
        seterrormessage(request.message);
      }
      if (request.status == 'success') {
        seterrormessage(request.message);
        await set_async_data('user_id', request.data.id);
        await set_async_data('username', request.data.name);
        await set_async_data('designation', request.data.designation);
        await set_async_data('email', request.data.email);
        await set_async_data('dob', request.data.dob);
        await set_async_data('address', request.data.address);
        await set_async_data('hiring_date', request.data.created_at);
        await set_async_data('profile_picture', request.data.image);

        navigation.navigate('MainRoute');
      }
    }

    setloader(false);
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.screenBackground}>
      <View style={styles.containerOne}>
        <Image
          style={styles.headerLogo}
          source={require('../assets/headerLogo.png')}
        />
      </View>
      <View style={styles.containerTwo}>
        <TextInput
          style={styles.textInput}
          keyboardType="phone-pad"
          placeholder="Phone"
          onChangeText={setphone}
          maxLength={11}
          value={phone}
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={setpassword}
          style={styles.textInput}
          placeholder="Password"
          value={password}
        />

        {errormessage != '' && (
          <Text style={styles.errorMessage}>{errormessage}</Text>
        )}
      </View>
      <View style={styles.containerThree}>
        {loader == true ? (
          <ActivityIndicator color={'#fff'} size={'large'} />
        ) : (
          <TouchableOpacity onPress={() => Login()}>
            <Image
              style={styles.saveButton}
              source={require('../assets/save.png')}
            />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    width: width,
    height: height,
  },
  headerLogo: {
    width: 170,
    height: 31.06,
    alignSelf: 'center',
  },
  containerOne: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTwo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  containerThree: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    width: buttonWidth,
    height: 184 * ratio,
    marginTop: 30,
  },
  errorMessage: {
    color: '#fff',
    fontSize: 11,
  },
});
export default LoginScreen;