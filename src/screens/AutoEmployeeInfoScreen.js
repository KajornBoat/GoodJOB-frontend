import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal,ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import EmployeeProfile from "../component/EmployeeProfile";



export default AutoEmployeeInfoScreen = ({ navigation, route, filter }) => {
  const employee = useSelector(
    ({ jobEmployerReducer }) => jobEmployerReducer
  ).lists.filter((value) => value._id == route.params.itemId)[0].acceptEmployee;
  if(employee){
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: "white" }}>
          <View style={styles.container}>
            {
              employee.filter((value) =>
                filter == "ตำแหน่ง"
                  ? value.position != ""
                  : value.position == filter
              )
              .map((value, index) => (
                <View key={index} style={{ width: "50%" }}>
                  <EmployeeProfile
                    key={index}
                    image={value.user.photoURL}
                    firstName={value.user.firstname}
                    lastName={value.user.lastname}
                    onPress={() => {
                      navigation.navigate("IndividualEmployeeProfileScreen", {
                        employeeInfo : value,
                        jobID : route.params.itemId,
                        nextRoute : "AutoEmployeeInfoScreen"
                      });
                    }}
                  />
                </View>
              ))
            }
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
    marginTop: 15,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
