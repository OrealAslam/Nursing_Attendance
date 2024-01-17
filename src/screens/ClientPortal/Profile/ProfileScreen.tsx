import {
  View,
  Dimensions,
  Alert,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ToastAndroid
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import ProfileHeader from './components/ProfileHeader';
import MainContent from './components/MainContent';
import FooterComponent from './components/FooterComponent';
import ChangePasswordModel from '../../../components/ChangePasswordModel';
import {
  IMAGE_BASE_URL,  UPDATE_PROFILE,  editableProfileData,
  get_async_data,
} from '../../../Helper/AppHelper';
import DocumentPicker, { types } from 'react-native-document-picker';
import {ImagePicker, MainContainer} from './profilestyles';
import axios from 'axios';

const {width, height} = Dimensions.get('window');
const data = new FormData();

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const [model, setmodel] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [dob, setdob] = useState('');
  const [designation, setdesignation] = useState('');
  const [phone, setphone] = useState('');
  const [address, setaddress] = useState('');
  const [profilepicture, setprofilepicture] = useState('');
  const [imageData, setimageData] = useState({});
  const [loader, setloader] = useState(false);
  const [error, seterror] = useState(false);
  const [pickedImage, setpickedImage] = useState('');
  const [uploadimage, setuploadimage] = useState(0);

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
      setphone(data.phone_number);
      setaddress(data.address);
      setprofilepicture(data.image);
    })();
  }, [loader]);


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
          ToastAndroid.showWithGravityAndOffset(
            'Profile Updated Successfully!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            5,
            5,
          );
        }
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
      source={require('../../../assets/appbackground.png')}>
      <ProfileHeader
        profilepicture={profilepicture}
        setprofilepicture={setprofilepicture}
        navigateScreen={navigateScreen}
        setimageData={setimageData}
      />

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
              source={require('../../../assets/defaultprofileimage.png')}
            />
          )}
          <TouchableOpacity
            onPress={handleDocumentSelection}
            style={ImagePicker.editButton}>
            <Image
              style={ImagePicker.editButtonImg}
              source={require('../../../assets/editprofilepicbtn.png')}
            />
          </TouchableOpacity>
        </View>
        <MainContent
          name={name}
          email={email}
          address={address}
          dob={dob}
          designation={designation}
          phone={phone}
          setname={setname}
          setemail={setemail}
          setdob={setdob}
          setdesignation={setdesignation}
          setphone={setphone}
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
