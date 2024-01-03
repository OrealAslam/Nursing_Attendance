import {View, ScrollView, Image, TouchableOpacity, ImageBackground} from 'react-native';
import React from 'react';
import {FooterStyle} from '../dashboardstyles';

const DashboardFooter = (props: any) => {
  return (
    <ImageBackground source={require('../../../assets/footer.png')} style={FooterStyle.conatiner}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={{marginBottom: 8}}
          onPress={() => props.navigateScreen('HolidayScreen')}>
          <Image
            style={FooterStyle.cardstyle}
            source={require('../../../assets/holidayrequest.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginBottom: 8}}
          onPress={() => props.navigateScreen('HistoryScreen')}>
          <Image
            style={FooterStyle.cardstyle}
            source={require('../../../assets/history.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginBottom: 8}}
          onPress={() => props.navigateScreen('VitalSignScreen')}>
          <Image
            style={FooterStyle.cardstyle}
            source={require('../../../assets/vitalsignsheet.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigateScreen('NurseNotesScreen')}>
          <Image
            style={FooterStyle.cardstyle}
            source={require('../../../assets/nursenotes.png')}
          />
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default DashboardFooter;
