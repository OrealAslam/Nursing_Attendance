import {
  View,
  Dimensions,
  Alert,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import ProfileHeader from './components/ProfileHeader';
import MainContent from './components/MainContent';
import FooterComponent from './components/FooterComponent';
import ChangePasswordModel from '../../components/ChangePasswordModel';
import {
  IMAGE_BASE_URL,
  editableProfileData,
  get_async_data,
  update_user_profile,
} from '../../Helper/AppHelper';
import DocumentPicker, {types} from 'react-native-document-picker';
import {ImagePicker, MainContainer} from './profilestyles';
import {useIsFocused} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const isFocused = useIsFocused();
  const [model, setmodel] = useState(false);
  const [uri, seturi] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [dob, setdob] = useState('');
  const [designation, setdesignation] = useState('');
  const [hiringdate, sethiringdate] = useState('');
  const [address, setaddress] = useState('');
  const [profilepicture, setprofilepicture] = useState('');
  const [imageData, setimageData] = useState([]);
  const [loader, setloader] = useState(true);

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    (async () => {
      let data = await editableProfileData();
      setname(data.name);
      setemail(data.email);
      setdob(data.dob);
      setdesignation(data.designation);
      sethiringdate(data.hiring_date);
      setaddress(data.address);
      setprofilepicture(data.image);
      setloader(false);
    })();
  }, [loader, isFocused]);

  const updateRecord = async () => {
    // setloader(true);
    const id = await get_async_data('user_id');
    let obj = {
      id: id,
      name: name,
      dob: dob,
      address: address,
      profile_image: imageData.length > 0 ? imageData[0] : '',
      upload_image: imageData.length > 0 ? 1 : 0,
    };

    const formData = new FormData();
    formData.append('data', {
      id: id,
      name: name,
      dob: dob,
      address: address,
      profile_image: imageData.length > 0 ? imageData[0] : '',
      upload_image: imageData.length > 0 ? 1 : 0,
    });

    console.log('formData', formData._parts[0][1]);
    
    let response = await update_user_profile(formData._parts[0][1]);
    if (response.status == 'success') {
    console.log('SUCCESS RESPONSE: ', response);
      setloader(false);
      Alert.alert('Success', 'Profile Updated Successfully');
    } else {
      setloader(false);
      console.log(response);
      Alert.alert('Error Response', response.message);
    }
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const file = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: false,
      });
      setimageData(file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('cancel picker');
      } else {
        throw err;
      }
    }
  }, []);

  return (
    <ImageBackground
      style={{width: width, height: height}}
      source={require('../../assets/appbackground.png')}>
      <ProfileHeader navigateScreen={navigateScreen} />

      <View style={MainContainer.container}>
        <View style={ImagePicker.container}>
          {profilepicture != '' ? (
            <Image
              style={ImagePicker.imageStyle}
              source={{uri: IMAGE_BASE_URL + profilepicture}}
              // source={{uri: uri== true ? profilepicture : IMAGE_BASE_URL + profilepicture}}
            />
          ) : (
            <Image
              style={ImagePicker.imageStyle}
              source={require('../../assets/defaultprofileimage.png')}
            />
          )}

          <TouchableOpacity style={ImagePicker.editButton}>
            <Image
              style={ImagePicker.editButtonImg}
              source={require('../../assets/editprofilepicbtn.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDocumentSelection}
            style={ImagePicker.editButton}>
            <Image
              style={ImagePicker.editButtonImg}
              source={require('../../assets/editprofilepicbtn.png')}
            />
          </TouchableOpacity>
        </View>
        <MainContent
          name={name}
          email={email}
          address={address}
          dob={dob}
          designation={designation}
          hiringdate={hiringdate}
          setname={setname}
          setemail={setemail}
          setdob={setdob}
          setdesignation={setdesignation}
          sethiringdate={sethiringdate}
          setaddress={setaddress}
        />
        {loader == true ? (
          <ActivityIndicator size={'large'} color={'#b4b4b4'} />
        ) : (
          <FooterComponent setmodel={setmodel} updateRecord={updateRecord} />
        )}
      </View>
      {model && <ChangePasswordModel setmodel={setmodel} />}
    </ImageBackground>
  );
};

export default ProfileScreen;
