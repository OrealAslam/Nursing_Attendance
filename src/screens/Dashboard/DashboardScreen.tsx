import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import DashboardHeader from './components/DashboardHeader';
import DashboardContent from './components/DashboardContent';
import DashboardFooter from './components/DashboardFooter';
import ShiftCompleteModel from '../../components/ShiftCompleteModel';
import StartTimerModel from '../../components/StartTimerModel';
import {get_shift_status} from '../../Helper/AppHelper';
import moment from 'moment';

const DashboardScreen = ({navigation}: {navigation: any}) => {
  const [starttimermodel, setstarttimermodel] = useState(false);
  const [showshiftcomplete, setshowshiftcomplete] = useState(false);
  const [shiftstatus, setshiftstatus] = useState('end');

  const navigateScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  const updateShift = (status: any) => {
    // start / stop shift according to status(yes/no)
    checkingShiftStatus(status);
    setstarttimermodel(false);
  };

  const checkingShiftStatus = (click: string) => {
    // trying to start shift
    if (shiftstatus == 'end' && click == 'yes') {
      setshiftstatus('start');
    }
    if (shiftstatus == 'end' && click == 'no') {
      setshiftstatus('end');
    }

    // trying to end shift
    if (shiftstatus == 'start' && click == 'yes') {
      setshiftstatus('end');
    }
    if (shiftstatus == 'start' && click == 'no') {
      setshiftstatus('start');
    }
  };

  useEffect(() => {
    (async () => {
      let request = await get_shift_status();
      if (request.status == 'success') {
        let status = request.attendance_Status.status;
        if (status == 'ended') {
          setshiftstatus('end');
        } else {
          let attendenceNoted = request.attendance_Status.start_time;
          console.log(moment().format('Y-M-D hh:mm:ss A'));
          // console.log('ELSE PART', request.attendance_Status.start_time);
        }
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <DashboardHeader navigateScreen={navigateScreen} />

      <DashboardContent
        setstarttimermodel={setstarttimermodel}
        shiftstatus={shiftstatus}
      />

      <DashboardFooter navigateScreen={navigateScreen} />
      {showshiftcomplete && (
        <ShiftCompleteModel setshowshiftcomplete={setshowshiftcomplete} />
      )}

      {starttimermodel && (
        <StartTimerModel updateShift={updateShift} shiftstatus={shiftstatus} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1E70',
  },
});

export default DashboardScreen;
