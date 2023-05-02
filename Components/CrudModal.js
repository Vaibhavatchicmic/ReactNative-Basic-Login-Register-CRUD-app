import {Modal, View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import styles from './Login_styles';
export default function CrudModal({onClose, children}) {
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles.modal_con}>
        <View style={styles.modal_content}>
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  btns: {},
});
