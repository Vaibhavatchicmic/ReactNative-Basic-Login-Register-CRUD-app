import React, {useState} from 'react';
import {Alert} from 'react-native';

import Form from './Form';

export function Register({setIsLogin}) {
  const [modal, setModal] = useState({isVisible: false, text: 'dfasdf'});

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameInput(text) {
    setUsername(text);
  }
  function handlePasswordInput(text) {
    setPassword(text);
  }
  function handleEmailInput(text) {
    setEmail(text);
  }

  function handleRegister() {
    if (email === '') {
      setModal({isVisible: true, text: "Email can't be empty"});
    }
    if (username === '') {
      setModal({isVisible: true, text: "Username can't be empty"});
      return;
    }
    if (password === '') {
      setModal({isVisible: true, text: "Password can't be empty"});
    }
  }

  const form_data = {
    heading: 'Register',
    inputs: [
      {
        name: 'Email',
        state: email,
        InputHandler: handleEmailInput,
        id: 1,
      },
      {
        name: 'Username',
        state: username,
        InputHandler: handleUsernameInput,
        id: 2,
      },
      {
        name: 'Password',
        state: password,
        InputHandler: handlePasswordInput,
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
          Alert.alert('hkd');
        },
        desc: 'Already Registered? ',
      },
    ],
  };

  return <Form form_data={form_data} modal={modal} setModal={setModal} />;
}
