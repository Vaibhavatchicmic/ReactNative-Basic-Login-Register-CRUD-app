import {View, Text, TextInput, id} from 'react-native';
import React from 'react';
import styles from './Login_styles';

const CustomInput = ({
  state = '',
  name = '',
  InputHandler = () => {},
  isSecureEntry = false,
}) => {
  return (
    <View id={id}>
      <Text style={styles.text}>{name}</Text>
      <TextInput
        style={styles.input}
        value={state}
        placeholder={`Enter your ${name}`}
        onChangeText={InputHandler}
        secureTextEntry={isSecureEntry}
      />
    </View>
  );
};

export default CustomInput;
