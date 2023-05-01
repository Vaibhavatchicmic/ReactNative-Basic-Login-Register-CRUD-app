import React, {useState} from 'react';
import {Alert} from 'react-native';
import CallApi, {setToken} from '../Utility/network';

import Form from './Form';

export function Login({setIsLogin, navigation}) {
  const [modal, setModal] = useState({isVisible: false, text: 'dfasdf'});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [inputData, setInputData] = useState({email: '', password: ''});
  const [status, setStatus] = useState('Input');

  function handleLogin() {
    if (email === '') {
      setModal({isVisible: true, text: "Email can't be empty"});
      return;
    }
    if (password === '') {
      setModal({isVisible: true, text: "Password can't be empty"});
      return;
    }

    const body = {
      uid: email,
      password: password,
    };

    CallApi('users/login', 'POST', body).then(r => {
      if (r.message) {
        setModal({isVisible: true, text: r.message});
        setStatus('Input');
        return;
      } else {
        setStatus('Loaded');
        // Alert.alert(r.token);
        setToken(r.token);
      }
    });
    setStatus('Loading');
  }

  const form_data = {
    heading: 'Login',
    inputs: [
      {
        name: 'Email',
        state: email,
        InputHandler: setEmail,
        id: 1,
      },
      {
        name: 'Password',
        state: password,
        InputHandler: setPassword,
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
          // Alert.alert('hkd');
          navigation.navigate('Register');
        },
        desc: 'Have an account? ',
      },
    ],
  };

  return (
    <Form
      form_data={form_data}
      modal={modal}
      setModal={setModal}
      showLoader={status === 'Loading'}
    />
  );
}
