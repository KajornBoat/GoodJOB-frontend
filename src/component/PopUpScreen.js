import React from "react";
import { View, Modal } from "react-native";

const PopUpScreen = ({ children, visible, onRequestClose, transparent }) => {
  return (
    <Modal
      transparent
      onRequestClose={onRequestClose}
      visible={visible}
      animationType="fade"
    >
      <View
        style={{
          backgroundColor: "#00000099",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginHorizontal: 25,
            backgroundColor: transparent ? "transparent" : "white",
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default PopUpScreen;
