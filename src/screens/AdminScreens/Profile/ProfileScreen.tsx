import {ScrollView, View, Dimensions, ToastAndroid, Platform, ActivityIndicator} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import ProfileHeader from './components/ProfileHeader';
import MainContent from './components/MainContent';
import FooterComponent from './components/FooterComponent';
import ChangePasswordModel from '../../../components/ChangePasswordModel';
import DocumentPicker, {types} from 'react-native-document-picker';
import axios, {isCancel, AxiosError} from 'axios';
import {
  editableProfileData,
  get_async_data,
  update_user_profile,
  UPDATE_PROFILE,
} from '../../../Helper/AppHelper';

const {width, height} = Dimensions.get('window');
const data = new FormData();

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const [model, setmodel] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [dob, setdob] = useState('');
  const [designation, setdesignation] = useState('');
  const [hiringdate, sethiringdate] = useState('');
  const [address, setaddress] = useState('');
  const [profilepicture, setprofilepicture] = useState('');
  const [imageData, setimageData] = useState('');
  const [error, seterror] = useState(false);
  const [pickedImage, setpickedImage] = useState('');
  const [uploadimage, setuploadimage] = useState(0);
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
  }, []);

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
          setloader(false);
          ToastAndroid.showWithGravityAndOffset(
            'Profile Updated Successfully',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            5,
            5,
          );
        }
      })
      .catch((err: any) => {
        console.log('Axios Error', err);
        setloader(false);
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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ProfileHeader
        profilepicture={profilepicture}
        setprofilepicture={setprofilepicture}
        navigateScreen={navigateScreen}
        setimageData={setimageData}
        handleDocumentSelection={handleDocumentSelection}
        seterror={seterror}
        error={error}
        pickedImage={pickedImage}
      />
      <ScrollView
        style={{maxHeight: (56 / 100) * height}}
        showsHorizontalScrollIndicator={false}>
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
      </ScrollView>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {loader == true ? (
          <ActivityIndicator size={'large'} color={'#b4b4b4'} />
        ) : (
          <FooterComponent setmodel={setmodel} updateRecord={updateRecord} />
        )}
      </View>

      {model && <ChangePasswordModel setmodel={setmodel} />}
    </View>
  );
};

export default ProfileScreen;
