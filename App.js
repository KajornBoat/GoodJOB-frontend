import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import LoginScreen from "./src/screens/LoginScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import SelectRoleScreen from "./src/screens/SelectRoleScreen";
import MainUser from "./src/screens/MainUser";
import { ValueContextProvider } from "./src/component/ValueContextProvider";



const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Loading" headerMode="none">

      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
      <Stack.Screen name="MainUser" component={MainUser} />
      
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ValueContextProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </ValueContextProvider>
  );
}
