import React from 'react';
import {View, Pressable, Text, ActivityIndicator} from 'react-native';
import styles from './Login_styles';
import CustomInput from './CustomInput';
import MyModal from './MyModal';
export default function Form({form_data, modal, setModal, showLoader = false}) {
  return (
    <View style={styles.flex_con}>
      <Text style={styles.heading}>{form_data.heading}</Text>
      <View style={styles.container}>
        <View style={styles.box}>
          <View>
            {form_data.inputs.map(input => (
              <CustomInput
                key={input.id}
                state={input.state}
                name={input.name}
                InputHandler={() => input.InputHandler(input.name, input.state)}
                isSecureEntry={input.name === 'Password'}
              />
            ))}
          </View>

          <Pressable
            style={styles.Login_button}
            onPress={form_data.submits[0].onSubmit}>
            <Text style={styles.Login_text}>{form_data.submits[0].name}</Text>
          </Pressable>
        </View>
        <View style={styles.SignUp_con}>
          <Text>{form_data.submits[1].desc}</Text>
          <Pressable onPress={form_data.submits[1].onSubmit}>
            <Text style={styles.SignUp_text}>{form_data.submits[1].name}</Text>
          </Pressable>
        </View>
      </View>
      <MyModal modal={modal} setModal={setModal} />
      {showLoader && (
        <ActivityIndicator
          style={[styles.loader]}
          size={'large'}
          animating={true}
        />
      )}
    </View>
  );
}
