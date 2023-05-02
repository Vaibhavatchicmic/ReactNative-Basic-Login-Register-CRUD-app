import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './Components/Login';
import {Register} from './Components/Register';
import Home from './Components/Home';

const Stack = createNativeStackNavigator();

function App() {
  // const [isLogin, setIsLogin] = useState(false);
  // return <>{!isLogin && <Login setIsLogin={setIsLogin} />}</>;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
