import {
  View,
  Dimensions,
  Alert,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProfileHeader from './components/ProfileHeader';
import MainContent from './components/MainContent';
import FooterComponent from './components/FooterComponent';
import ChangePasswordModel from '../../components/ChangePasswordModel';
import {
  IMAGE_BASE_URL,
  UPDATE_PROFILE,
  editableProfileData,
  get_async_data,
  update_user_profile,
} from '../../Helper/AppHelper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImagePicker, MainContainer} from './profilestyles';

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const [model, setmodel] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [dob, setdob] = useState('');
  const [designation, setdesignation] = useState('');
  const [hiringdate, sethiringdate] = useState('');
  const [address, setaddress] = useState('');
  const [profilepicture, setprofilepicture] = useState('');
  const [imageData, setimageData] = useState(null);
  const [loader, setloader] = useState(false);

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
      setprofilepicture(data.profile_picture);
    })();
  }, []);

  const updateRecord = async () => {
    setloader(true);
    const id = await get_async_data('user_id');
    let obj = {
      id: id,
      name: name,
      dob: dob,
      address: address,
      image: imageData != null ? imageData : '',
    };
    console.log('OBJECT', obj);
    let response = await update_user_profile(obj);
    if (response.status == 'success') {
      setloader(false);
    } else {
      setloader(false);
    }
  };

  const captureImage = async (imageData: any) => {
    // console.log(imageData.assets[0]);
    let formData = new FormData();
    formData.append('image',{
      // fileName: 'profilephoto.jpg',
      fileName: imageData.assets[0].fileName,
      fileSize: imageData.assets[0].fileSize,
      height: imageData.assets[0].height,
      originalPath: imageData.assets[0].originalPath,
      type: imageData.assets[0].type,
      uri: imageData.assets[0].uri,
      width: imageData.assets[0].width,
    })
    setimageData(formData._parts[0][1]);
  };

  return (
    <ImageBackground
      style={{width: width, height: height}}
      source={require('../../assets/appbackground.png')}>
      <ProfileHeader
        profilepicture={profilepicture}
        setprofilepicture={setprofilepicture}
        navigateScreen={navigateScreen}
        setimageData={setimageData}
      />

      <View style={MainContainer.container}>
        <View style={ImagePicker.container}>
          {profilepicture != '' ? (
            <Image
              style={ImagePicker.imageStyle}
              source={{uri: IMAGE_BASE_URL + profilepicture}}
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
            onPress={() =>
              launchImageLibrary(
                {
                  mediaType: 'photo',
                  assetRepresentationMode: 'current',
                  quality: 1,
                  includeBase64: false,
                  presentationStyle: 'overFullScreen',
                },
                async (response: any) => {
                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else {
                    await captureImage(response);
                  }
                },
              )
            }
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