import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flex_con: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    margin: 20,
  },
  container: {
    padding: 20,
    flex: 1,
  },
  box: {
    // flex: 1,
  },
  input: {
    padding: 10,
    borderWidth: 2,
    marginBottom: 20,
    fontSize: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  Login_button: {
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 30,
  },
  Login_text: {
    textAlign: 'center',
    fontSize: 25,
  },
  SignUp_con: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  SignUp_text: {
    color: 'red',
  },
  close_button: {
    backgroundColor: 'skyblue',
    width: '20%',
    padding: '4%',
    alignSelf: 'flex-end',
  },
  modal_con: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF90',
    justifyContent: 'center',
    alignContent: 'center',
  },
  modal_content: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 2,
    borderRadius: 3,
    opacity: 1,
  },
  modal_text: {
    marginVertical: 20,
  },
  text: {
    fontSize: 25,
  },
  loader: {
    position: 'absolute',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
});
export default styles;
