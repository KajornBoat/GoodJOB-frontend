import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import EmployeeAvatar from "./EmployeeAvatar";

const EmployeeProfile = ({ image, firstName, lastName, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.employeeComponentView}>
      <EmployeeAvatar uri={image} size={100} />
      <Text>{firstName + " " + lastName}</Text>
    </TouchableOpacity>
  );
};

export default EmployeeProfile;

const styles = StyleSheet.create({
  employeeComponentView: {
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
