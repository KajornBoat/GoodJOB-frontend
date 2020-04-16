import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, TouchableOpacity, Button, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import JobDetail from "../component/JobDetail";
import EmployeeListJob from "./EmployeeListJob";

const Page = createStackNavigator();

const MultiSelectPicker = () => {
  return (
    <TouchableOpacity style={{ flexDirection: "row", margin: 20 }}>
      <Text style={{ borderBottomWidth: 0.5 }}>A</Text>
    </TouchableOpacity>
  );
};

const TempScreen = () => {
  return (
    <Page.Navigator initialRouteName="root">
      <Page.Screen
        name="root"
        component={EmployeeListJob}
        options={{
          headerRight: MultiSelectPicker,
        }}
      />
    </Page.Navigator>
  );
};

export default TempScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  iconColor: {
    color: "#567091",
  },
  labelFont: {
    color: "#567091",
    fontWeight: "bold",
    fontSize: 16,
  },
});
