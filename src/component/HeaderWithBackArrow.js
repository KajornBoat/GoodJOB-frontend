import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const HeaderWithBackArrow = ({ onPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={{ marginLeft: 20 }} onPress={onPress}>
        <Ionicons name="ios-arrow-round-back" size={32} color={"#526f91"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: 54, //64
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderColor: "#c4c4c4",
    backgroundColor: "white",
  },
});

export default HeaderWithBackArrow;
