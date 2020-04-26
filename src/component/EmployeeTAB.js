import React, { useContext, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, BackHandler } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SettingMenu from "../screens/SettingMenuScreen";
import TestScreen from "../screens/TestScreen";

const Tab = createBottomTabNavigator();

import EmployeeListJob from "../screens/EmployeeListJob";
import EmployeeListJobWithFilter from "../screens/EmployeeListJobWithFilter";
import { useSelector } from "react-redux";

const JobEmployeeTab = () => {
  const jobAcceptReducer = useSelector(
    ({ jobAcceptReducer }) => jobAcceptReducer
  );
  const jobInviteReducer = useSelector(
    ({ jobInviteReducer }) => jobInviteReducer
  );
  const jobStatusReducer = useSelector(
    ({ jobStatusReducer }) => jobStatusReducer
  );
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
        component={EmployeeListJob}
        initialParams={{ routeName: "JobDetailAccept", jobs: jobAcceptReducer }}
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
        component={EmployeeListJob}
        initialParams={{ routeName: "JobDetailInvite", jobs: jobInviteReducer }}
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
        component={EmployeeListJob}
        initialParams={{ routeName: "JobDetailStatus", jobs: jobStatusReducer }}
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
  const jobApplyReducer = useSelector(({ jobApplyReducer }) => jobApplyReducer);
  const jobHistoryReducer = useSelector(
    ({ jobHistoryReducer }) => jobHistoryReducer
  );
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
        component={EmployeeListJobWithFilter}
        initialParams={{ routeName: "JobDetailApply", jobs: jobApplyReducer }}
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
        component={EmployeeListJobWithFilter}
        initialParams={{
          routeName: "JobDetailHistory",
          jobs: jobHistoryReducer,
        }}
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

export default EmployeeTabs;
