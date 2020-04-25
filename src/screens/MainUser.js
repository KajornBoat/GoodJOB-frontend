import React  from "react";
import { StyleSheet, TouchableOpacity, Text} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createStackNavigator  } from "@react-navigation/stack";
import { StackActions ,CommonActions  } from '@react-navigation/native';

import {useSelector} from "react-redux"

import EmployeeTabs from "../component/EmployeeTAB"
import EmployerTabs from "../component/EmployerTAB"

import SettingUser from "./SettingUserScreen";
import BankScreen from "./SettingBankScreen";
import SplashScreen from "./SplashScreen"

const Stack = createStackNavigator();

const resetStack = (navigation) => {
  navigation
    .dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'EmployeeTabs'
        }),
      ],
    }))
 }


const SelectRole = ({ navigation }) => {
  
  const userReducer = useSelector(({userReducer}) => userReducer);

  if(userReducer.role === "Employee"){
    navigation.navigate("EmployeeTabs");
  }
  else if(userReducer.role === "Employer"){
    navigation.navigate("EmployerTabs");
  }
  return(
    <SplashScreen />
  )
  
};

const UserStack = () => {
  return(
    <Stack.Navigator 
      initialRouteName="SelectRole"
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
        name="SelectRole" 
        component={SelectRole} 
        options={{
          headerShown: false,
        }}
      /> 

      <Stack.Screen 
        name="EmployeeTabs" 
        component={EmployeeTabs} 
        options={{
          headerShown: false,
        }}
      /> 
      <Stack.Screen 
        name="EmployerTabs" 
        component={EmployerTabs} 
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

    </Stack.Navigator>
  )
}


const MainUser = () => {
  return ( 
    <UserStack />
  )
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