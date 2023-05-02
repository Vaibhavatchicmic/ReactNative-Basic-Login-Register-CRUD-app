import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  heading: {
    backgroundColor: 'skyblue',
    color: 'white',
    // textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 30,
  },
  addbtn: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 30,
  },
  crudItem: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    justifyContent: 'space-between',
    borderWidth: 2,
  },
  Itembtns: {
    flexDirection: 'row',
  },
  Itembtn: {
    marginLeft: 10,
  },
  ItemContent: {},
  close_button: {
    backgroundColor: 'skyblue',
    width: '20%',
    padding: '4%',
    alignSelf: 'flex-end',
  },

  modal_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loader: {
    position: 'absolute',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
});
export default styles;
