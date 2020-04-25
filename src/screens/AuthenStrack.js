import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "../API/firebase/firebase";
import api from "../API/API";

import {useDispatch} from "react-redux"
import * as action from "../redux/actions/user.action"

import LoginScreen from "./LoginScreen";
import LoadingScreen from "./LoadingScreen";
import SelectRoleScreen from "./SelectRoleScreen";
import MainUser from "./MainUser";
import SplashScreen from "./SplashScreen"

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";


const Stack = createStackNavigator();

const checkIfLoggedIn = ({navigation}) => {

    const dipatch = useDispatch();

    firebase.auth().onAuthStateChanged(
        async function (user) {
          console.log("AUTH STATE CHANGED CALLED ");
          if (user) {

            console.log("SignIn")
            const user = await api.auth.login();
            console.log(user.current_role)
            dipatch(action.setUser(user));

            if(user.current_role == null )
                navigation.navigate("SelectRole");
            else
                navigation.navigate("MainUser");
          } 
          else {
            console.log("SignOut")
            navigation.navigate("Login");
          }
        }.bind(this)
    );
    return(
        <SplashScreen />
    )
};

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="checkIfLoggedIn" headerMode="none">

            <Stack.Screen name="checkIfLoggedIn" component={checkIfLoggedIn} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
            <Stack.Screen name="MainUser" component={MainUser} />
          
        </Stack.Navigator>
      );
}

export default AuthStack;