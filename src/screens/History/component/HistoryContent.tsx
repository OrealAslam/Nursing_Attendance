import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CardContainer} from '../historystyles';
import moment from 'moment';
const HistoryContent = (props: any) => {
  const [historyData, sethistoryData] = useState(props.history);

  useEffect(() => {
    let history = display_history();
  }, []);

  const display_history = () => {
    if (historyData.length > 0) {
      let data = historyData.map((item: any, index:any) => {
        return (
          <View style={CardContainer.card} key={index}>
            <View style={CardContainer.column1}>
              <Text style={CardContainer.date}>{moment(item.created_at).format('D')}</Text>
              <Text style={CardContainer.day}>{moment(item.created_at).format('ddd')}</Text>
            </View>

            <View style={CardContainer.column2}>
              <Text style={CardContainer.dutyStatus}>{item.status}</Text>
              <Text style={CardContainer.dutyTime}>{item.time_duration}</Text>
            </View>
          </View>
        );
      });
      return data;
    }
    return <Text style={CardContainer.date}>No Data Found</Text>;
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={CardContainer.container}>
      <Text style={CardContainer.heading}>October 2023</Text>
      {display_history()}
    </ScrollView>
  );
};
export default HistoryContent;