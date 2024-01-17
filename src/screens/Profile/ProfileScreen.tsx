import {
  View,
  Dimensions,
  Alert,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  NativeModules,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import ProfileHeader from './components/ProfileHeader';
import MainContent from './components/MainContent';
import FooterComponent from './components/FooterComponent';
import ChangePasswordModel from '../../components/ChangePasswordModel';
import axios, {isCancel, AxiosError} from 'axios';
import {
  IMAGE_BASE_URL,
  LOCAL_UPLOAD_IMAGE,
  UPDATE_PROFILE,
  editableProfileData,
  get_async_data,
} from '../../Helper/AppHelper';
import DocumentPicker, {types} from 'react-native-document-picker';
import {ImagePicker, MainContainer} from './profilestyles';
import {useIsFocused} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const {ImagePickerModule} = NativeModules;

const data = new FormData();

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const isFocused = useIsFocused();
  const [model, setmodel] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [dob, setdob] = useState('');
  const [designation, setdesignation] = useState('');
  const [hiringdate, sethiringdate] = useState('');
  const [address, setaddress] = useState('');
  const [profilepicture, setprofilepicture] = useState('');
  const [uploadimage, setuploadimage] = useState(0);
  const [loader, setloader] = useState(true);
  const [postData, setpostData] = useState({});
  const [error, seterror] = useState(false);
  const [pickedImage, setpickedImage] = useState('');

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
      sethiringdate(data.created_at);
      setaddress(data.address);
      setprofilepicture(data.image);

      setpostData({
        id: data.id,
        name: data.name,
        dob: data.dob,
        address: data.address,
      });
      setloader(false);
    })();
  }, [loader, isFocused]);

  const updateRecord = async () => {
    setloader(true);
    const id = await get_async_data('user_id');
    data.append('id', id);
    data.append('name', name);
    data.append('dob', dob);
    data.append('address', address);
    data.append('upload_image', uploadimage);
    var config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        // 'Content-Disposition': 'form-data; name="profile_image"',
      },
    };
    axios
      .post(UPDATE_PROFILE, data, config)
      .then((res: any) => {
        if (res.status == 200) {
          Alert.alert('Success', 'Profile Updated Successfully');
        }
        setloader(false);
      })
      .catch((err: any) => {
        console.log('Axios Error', err);
      });
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const file = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: false,
        type: [DocumentPicker.types.images],
      });

      if (file && file[0]) {
        data.append('profile_image', {
          uri:
            Platform.OS === 'android'
              ? file[0].uri
              : file[0].uri.replace('file://', ''),
          name: file[0]?.name,
          type: file[0]?.type,
        });
        setuploadimage(1);

        Platform.OS === 'android'
          ? setpickedImage(file[0].uri)
          : setpickedImage(file[0].uri.replace('file://', ''));
      }
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
          {profilepicture != '' && error != true ? (
            pickedImage != '' ? ( <Image
              onError={() => seterror(true)}
              style={ImagePicker.imageStyle}
              source={{uri: pickedImage}}
            />) : ( <Image
              onError={() => seterror(true)}
              style={ImagePicker.imageStyle}
              source={{uri: IMAGE_BASE_URL + profilepicture}}
            />)
           
          ) : (
            <Image
              style={ImagePicker.imageStyle}
              source={require('../../assets/defaultprofileimage.png')}
            />
          )}
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
