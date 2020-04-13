import * as React from "react";
import { Modal, View, Text, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import SettingScreen from "./screens/SettingScreen";
import MainUser from './screens/MainUser'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Loading" headerMode="none">
      <Stack.Screen name="Loading" component={LoadingScreen}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="MainUser" component={MainUser}/>
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider> 
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaProvider>
    
  );
}
