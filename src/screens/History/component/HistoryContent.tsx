import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CardContainer} from '../historystyles';

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
              <Text style={CardContainer.date}>20</Text>
              <Text style={CardContainer.day}>Wed</Text>
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