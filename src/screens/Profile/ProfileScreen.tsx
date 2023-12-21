import {
  View,
  Dimensions,
  Alert,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProfileHeader from './components/ProfileHeader';
import MainContent from './components/MainContent';
import FooterComponent from './components/FooterComponent';
import ChangePasswordModel from '../../components/ChangePasswordModel';
import {
  IMAGE_BASE_URL,
  editableProfileData,
  get_async_data,
  update_user_profile,
  upload_user_image,
} from '../../Helper/AppHelper';
import DocumentPicker from 'react-native-document-picker';
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
    const id = await get_async_data('user_id');
    let obj = {
      id: id,
      name: name,
      dob: dob,
      address: address,
      image: '',
    };

    let response = await update_user_profile(obj);
    if (response.status == 'success') {
      Alert.alert('Updated', 'Profile Updated Successfully');
    }
  };

  const pickImage = async () => {
    let username = await get_async_data('username');
    let dob = await get_async_data('dob');
    let address = await get_async_data('address');
    let id = await get_async_data('user_id');

    let finalObj = {
      id: id,
      name: username,
      dob: dob,
      address: address,
      image: {},
    };
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      // Upload FiLe Here
      const formData = new FormData();
      formData.append('image', {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      });
      finalObj.image = formData?._parts[0][1];
      let response = await upload_user_image(finalObj);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('cancel', err);
      } else {
        // Handle other errors
        console.log('other', err);
      }
    }
  };

  let uploadImage = async (imageData: any) => {
    const formdata = new FormData();
    formdata.append('image', {
      uri: imageData.uri,
      type: imageData.type,
      name: imageData.fileName,
    });
    setimageData(formdata?._parts[0][1]);
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

          <TouchableOpacity
            onPress={() => pickImage()}
            style={ImagePicker.editButton}>
            <Image
              style={ImagePicker.editButtonImg}
              source={require('../../assets/editprofilepicbtn.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Picker.launchCamera(
                {
                  assetRepresentationMode: 'auto',
                  mediaType: 'photo',
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
                    await uploadImage(response.assets[0]);
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
        <FooterComponent setmodel={setmodel} updateRecord={updateRecord} />
      </View>
      {model && <ChangePasswordModel setmodel={setmodel} />}
    </ImageBackground>
  );
};

export default ProfileScreen;
