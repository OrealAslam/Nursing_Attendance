import {
  View,
  Dimensions,
  Alert,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  LogBox,
  NativeModules
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

const { ImagePickerModule } = NativeModules;

const ProfileScreen = ({navigation}: {navigation: any}) => {
  // LogBox.ignoreLogs(['Warning: ...']);
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
  const [imageData, setimageData] = useState(null);
  const [loader, setloader] = useState(true);
  const [postData, setpostData] = useState({});
  const selectImage = async () => {
    try {
      const imagePath = await ImagePickerModule.selectImage();
      console.log('Selected Image Path:', imagePath);
      // You can handle the image path returned from the native module here
    } catch (error) {
      console.error('Image selection error:', error);
    }
  };

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
    setloader(true);
    // const id = await get_async_data('user_id');

    // let obj = {
    //   id: id,
    //   name: name,
    //   dob: dob,
    //   address: address,
    //   profile_image: imageData !=null?imageData[0] : '',
    //   upload_image: imageData !=null?1 : 0,
    // };
    console.log("POST DATA",postData);
    let response = await update_user_profile(postData);
    console.log('RES', response);
    if (response.status == 'success') {
      console.log('AFTER UPDATE OBJ ', response);
      setloader(false);
      console.log('Success', response);
      Alert.alert('Success', 'Profile Updated Successfully');
    } else {
      setloader(false);
      console.log('Error', response);
      Alert.alert('Error', response.message);
    }
  };
  const createFormData = (photo:any, body:any = {}) => {
    const data = new FormData();

    data.append("profile_image", {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri,
    } as any);

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };
  
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: false,
        type: [DocumentPicker.types.images],
      });
      // setimageData(response);
      const id = await get_async_data('user_id');
      let postObject = createFormData(response, {
        id: id,
        name: name,
        dob: dob,
        address: address,
      });
      setpostData(postObject);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('cancel picker');
      } else {
        throw err;
      }
    }
  }, []);

  // const handleDocumentSelection = useCallback(async () => {
  //   try {
  //     const response = await DocumentPicker.pick({
  //       presentationStyle: 'fullScreen',
  //       allowMultiSelection: false,
  //     });
  //     setimageData(response);
  //     seturi(true);
  //     setprofilepicture(response[0].uri)
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       seturi(false);
  //       console.log('cancel picker')
  //     } else {
  //       throw err;
  //     }
  //   }
  // }, []);

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
