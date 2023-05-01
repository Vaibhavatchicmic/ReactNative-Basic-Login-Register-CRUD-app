import React, {useState} from 'react';
import {Alert} from 'react-native';
import CallApi, {setToken} from '../Utility/network';

import Form from './Form';

export function Register({setIsLogin, navigation}) {
  const [modal, setModal] = useState({isVisible: false, text: 'dfasdf'});
  // const [email, setEmail] = useState('');
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [inputData, setInputData] = useState({
    Email: '',
    Password: '',
    Username: '',
  });
  const [status, setStatus] = useState('input');

  function handleInputChange(value, name) {
    // console.log(inputData);

    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  function handleRegister() {
    if (inputData.Email === '') {
      setModal({isVisible: true, text: "Email can't be empty"});
      return;
    } else if (inputData.Username === '') {
      setModal({isVisible: true, text: "Username can't be empty"});
      return;
    } else if (inputData.Password === '') {
      setModal({isVisible: true, text: "Password can't be empty"});
      return;
    }

    const body = {
      name: inputData.Username,
      uid: inputData.Email,
      password: inputData.Password,
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
        state: inputData.Email,
        InputHandler: handleInputChange,
        id: 1,
      },
      {
        name: 'Username',
        state: inputData.Username,
        InputHandler: handleInputChange,
        id: 2,
      },
      {
        name: 'Password',
        state: inputData.Password,
        InputHandler: handleInputChange,
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
