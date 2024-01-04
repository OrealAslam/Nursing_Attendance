import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {HeaderStyle} from '../notestyles';
import CalendarStrip from 'react-native-calendar-strip';

const Header = (props: any) => {
  return (
    <>
      <View style={HeaderStyle.headerContainer}>
        <View style={HeaderStyle.col1}>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => props.navigateScreen('DashboardScreen')}>
            <Image
              style={HeaderStyle.backIcon}
              source={require('../../../assets/backicon.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={HeaderStyle.col2}>
          <Text style={HeaderStyle.heading}>Nurse Notes</Text>
        </View>
      </View>

      <View style={HeaderStyle.calenderContainer}>
        <CalendarStrip
          calendarAnimation={{type: 'sequence', duration: 30}}
          useNativeDriver={true}
          calendarHeaderFormat='MMM YYYY'
          calendarHeaderContainerStyle={{start: '-38%'}}
          highlightDateContainerStyle={{backgroundColor: '#617DE2',borderRadius: 10,borderWidth: 0}}
          leftSelector={<></>}
          rightSelector={<></>}
          scrollable={true}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: '#fff',
          }}
          style={{height: 100, paddingTop: 10, paddingBottom: 10}}
          calendarHeaderStyle={{color: 'white'}}
          dateNumberStyle={{color: 'white', fontSize: 18, fontWeight: '700'}}
          dateNameStyle={{color: '#C3CBE7', fontSize: 12, fontWeight: '500'}}
          highlightDateNumberStyle={{color: '#C3CBE7'}}
          highlightDateNameStyle={{color: '#C3CBE7'}}
          iconLeft={require('../../../assets/backicon.png')}
          iconRight={require('../../../assets/nexticon.png')}
          iconContainer={{flex: 0.1}}
          onDateSelected={e => {
            props.setshowaddicon(true);
            props.setdatestring(e);
          }}
        />
      </View>
    </>
  );
};

export default Header;
