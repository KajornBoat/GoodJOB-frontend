import React, { useContext, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import SettingMenu from "./SettingMenu";
import TestScreen from "./TestScreen";

import SettingUser from "./SettingUser";
import BankScreen from "./BankScreen";

import BlankScreen from "./BankScreen";
import TempScreen from "./TempScreen";
import EmployeeListJob from "./EmployeeListJob";
import JobDetail from "../component/JobDetail";
import CreateJobScreen from "./CreateJobScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const JobEmployeeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="งานที่ได้รับ"
      tabBarOptions={{
        activeTintColor: "#567091",
        inactiveTintColor: "#bac6d39f",
      }}
    >
      <Tab.Screen
        name="งานที่ได้รับ"
        component={BlankScreen}
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/check-circle.png")
                    : require("../assets/check-circle-outline.png")
                }
                style={{ width: size * 1.25, height: size * 1.25 }}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="งานที่ถูกเชิญ"
        component={TempScreen}
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/user-check.png")
                    : require("../assets/user-check-outline.png")
                }
                style={{ width: size * 1.25, height: size * 1.25 }}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="สถานะงาน"
        component={BlankScreen}
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/clipboard-text.png")
                    : require("../assets/clipboard-text-outline.png")
                }
                style={{ width: size * 1.25, height: size * 1.25 }}
                resizeMode="contain"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const EmployeeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="หน้าหลัก"
      tabBarOptions={{
        activeTintColor: "#567091",
        inactiveTintColor: "#bac6d39f",
      }}
    >
      <Tab.Screen
        name="หน้าหลัก"
        component={TestScreen}
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/home.png")
                    : require("../assets/home-outline.png")
                }
                style={{ width: size * 1.25, height: size * 1.25 }}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="งานที่มีส่วนร่วม"
        component={JobEmployeeTab}
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/job.png")
                    : require("../assets/job-outline.png")
                }
                style={{ width: size * 1.25, height: size * 1.25 }}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ประสบการณ์"
        component={EmployeeListJob}
        initialParams={{ routeName: "JobDetail" }}
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/history.png")
                    : require("../assets/history-outline.png")
                }
                style={{ width: size * 1.25, height: size * 1.25 }}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ตั้งค่า"
        component={SettingMenu}
        options={{
          tabBarIcon: ({ focused, size }) => {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/setting.png")
                    : require("../assets/setting-outline.png")
                }
                style={{ width: size * 1.25, height: size * 1.25 }}
                resizeMode="contain"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const UserStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="EmployeeTabs"
      screenOptions={{
        headerLeft: ({ onPress }) => (
          <TouchableOpacity onPress={onPress}>
            <Ionicons
              name="ios-arrow-round-back"
              size={32}
              style={styles.iconColor}
            />
          </TouchableOpacity>
        ),
        headerLeftContainerStyle: { paddingHorizontal: 20 },
        headerTitleStyle: styles.labelFont,
      }}
    >
      <Stack.Screen
        name="EmployeeTabs"
        component={EmployeeTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="JobEmployeeTab"
        component={JobEmployeeTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingUser"
        component={SettingUser}
        options={{
          headerTitle: "ข้อมูลส่วนตัว",
        }}
      />
      <Stack.Screen
        name="BankScreen"
        component={BankScreen}
        options={{
          headerTitle: "บัญชีธนาคาร",
        }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetail}
        options={{
          headerTitle: "JobDetail",
        }}
      />
      <Stack.Screen
        name="CreateJobScreen"
        component={CreateJobScreen}
        options={{
          headerTitle: null,
        }}
      />
    </Stack.Navigator>
  );
};

const MainUser = () => {
  return <UserStack />;
};

export default MainUser;

const styles = StyleSheet.create({
  iconColor: {
    color: "#567091",
  },
  labelFont: {
    color: "#567091",
    fontWeight: "bold",
    fontSize: 16,
  },
});
