import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import { StackActions } from "@react-navigation/native";

import { useSelector } from "react-redux";

import EmployeeTabs from "../component/EmployeeTAB";
import EmployerTabs from "../component/EmployerTAB";

import SettingUser from "./SettingUserScreen";
import BankScreen from "./SettingBankScreen";
import SplashScreen from "./SplashScreen";
import JobDetailApply from "../screens/JobDetailApply";
import JobDetailAccept from "../screens/JobDetailAccept";
import JobDetailInvite from "../screens/JobDetailInvite";
import JobDetailStatus from "../screens/JobDetailStatus";
import JobDetailHistory from "../screens/JobDetailHistory";
import JobDetailEmployerView from "../screens/JobDetailEmployerView";
import CreateJobScreen from "./CreateJobScreen";
import AutoEmployeeInfoScreen from "./AutoEmployeeInfoScreen";
import ManualEmployeeInfoScreen from "./ManualEmployeeInfoScreen";
import ManualApplicantInfoScreen from "./ManualApplicantInfoScreen";
import IndividualEmployeeProfileScreen from "./IndividualEmployeeProfileScreen";
import IndividualInviteEmployeeProfileScreen from "./IndividualInviteEmployeeProfileScreen";
import SelectForInviteScreen from "./SelectForInviteScreen";
import IndividualApplicantProfileScreen from "./IndividualApplicantProfileScreen";
import PickerFilter from "../component/PickerFilter";

import TestScreen from "./TestScreen";

const Stack = createStackNavigator();

const UserStack = () => {
  const { role } = useSelector(({ userReducer }) => userReducer);
  //--- setup employer screen ---//
  const jobEmployerReducer = useSelector(
    ({ jobEmployerReducer }) => jobEmployerReducer
  ).lists;

  const [autoPosition, setAutoPosition] = useState("ตำแหน่ง");
  const [manualPosition, setManualPosition] = useState("ตำแหน่ง");
  const [applicantPosition, setApplicantPosition] = useState("ตำแหน่ง");
  

  const AutoEmployeeInfo = (props) => (
    <AutoEmployeeInfoScreen {...props} filter={autoPosition} />
  );
  const ManualEmployeeInfo = (props) => (
    <ManualEmployeeInfoScreen {...props} filter={manualPosition}/>
  );
  const ManualApplicantInfo = (props) => (
    <ManualApplicantInfoScreen {...props} filter={applicantPosition} />
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: ({ onPress }) => (
          <TouchableOpacity onPress={onPress}>
            <Ionicons
              name="ios-arrow-round-back"
              size={35}
              style={styles.iconColor}
            />
          </TouchableOpacity>
        ),
        headerLeftContainerStyle: { paddingHorizontal: 20 },
        headerTitleStyle: styles.labelFont,
      }}
    >
      { role === "Employer" && (
        <Stack.Screen
          name="EmployerTabs"
          component={EmployerTabs}
          initialParams={{ 
            setAutoPosition: setAutoPosition,
            setManualPosition : setManualPosition,
            setApplicantPosition : setApplicantPosition
           }}
          options={{
            headerShown: false,
          }}
        />
      )}
      { role === "Employee" && (
        <Stack.Screen
          name="EmployeeTabs"
          component={EmployeeTabs}
          options={{
            headerShown: false,
          }}
        />
      )}

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
        name="JobDetailApply"
        component={JobDetailApply}
        options={{
          headerTitle: null,
        }}
      />
      <Stack.Screen
        name="JobDetailAccept"
        component={JobDetailAccept}
        options={{
          headerTitle: null,
        }}
      />
      <Stack.Screen
        name="JobDetailInvite"
        component={JobDetailInvite}
        options={{
          headerTitle: null,
        }}
      />
      <Stack.Screen
        name="JobDetailStatus"
        component={JobDetailStatus}
        options={{
          headerTitle: null,
        }}
      />
      <Stack.Screen
        name="JobDetailHistory"
        component={JobDetailHistory}
        options={{
          headerTitle: null,
        }}
      />
      <Stack.Screen
        name="JobDetailEmployerView"
        component={JobDetailEmployerView}
        options={{
          headerTitle: null,
        }}
      />
      <Stack.Screen
        name="CreateJobScreen"
        component={CreateJobScreen}
        options={{
          headerTitle: null,
        }}
      />
      <Stack.Screen
        name="IndividualEmployeeProfileScreen"
        component={IndividualEmployeeProfileScreen}
        initialParams={{ itemId: 0 }}
        options={{
          headerTitle: null,
        }}
      />
      <Stack.Screen
        name="IndividualInviteEmployeeProfileScreen"
        component={IndividualInviteEmployeeProfileScreen}
        initialParams={{ itemId: 0 }}
        options={{
          headerTitle: null,
        }}
      />
      <Stack.Screen
        name="SelectForInviteScreen"
        component={SelectForInviteScreen}
        options={{
          headerTitle: null,
        }}
      />
      <Stack.Screen
        name="IndividualApplicantProfileScreen"
        component={IndividualApplicantProfileScreen}
        options={{
          headerTitle: null,
        }}
      />
      <Stack.Screen
        name="AutoEmployeeInfoScreen"
        component={AutoEmployeeInfo}
        options={({ route }) => ({
          headerRight: () => (
            <PickerFilter
              title="ตำแหน่ง"
              value={autoPosition}
              setOnValueChange={setAutoPosition}
              items={
                route.params.job.tags 
              }
            />
          ),
          headerTitle: null,
        })}
      />
      <Stack.Screen
        name="ManualEmployeeInfoScreen"
        component={ManualEmployeeInfo}
        options={({ route }) => ({
          headerRight: () => (
            <PickerFilter
              title="ตำแหน่ง"
              value={manualPosition}
              setOnValueChange={setManualPosition}
              items={
                route.params.job.tags 
              }
            />
          ),
          headerTitle: null,
        })}
      />
      <Stack.Screen
        name="ManualApplicantInfoScreen"
        component={ManualApplicantInfo}
        options={({ route }) => ({
          headerRight: () => (
            <PickerFilter
              title="ตำแหน่ง"
              value={applicantPosition}
              setOnValueChange={setApplicantPosition}
              items={
                route.params.job.tags 
              }
            />
          ),
          headerTitle: null,
        })}
      />
{/*.......................................... Test ..........................................*/}
      <Stack.Screen
        name="TestScreen"
        component={TestScreen}
        options={{
          headerShown: false,
        }}
      />
{/*.......................................... test ..........................................*/}
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
