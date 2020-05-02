import  React , { useState} from "react";

import { createStackNavigator } from "@react-navigation/stack";
import firebase from "../API/firebase/firebase";
import api from "../API/API";

import { useDispatch, useSelector } from "react-redux";
import * as action from "../redux/actions/user.action";
import {
  setAvailable,
  setLogin,
  setLoading,
} from "../redux/actions/pagestatus.action";
import LoginScreen from "./LoginScreen";
import LoadingScreen from "./LoadingScreen";
import SelectRoleScreen from "./SelectRoleScreen";
import MainUser from "./MainUser";
import SplashScreen from "./SplashScreen";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export const CheckIfLoggedIn = ({ children }) => {
  const dispatch = useDispatch();
  firebase
    .auth()
    .onAuthStateChanged(async function (user) {
      console.log("AUTH STATE CHANGED CALLED ");
      if (user) {    
          console.log("SignIn..............");
          dispatch(setLoading());
          const user = await api.auth.login();
          dispatch(action.setUser(user));
          dispatch(setAvailable());
      } else {
        console.log("SignOut...");
        dispatch(setLogin());  
      }
      
    })
    .bind(this);

  return <SafeAreaProvider>{children}</SafeAreaProvider>;
};

const AuthStack = () => {
  const { status } = useSelector(({ pageStatusReducer }) => pageStatusReducer);
  const { role } = useSelector(({ userReducer }) => userReducer);
  return (
    <NavigationContainer>
      {status == "loading" && (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
      )}
      {status == "login" && (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
      {status == "available" &&
        (role == null || role == "" || role == undefined) && (
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
          </Stack.Navigator>
        )}
      {status == "available" &&
        role != null &&
        role != "" &&
        role != undefined && (
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="MainUser" component={MainUser} />
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
};

export default AuthStack;
