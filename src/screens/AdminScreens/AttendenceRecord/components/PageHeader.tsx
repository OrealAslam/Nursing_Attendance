import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

const buttonWidth = width / 3 - 30;
const buttonRatio = buttonWidth / 372;

const PageHeader = (props: any) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={() => props.navigateScreen('AdminDshboard')}>
          <Image
            style={styles.backIcon}
            source={require('../../../../assets/backicon.png')}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Attendence Record</Text>
      </View>

      <View style={styles.headerContainer}>
        <View style={styles.navigationContainer}>
          <TouchableOpacity onPress={() => props.setselect('day')}>
            <Image
              style={styles.button}
              source={
                props.select == 'day'
                  ? require('../../../../assets/images/dayselect.png')
                  : require('../../../../assets/images/dayunselect.png')
              }
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.setselect('night')}>
            <Image
              style={styles.button}
              source={
                props.select == 'night'
                  ? require('../../../../assets/images/nightselect.png')
                  : require('../../../../assets/images/nightunselect.png')
              }
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.setselect('all')}>
            <Image
              style={styles.button}
              source={
                props.select == 'all'
                  ? require('../../../../assets/images/allselect.png')
                  : require('../../../../assets/images/allunselect.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 7.03,
    height: 13.87,
  },
  heading: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: '22%',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (90 / 100) * width,
    justifyContent: 'space-between',
  },
  button: {
    width: buttonWidth,
    height: 162 * buttonRatio,
  },
});

export default PageHeader;
