import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import SettingMenu from "../screens/SettingMenuScreen";
import EmployerListJob from "../screens/EmployerListJob";
import { useDispatch } from "react-redux";
import api from "../API/API";
import { setJobEmployer } from "../redux/actions/jobemployer.action";
import TestScreen from "../screens/TestScreen";

const EmployerTabs = () => {
  const dispatch = useDispatch();
  api.job.getJobEmployer().then(job => {
    dispatch(setJobEmployer(job));
    console.log("LoadJobEmployer")
  });
  return (
    <Tab.Navigator
      initialRouteName="หน้าหลัก"
      tabBarOptions={{
        activeTintColor: "#567091",
        inactiveTintColor: "#bac6d39f",
      }}
      backBehavior = "none"
    >
      <Tab.Screen
        name="หน้าหลัก"
        component={EmployerListJob}
        initialParams={{ routeName: "JobDetailApply", jobs: "jobApplyReducer" }}
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

export default EmployerTabs;
