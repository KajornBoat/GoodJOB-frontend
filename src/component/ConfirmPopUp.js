import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import PopUpScreen from "./PopUpScreen";

const ConfirmPopUp = ({
  visible,
  setVisible,
  textPopup,
  navigation,
  callback,
}) => {
  return (
    <PopUpScreen visible={visible} onRequestClose={() => setVisible(false)}>
      <View style={styles.popUpStyle}>
        <Text style={{ marginTop: 10, lineHeight: 20 }}>{textPopup}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.confirmButton}
            activeOpacity={0.4}
            onPress={() => {
              setVisible(false);
              callback();
              navigation.goBack();
            }}
          >
            <Text style={{ color: "white" }}>ยืนยัน</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.4}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Text>ยกเลิก</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PopUpScreen>
  );
};

const styles = StyleSheet.create({
  popUpStyle: {
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: "#0bb203",
    width: 80,
    height: 35,
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  cancelButton: {
    backgroundColor: "white",
    width: 80,
    height: 35,
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default ConfirmPopUp;
