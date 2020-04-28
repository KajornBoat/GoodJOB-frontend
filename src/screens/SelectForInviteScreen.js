import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";

import EmployeeProfile from "../component/EmployeeProfile";
import { useSelector } from "react-redux";

export default function SelectForInviteScreen({ navigation, route }) {
  const employee = useSelector(({ jobEmployerReducer }) => jobEmployerReducer)
    .data.filter((value) => value.id == route.params.itemId)[0]
    .inviteEmployee.filter((value) => value.position == route.params.filter);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
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
                    parentItemId: route.params.itemId,
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
