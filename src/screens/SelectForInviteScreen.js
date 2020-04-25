import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";

import EmployeeProfile from "../component/EmployeeProfile";

export default function SelectForInviteScreen({ navigation }) {
  const employee = require("../assets/employeeInfo").employees;

  return (
    <View>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          {employee.map((value, index) => (
            <View key={index} style={{ width: "50%" }}>
              <EmployeeProfile
                key={index}
                image={value.image}
                firstName={value.firstName}
                lastName={value.lastName}
                onPress={() => {
                  console.log("selected");
                  navigation.navigate("IndividualInviteEmployeeProfileScreen", {
                    itemId: value.id,
                  });
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
});
