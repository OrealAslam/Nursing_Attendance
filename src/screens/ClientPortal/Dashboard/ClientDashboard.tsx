import {View, Image, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from './components/Header';
import Cards from './components/Cards';
import { WHATSAPP_NUMBER } from '../../../Helper/AppHelper';

const ClientDashboard = ({navigation}:{navigation:any}) => {

  const vitalSign = () => {
    navigation.navigate('VitalSignScreen')
  }

  const nurseNotes = () => {
    navigation.navigate('NurseNotesScreen')
  }
  
  const profile = () => {
    navigation.navigate('ProfileScreen')
  }

  return (
    <View style={styles.container}>
      <Header />
      <Cards vitalSign={vitalSign} nurseNotes={nurseNotes} profile={profile}/>
      <View style={styles.whatsappContainer}>
        <TouchableOpacity onPress={()=>Linking.openURL('https://wa.me/' + WHATSAPP_NUMBER)}>
          <Image style={styles.whatsappImage} source={require('../../../assets/whatsapp_helpline.png')}/>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default ClientDashboard;
