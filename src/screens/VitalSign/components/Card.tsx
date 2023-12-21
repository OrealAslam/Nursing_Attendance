import {View, Text, Image} from 'react-native';
import React from 'react';
import {CardStyle} from '../vitalstyles';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const Card = (props: any) => {
  const displayCard = () => {
    if (props.record.length > 0) {
      let list = props.record.map((item:any, index:any) => {
        return (
          <View style={CardStyle.cardcontainer} key={index}>
            <View style={CardStyle.row1}>
              <View style={CardStyle.column1}>
                <View style={CardStyle.subColumn}>
                  <Text style={CardStyle.title}>Blood Pressure</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{width: 16.02, height: 13.54}}
                      source={require('../../../assets/bloodpressure.png')}
                    />
                    <Text style={CardStyle.measurement}>{item.blood_pressure != null ? item.blood_pressure.replace('/', '-'): 0}</Text>
                  </View>
                </View>

                <View style={CardStyle.subColumn}>
                  <Text style={CardStyle.title}>Pulse Rate</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{width: 8.94, height: 14}}
                      source={require('../../../assets/pulserate.png')}
                    />
                    <Text style={CardStyle.measurement}>{item.pulse_rate != null ?item.pulse_rate: 0}</Text>
                  </View>
                </View>
              </View>

              <View>
                <AnimatedCircularProgress
                  size={90}
                  width={8}
                  fill={item.temperature!=null?parseInt(item.temperature.replace('.c','')):0}
                  tintColor="#4E65BD"
                  backgroundColor="#D0E3EA">
                  {fill => (
                    <>
                      <Text style={CardStyle.tempText}>{item.temperature!=null?item.temperature:null}</Text>
                      <Text
                        style={{
                          color: '#5A5A5C',
                          fontSize: 9,
                          fontWeight: '600',
                        }}>
                        Temperature
                      </Text>
                    </>
                  )}
                </AnimatedCircularProgress>
              </View>
            </View>

            <View style={CardStyle.row2}>
              <View>
                <Text
                  style={[
                    CardStyle.title,
                    {
                      borderBottomColor: '#EECECE',
                      borderBottomWidth: 3,
                      lineHeight: 21,
                    },
                  ]}>
                  Resp
                </Text>
                <Text style={CardStyle.boldText}>{item.resp != null ?item.resp: 0}</Text>
              </View>
              <View>
                <Text
                  style={[
                    CardStyle.title,
                    {
                      borderBottomWidth: 3,
                      borderBottomColor: '#EECECE',
                      lineHeight: 21,
                    },
                  ]}>
                  SPO2
                </Text>
                <Text style={CardStyle.boldText}>{item.spo2 != null ?item.spo2: 0}</Text>
              </View>
              <View>
                <Text
                  style={[
                    CardStyle.title,
                    {
                      borderBottomWidth: 3,
                      borderBottomColor: '#EECECE',
                      lineHeight: 21,
                    },
                  ]}>
                  BSR
                </Text>
                <Text style={CardStyle.boldText}>{item.bsr} mg/dL</Text>
              </View>
            </View>

            <View style={CardStyle.row3}>
              <Text style={[CardStyle.title, {fontSize: 13}]}>Remarks</Text>
              <Text style={CardStyle.description}>
                {item.remarks}
              </Text>
            </View>
          </View>
        );
      });
      return list;
    }
  };

  return (
    <>
    {displayCard()}
    </>
  );
};

export default Card;
