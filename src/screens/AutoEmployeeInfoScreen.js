import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";

import EmployeeProfile from "../component/EmployeeProfile";

export default function AutoEmployeeInfoScreen({ navigation, filter }) {
  const employee = require("../assets/employeeInfo").employees;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          {employee
            .filter((value) =>
              filter == "ตำแหน่ง"
                ? value.position != ""
                : value.position == filter
            )
            .map((value, index) => (
              <View key={index} style={{ width: "50%" }}>
                <EmployeeProfile
                  key={index}
                  image={value.image}
                  firstName={value.firstName}
                  lastName={value.lastName}
                  onPress={() => {
                    console.log("selected");
                    navigation.navigate("IndividualEmployeeProfileScreen", {
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
    marginTop: 15,
  },
});
