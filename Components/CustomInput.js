import {View, Text, TextInput} from 'react-native';
import React from 'react';
import styles from './Login_styles';

// function handleInputChange(value, name, inputData, setInputData) {
//   // console.log(inputData);

//   setInputData({
//     ...inputData,
//     [name]: value,
//   });
// }

const CustomInput = ({
  state = '',
  name = '',
  setCrudInput = () => {},
  isSecureEntry = false,
}) => {
  return (
    <View>
      <Text style={styles.text}>{name}</Text>
      <TextInput
        name={name}
        style={styles.input}
        value={state}
        placeholder={`Enter your ${name}`}
        onChangeText={setCrudInput}
        secureTextEntry={isSecureEntry}
      />
    </View>
  );
};

export default CustomInput;
