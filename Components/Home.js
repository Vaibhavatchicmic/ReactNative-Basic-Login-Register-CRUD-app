import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

const Home = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {}, []);
  return (
    <View>
      <Text>Home</Text>
      <FlatList data={item} renderItem={()=>{
        
      }}/>
    </View>
  );
};

export default Home;
