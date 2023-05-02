import {useFocusEffect} from '@react-navigation/native';
import {View, Text, Pressable, Alert, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import CallApi, {getToken} from '../Utility/network';
import styles from './Home_styles';
import CrudModal from './CrudModal';
import CustomInput from './CustomInput';

function Home({navigation}) {
  const [status, setStatus] = useState('Loading'); //"Loading/Loaded/(Edit/Add/Delete)"
  const [id, setID] = useState(-1);
  const [crudInput, setCrudInput] = useState('');
  const TOKEN = useRef('');
  const [items, setItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // CallApi('projects', 'GET', null, token);
      getToken().then(token => {
        if (!token) {
          navigation.navigate('Login');
          return;
        }
        TOKEN.current = token;
        // Alert.alert(`first token: ${TOKEN}`);
        console.log('token in Home.js :', token);
        // CallApi('projects', 'GET', null, token).then(r => {
        //   // Alert.alert(JSON.stringify(r));
        //   console.log(r);
        //   setItems(r);
        //   setStatus('Loaded');
        // });
        handleLoad();
      });
    }, []),
  );

  console.log('crud input :', crudInput);
  console.log('status :', status);

  function handleLoad() {
    setStatus('Loading');
    CallApi('projects', 'GET', null, TOKEN.current).then(r => {
      // Alert.alert(JSON.stringify(r));
      if (r.message) {
        // Alert.alert(r.message);
        navigation.navigate('Login');
        return;
      }
      setItems(r);
      setStatus('Loaded');
    });
  }
  function handleAdd() {
    console.log(crudInput, 'crud input2', this);
    // Alert.alert(`adding ${crudInput}  this;`);
    const body = {
      name: crudInput,
    };
    setStatus('Loading');
    CallApi('projects', 'POST', body, TOKEN.current).then(r => {
      // Alert.alert(JSON.stringify(r));
      if (r.message) {
        // Alert.alert(r.message);
        navigation.navigate('Login');
        return;
      }
      setCrudInput('');
      setItems([...items, r]);
      setStatus('Loaded');
    });
  }

  function handleDelete(id) {
    // Alert.alert('deleting :', id);
    setStatus('Loading');
    CallApi('projects/' + id, 'DELETE', null, TOKEN.current).then(r => {
      if (r.message) {
        // Alert.alert(r.message);
        navigation.navigate('Login');
        return;
      }
      setItems(
        items.filter(item => {
          return item._id !== id;
        }),
      );
      setStatus('Loaded');
    });
  }

  function handleEdit(id) {
    // Alert.alert('editing :', id);
    const body = {
      name: crudInput,
    };
    setStatus('Loading');
    CallApi('projects/' + id, 'PUT', body, TOKEN.current).then(r => {
      if (r.message) {
        // Alert.alert(r.message);
        navigation.navigate('Login');
        return;
      }
      // Alert.alert('edited' + JSON.stringify(r.name));
      setCrudInput('');
      setItems(
        items.map(item => {
          if (item._id === id) {
            return r;
          } else {
            return item;
          }
        }),
      );
      setStatus('Loaded');
    });
  }

  let CRUD_modal = null;

  if (status === 'Loading') {
    return (
      <ActivityIndicator
        style={[styles.loader]}
        size={'large'}
        animating={true}
      />
    );
  } else if (status === 'Edit' || status === 'Add' || status === 'Delete') {
    console.log('we are ', status, 'ing');
    CRUD_modal = (
      <CrudModal onClose={() => setStatus('Loaded')}>
        <View>
          {status === 'Delete' ? (
            <Text>{`Delete ${crudInput}?`}</Text>
          ) : (
            <CustomInput
              state={crudInput}
              name="Value"
              setCrudInput={setCrudInput}
            />
          )}
          <View style={styles.modal_buttons}>
            <Pressable
              style={styles.close_button}
              onPress={() => {
                if (status === 'Add') {
                  handleAdd();
                } else if (status === 'Edit') {
                  handleEdit(id);
                } else if (status === 'Delete') {
                  handleDelete(id);
                }
              }}>
              <Text>{status}</Text>
            </Pressable>
            <Pressable
              style={styles.close_button}
              onPress={() => {
                setStatus('Loaded');
              }}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </CrudModal>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.heading}>
        <Text style={styles.heading_text}>Home</Text>
        <Pressable onPress={handleLoad}>
          <Text>Reload</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        renderItem={({item}) => {
          return (
            <CrudItem
              item={item}
              onEdit={() => {
                setStatus('Edit');
                setID(item._id);
                setCrudInput(item.name);
              }}
              onDelete={() => {
                setStatus('Delete');
                setID(item._id);
                setCrudInput(item.name);
              }}
            />
          );
        }}
        keyExtractor={item => item._id}
      />
      {CRUD_modal}
      <Addbtn
        onAdd={() => {
          setStatus('Add');
          setCrudInput('');
        }}
      />
    </View>
  );
}

function Addbtn({onAdd = () => {}}) {
  return (
    <Pressable
      style={styles.addbtn}
      onPress={() => {
        // Alert.alert('you press add btn');
        onAdd();
      }}>
      <Text>Add</Text>
    </Pressable>
  );
}
function Editbtn({onEdit, children}) {
  return (
    <Pressable
      style={styles.Itembtn}
      onPress={() => {
        // Alert.alert('you press edit btn');
        onEdit();
      }}>
      {children}
    </Pressable>
  );
}
function Deletebtn({children, onDelete}) {
  return (
    <Pressable
      style={styles.Itembtn}
      onPress={() => {
        // Alert.alert('you press delete btn');
        onDelete();
      }}>
      {children}
    </Pressable>
  );
}
function CrudItem({item, onEdit, onDelete}) {
  return (
    <View style={styles.crudItem}>
      <Text style={styles.ItemContent}>{item.name}</Text>
      <View style={styles.Itembtns}>
        <Editbtn onEdit={onEdit}>
          <Text>Edit</Text>
        </Editbtn>
        <Deletebtn onDelete={onDelete}>
          <Text>Del</Text>
        </Deletebtn>
      </View>
    </View>
  );
}

export default Home;
