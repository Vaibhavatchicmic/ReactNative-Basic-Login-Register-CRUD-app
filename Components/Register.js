import React, {useState} from 'react';
import {Alert} from 'react-native';
import CallApi, {setToken} from '../Utility/network';

import Form from './Form';

export function Register({setIsLogin, navigation}) {
  const [modal, setModal] = useState({isVisible: false, text: 'dfasdf'});
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('input');

  function handleRegister() {
    if (email === '') {
      setModal({isVisible: true, text: "Email can't be empty"});
      return;
    } else if (username === '') {
      setModal({isVisible: true, text: "Username can't be empty"});
      return;
    } else if (password === '') {
      setModal({isVisible: true, text: "Password can't be empty"});
      return;
    }

    const body = {
      name: username,
      uid: email,
      password: password,
    };
    CallApi('users', 'POST', body).then(r => {
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
    heading: 'Register',
    inputs: [
      {
        name: 'Email',
        state: email,
        InputHandler: setEmail,
        id: 1,
      },
      {
        name: 'Username',
        state: username,
        InputHandler: setUsername,
        id: 2,
      },
      {
        name: 'Password',
        state: password,
        InputHandler: setPassword,
        id: 3,
      },
    ],
    submits: [
      {
        name: 'Register',
        onSubmit: () => {
          //   Alert.alert('Trying to Register');
          handleRegister();
        },
      },
      {
        name: 'Login',
        onSubmit: () => {
          // Alert.alert('hkd');
          navigation.navigate('Login');
        },
        desc: 'Already Registered? ',
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
