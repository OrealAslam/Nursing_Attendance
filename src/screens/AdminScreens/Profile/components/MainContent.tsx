import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {HeaderStyle, TextArea} from '../profilestyles';

const MainContent = (props: any) => {
  return (
    <>
      <View style={TextArea.inputContainer}>
        <Text style={TextArea.label}>Your Name</Text>
        <TextInput
          style={TextArea.inputText}
          value={props.name}
          onChangeText={props.setname}
        />
      </View>

      <View style={TextArea.inputContainer}>
        <Text style={TextArea.label}>Date of Birth</Text>
        <TextInput
          style={TextArea.inputText}
          value={props.dob}
          keyboardType="number-pad"
          onChangeText={props.setdob}
        />
      </View>

      <View style={TextArea.inputContainer}>
        <Text style={TextArea.label}>Designation</Text>
        <TextInput
          style={TextArea.inputText}
          editable={false}
          value={props.designation}
        />
      </View>

      <View style={TextArea.inputContainer}>
        <Text style={TextArea.label}>Address</Text>
        <TextInput
          style={TextArea.inputText}
          value={props.address}
          onChangeText={props.setaddress}
        />
      </View>

      <View style={TextArea.inputContainer}>
        <Text style={TextArea.label}>Hiring Date</Text>
        <TextInput
          style={TextArea.inputText}
          editable={false}
          value={props.hiringdate}
        />
      </View>

      <View style={[TextArea.inputContainer, {marginBottom: 0}]}>
        <Text style={TextArea.label}>Email</Text>
        <TextInput
          style={TextArea.inputText}
          editable={false}
          value={props.email}
        />
      </View>
    </>
  );
};

export default MainContent;
