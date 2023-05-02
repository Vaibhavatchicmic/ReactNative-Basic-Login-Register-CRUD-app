import React, {useState} from 'react';

import CallApi, {setToken} from '../Utility/network';

import Form from './Form';

export function Login({setIsLogin, navigation}) {
  const [modal, setModal] = useState({isVisible: false, text: 'dfasdf'});
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [inputData, setInputData] = useState({Email: '', Password: ''});
  const [status, setStatus] = useState('Input');

  function handleInputChange(value, name) {
    // console.log(inputData);

    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  function handleLogin() {
    if (inputData.Email === '') {
      setModal({isVisible: true, text: "Email can't be empty"});
      return;
    }
    if (inputData.Password === '') {
      setModal({isVisible: true, text: "Password can't be empty"});
      return;
    }

    const body = {
      uid: inputData.Email,
      password: inputData.Password,
    };

    CallApi('users/login', 'POST', body).then(async r => {
      if (r.message) {
        setModal({isVisible: true, text: r.message});
        setStatus('Input');
        return;
      } else {
        setStatus('Loaded');
        // Alert.alert(r.token);
        setToken(r.token);
        // const token = await getToken();
        // console.log('token in login.js :', token);
        // getToken().then(res => console.log(res));
      }
    });
    setStatus('Loading');
  }

  const form_data = {
    heading: 'Login',
    inputs: [
      {
        name: 'Email',
        state: inputData.Email,
        InputHandler: handleInputChange,
        id: 1,
      },
      {
        name: 'Password',
        state: inputData.Password,
        InputHandler: handleInputChange,
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
