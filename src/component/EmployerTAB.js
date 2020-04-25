import React, { useContext, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import SettingMenu from "../screens/SettingMenuScreen";
import TestScreen from "../screens/TestScreen";



const EmployerTabs = () => {
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