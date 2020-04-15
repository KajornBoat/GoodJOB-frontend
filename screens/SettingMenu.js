import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import API from "../API/API";
import SettingScreen from "./SettingScreen";
import BankScreen from "./BankScreen";
import { ValueContext } from "../component/ValueContextProvider";

const HeaderBack = ({ onClickBackArrow, title }) => {
  return (
    <View
      style={{
        ...styles.header,
        alignItems: "flex-start",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity onPress={onClickBackArrow}>
        <Ionicons
          name="ios-arrow-round-back"
          size={32}
          style={styles.iconColor}
        />
      </TouchableOpacity>
      <Text style={[styles.labelFont, { marginLeft: 30, marginVertical: 3 }]}>
        {title}
      </Text>
    </View>
  );
};

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

const SettingMenu = () => {
  const { role, setRole } = useContext(ValueContext);
  const [page, setPage] = useState();
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <View style={styles.container}>
        <MenuLabelComponent
          title="ข้อมูลส่วนตัว"
          icon={
            <FontAwesome5
              name="user"
              size={24}
              style={styles.iconColor}
              solid
            />
          }
          onPress={() => {
            setVisible(true);
            setPage("ข้อมูลส่วนตัว");
          }}
        />
        <MenuLabelComponent
          title="บัญชีธนาคาร"
          icon={<Ionicons name="md-card" size={28} style={styles.iconColor} />}
          onPress={() => {
            setVisible(true);
            setPage("บัญชีธนาคาร");
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
        <Modal
          visible={visible}
          onRequestClose={() => setVisible(false)}
          transparent
          animationType="fade"
        >
          <HeaderBack onClickBackArrow={() => setVisible(false)} title={page} />
          <View style={{ flex: 1, backgroundColor: "#eee" }}>
            {page == "ข้อมูลส่วนตัว" ? <SettingScreen /> : <BankScreen />}
          </View>
        </Modal>
      </View>
      {visible && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            backgroundColor: "white",
          }}
        />
      )}
    </View>
  );
};

export default SettingMenu;

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight + 20,
    marginHorizontal: 20,
  },
  iconColor: {
    color: "#567091",
  },
  labelFont: {
    color: "#567091",
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    height: 40,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "flex-end",
    elevation: 2,
  },
});
