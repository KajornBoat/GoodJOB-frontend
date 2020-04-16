import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";

import API from "../API/API";
import SettingUser from "./SettingUser";
import BankScreen from "./BankScreen";
import { ValueContext } from "../component/ValueContextProvider";
const Stack = createStackNavigator();

const MenuLabelComponent = ({ title, icon, onPress, subtitle = undefined }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginVertical: 20,
        marginHorizontal: 15,
      }}
      onPress={onPress}
    >
      <View style={{ flex: 1, marginRight: 10 }}>{icon}</View>
      <View
        style={{
          flexDirection: "row",
          flex: 7,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text style={styles.labelFont}>{title}</Text>
        {subtitle}
      </View>
    </TouchableOpacity>
  );
};

const SettingMenu = ({ navigation }) => {
  const { role, setRole } = useContext(ValueContext);
  return (
    <View style={styles.container}>
      <MenuLabelComponent
        title="ข้อมูลส่วนตัว"
        icon={
          <FontAwesome5 name="user" size={24} style={styles.iconColor} solid />
        }
        onPress={() => {
          navigation.navigate("SettingUser");
        }}
      />
      <MenuLabelComponent
        title="บัญชีธนาคาร"
        icon={<Ionicons name="md-card" size={28} style={styles.iconColor} />}
        onPress={() => {
          navigation.navigate("BankScreen");
        }}
      />
      <MenuLabelComponent
        title="สลับบทบาทเป็น"
        icon={<Ionicons name="md-swap" size={28} style={styles.iconColor} />}
        subtitle={
          <Text
            style={{
              color: "#f3595a7f",
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            {role}
          </Text>
        }
        onPress={() => {
          setRole(role == "นายจ้าง" ? "ลูกจ้าง" : "นายจ้าง");
        }}
      />
      <MenuLabelComponent
        title="ออกจากระบบ"
        icon={<Ionicons name="md-exit" size={28} style={styles.iconColor} />}
        onPress={() => API.auth.signOut()}
      />
    </View>
  );
};

export default SettingMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  iconColor: {
    color: "#567091",
  },
  labelFont: {
    color: "#567091",
    fontWeight: "bold",
    fontSize: 16,
  },
});
