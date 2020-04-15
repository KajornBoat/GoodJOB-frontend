import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SettingMenu from "./SettingMenu";
import SettingScreen from "./SettingUser";
import TestScreen from "./TestScreen";

const Tab = createBottomTabNavigator();

const TabsEmploye = () => {
  return (
    <Tab.Navigator>

      <Tab.Screen name="TestScreen" component={TestScreen} />
      <Tab.Screen name="SettingMenu" component={SettingMenu} />

    </Tab.Navigator>
  );
}

const MainUser = () => {
  return <TabsEmploye />;
};

export default MainUser;


