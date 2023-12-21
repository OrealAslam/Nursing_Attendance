import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {HeaderStyle, CalenderStyle} from '../vitalstyles';

const VitalHeader = (props: any) => {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const monthDateCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const [month, setmonth] = useState(null);

  const ReturnDays = () => {
    let list = days.map((item: any, index: any) => {
      return (
        <View style={CalenderStyle.daycol} key={index}>
          <Text style={CalenderStyle.dayText}>{item}</Text>
        </View>
      );
    });
    return list;
  };

  const ReturnDates = () => {
    let list = [1, 2, 3, 4, 5, 6, 7].map((item: any, index: any) => {
      return (
        <View style={CalenderStyle.daycol} key={index}>
          <Text style={CalenderStyle.dateText}>{item}</Text>
        </View>
      );
    });
    return list;
  };

  useEffect(() => {
    const today = new Date();
    let mon = today.getMonth();
    setmonth(mon);
  }, []);

  useEffect(() => {
    console.log(month);
  }, [month]);

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
          <Text style={HeaderStyle.heading}>Vital Sign Sheet</Text>
        </View>
      </View>

      <View style={HeaderStyle.calenderContainer}>
        {/* Displaying Days */}
        <View style={{flexDirection: 'row'}}>{ReturnDays()}</View>

        {/* Displaying Dates */}
        <View style={{flexDirection: 'row'}}>{ReturnDates()}</View>

        {/* Displaying Navigation Buttons */}
        <View style={CalenderStyle.navigationRow}>
          <TouchableOpacity style={CalenderStyle.navBtn}>
            <Image
              style={{width: 7.03, height: 13.87, marginRight: 10}}
              source={require('../../../assets/backicon.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity style={CalenderStyle.navBtn}>
            <Image
              source={require('../../../assets/nexticon.png')}
              style={{width: 7.03, height: 13.87}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default VitalHeader;
