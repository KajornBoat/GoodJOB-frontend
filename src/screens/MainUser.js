import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingMenu from "./SettingMenu";
import SettingScreen from "./SettingUser";
import TestScreen from "./TestScreen";
import { ValueContext } from "../component/ValueContextProvider";
import { Image, View } from "react-native";
const Tab = createBottomTabNavigator();

const BlankScreen = () => <View></View>;

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
        component={BlankScreen}
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
        component={BlankScreen}
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

const MainUser = ({ navigation }) => {
  const { role } = useContext(ValueContext);
  return role == "นายจ้าง" ? <EmployerTabs /> : <EmployeeTabs />;
};

export default MainUser;
