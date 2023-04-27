import React, {useState} from 'react';
import {Alert} from 'react-native';

import Form from './Form';

export function Login({setIsLogin, navigation}) {
  const [modal, setModal] = useState({isVisible: false, text: 'dfasdf'});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlePasswordInput(text) {
    setPassword(text);
  }
  function handleEmailInput(text) {
    setEmail(text);
  }

  function handleLogin() {
    if (email === '') {
      setModal({isVisible: true, text: "Email can't be empty"});
    }
    if (password === '') {
      setModal({isVisible: true, text: "Password can't be empty"});
    }
  }

  const form_data = {
    heading: 'Login',
    inputs: [
      {
        name: 'Email',
        state: email,
        InputHandler: handleEmailInput,
        id: 1,
      },
      {
        name: 'Password',
        state: password,
        InputHandler: handlePasswordInput,
        id: 2,
      },
    ],
    submits: [
      {
        name: 'Login',
        onSubmit: () => {
          //   Alert.alert('Trying to Register');
          handleLogin();
        },
      },
      {
        name: 'Sign-Up',
        onSubmit: () => {
          Alert.alert('hkd');
        },
        desc: 'Have an account? ',
      },
    ],
  };

  return <Form form_data={form_data} modal={modal} setModal={setModal} />;
}
