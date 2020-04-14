import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import SettingMenu from "./SettingMenu";
import TestScreen from "./TestScreen";
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TestScreen" component={TestScreen} />
      <Tab.Screen name="SettingMenu" component={SettingMenu} />
    </Tab.Navigator>
  );
}

const MainUser = (props) => {
  return <MyTabs />;
};

export default MainUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
