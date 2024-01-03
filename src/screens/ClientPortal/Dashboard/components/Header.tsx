import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {styles, ImagePicker} from '../styles';
import {
  IMAGE_BASE_URL,
  editableProfileData,
} from '../../../../Helper/AppHelper';

const Header = (props: any) => {
  const [imageData, setimageData] = useState({});
  const [profilepicture, setprofilepicture] = useState('');
  const [name, setname] = useState('');
  const [loader, setloader] = useState(false);

  useEffect(() => {
    (async () => {
      let data = await editableProfileData();
      setname(data.name);
      setprofilepicture(data.image);
    })();
  }, [loader]);

  return (
    <View>
      <ImageBackground
        style={styles.imageHeader}
        source={require('../../../../assets/client_dashboard_header.png')}>
        <View style={ImagePicker.container}>
          {profilepicture != '' ? (
            <Image
              style={ImagePicker.imageStyle}
              source={{uri: IMAGE_BASE_URL + profilepicture}}
            />
          ) : (
            <Image
              style={ImagePicker.imageStyle}
              source={require('../../../../assets/defaultprofileimage.png')}
            />
          )}
          <View>
            <TouchableOpacity style={ImagePicker.editButton}>
              <Image
                style={ImagePicker.editButtonImg}
                source={require('../../../../assets/editprofilepicbtn.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={{width: '88%', marginVertical: 20}}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.name}>
              {name}{' '}
              <Image
                style={styles.waveIcon}
                source={require('../../../../assets/wave.png')}
              />
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Header;
