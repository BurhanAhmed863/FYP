// CustomPopup.js
import React from 'react';
import { Modal, View, Text, ActivityIndicator, Image } from 'react-native';
import PopupStyle from '../styles/PopupStyle'; // Create a separate style file for the popup

const CustomPopup = ({ visible, message }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={PopupStyle.modalContainer}>
        <View style={PopupStyle.modalContent}>
          {/* <Image source={require('../assets/icons/popup_icon.png')} style={PopupStyle.icon} /> */}
          <Text style={PopupStyle.modalText}>{message}</Text>
          <ActivityIndicator size="large" color="#EB001B" />
        </View>
      </View>
    </Modal>
  );
};

export default CustomPopup;
