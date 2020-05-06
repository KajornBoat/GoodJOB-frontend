import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal ,ActivityIndicator} from "react-native";

import EmployeeProfile from "../component/EmployeeProfile";
import { useSelector } from "react-redux";

export default function SelectForInviteScreen({ navigation, route }) {
  const job = useSelector(
    ({ jobEmployerReducer }) => jobEmployerReducer
  ).lists.filter((value) => value._id == route.params.itemId)[0];
  const employee = job.selectEmployee;
  if(employee){
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView style={{ backgroundColor: "white" }}>
          <View style={styles.container}>
            {employee.map((value, index) => (
              <View key={index} style={{ width: "50%" }}>
                <EmployeeProfile
                  key={index}
                  image={value.user.photoURL}
                  firstName={value.user.firstname}
                  lastName={value.user.lastname}
                  onPress={() => {
                    navigation.navigate(route.params.nextRouts, {
                      jobID: route.params.itemId,
                      employeeInfo : value,
                      position : route.params.filter
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
  else{
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
