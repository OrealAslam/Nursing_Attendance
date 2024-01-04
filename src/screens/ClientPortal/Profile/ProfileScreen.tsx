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
import ChangePasswordModel from '../../../components/ChangePasswordModel';
import {
  IMAGE_BASE_URL,  editableProfileData,
  get_async_data,
  update_user_profile,
} from '../../../Helper/AppHelper';
import DocumentPicker, { types } from 'react-native-document-picker';
import {ImagePicker, MainContainer} from './profilestyles';

const {width, height} = Dimensions.get('window');

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
    let obj = {
      id: id,
      name: name,
      dob: dob,
      address: address,
      image: imageData ? imageData : '',
    };
    let response = await update_user_profile(obj);
    if (response.status == 'success') {
      setloader(false);
    } else {
      setloader(false);
    }
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: false,
      });
      setimageData(response[0]);
    } catch (err) {
      console.warn(err);
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
          {/* {profilepicture != '' ? (
            <Image
              style={ImagePicker.imageStyle}
              source={{uri: IMAGE_BASE_URL + profilepicture}}
            />
          ) : ( */}
            <Image
              style={ImagePicker.imageStyle}
              source={require('../../../assets/defaultprofileimage.png')}
            />
          {/* )} */}

          <TouchableOpacity style={ImagePicker.editButton}>
            <Image
              style={ImagePicker.editButtonImg}
              source={require('../../../assets/editprofilepicbtn.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{}}
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
