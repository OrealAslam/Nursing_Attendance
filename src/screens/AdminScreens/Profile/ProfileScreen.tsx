import {ScrollView, View, Dimensions, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProfileHeader from './components/ProfileHeader';
import MainContent from './components/MainContent';
import FooterComponent from './components/FooterComponent';
import ChangePasswordModel from '../../../components/ChangePasswordModel';
import {
  editableProfileData,
  get_async_data,
  update_user_profile,
} from '../../../Helper/AppHelper';

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
    if(response.status == 'success') {
      Alert.alert('Updated', 'Profile Updated Successfully');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ProfileHeader
        profilepicture={profilepicture}
        setprofilepicture={setprofilepicture}
        navigateScreen={navigateScreen}
        setimageData={setimageData}
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
        <FooterComponent setmodel={setmodel} updateRecord={updateRecord} />
      </View>

      {model && <ChangePasswordModel setmodel={setmodel} />}
    </View>
  );
};

export default ProfileScreen;
