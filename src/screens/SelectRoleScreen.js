import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";

import { ValueContext } from "../component/ValueContextProvider";

const SelectRoleScreen = ({ navigation }) => {
  const { role, setRole } = useContext(ValueContext);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.container,
          {
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: Constants.statusBarHeight,
          },
        ]}
      >
        <Image
          source={require("../assets/Logo.png")}
          style={{
            width: "50%",
            height: "50%",
          }}
          resizeMode="center"
        />
        <Text style={{ fontWeight: "bold", color: "#567091", fontSize: 24 }}>
          เลือกบทบาท
        </Text>
      </View>
      <View
        style={[
          styles.container,
          {
            justifyContent: "flex-start",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ color: "red" }}>*สามารถเปลี่ยนแปลงทีหลังได้</Text>
        <View
          style={{
            height: "40%",
            flexDirection: "row",
            width: "100%",
            marginTop: "5%",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.selectRole}
            onPress={() => {
              setRole("นายจ้าง");
            }}
          >
            {role == "นายจ้าง" ? (
              <View>
                <Image
                  source={require("../assets/role_employer.png")}
                  style={styles.image}
                  resizeMode="contain"
                />
                <AntDesign
                  name="checkcircle"
                  size={24}
                  style={styles.checkCircle}
                />
              </View>
            ) : (
              <Image
                source={require("../assets/role_employer_gray.png")}
                style={[styles.image, { opacity: 0.5 }]}
                resizeMode="contain"
              />
            )}
            <Text
              style={[
                styles.fontRole,
                role == "นายจ้าง" || { color: "gray", opacity: 0.5 },
              ]}
            >
              นายจ้าง
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectRole}
            onPress={() => {
              setRole("ลูกจ้าง");
            }}
          >
            {role == "ลูกจ้าง" ? (
              <View>
                <Image
                  source={require("../assets/role_employee.png")}
                  resizeMode="contain"
                  style={styles.image}
                />
                <AntDesign
                  name="checkcircle"
                  size={24}
                  style={styles.checkCircle}
                />
              </View>
            ) : (
              <Image
                source={require("../assets/role_employee_gray.png")}
                resizeMode="contain"
                style={[styles.image, { opacity: 0.5 }]}
              />
            )}

            <Text
              style={[
                styles.fontRole,
                role == "ลูกจ้าง" || { color: "gray", opacity: 0.5 },
              ]}
            >
              ลูกจ้าง
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            margin: "10%",
            backgroundColor: role ? "#f3595a" : "gray",
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 10,
            elevation: 2,
            opacity: 0.5,
          }}
          onPress={() => navigation.navigate("MainUser", { role: role })}
          disabled={role == undefined}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
            ยืนยัน
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  selectRole: {
    width: "35%",
    paddingBottom: "15%",
    marginHorizontal: "5%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fontRole: {
    textAlign: "center",
    color: "#567091",
    fontWeight: "bold",
    fontSize: 16,
  },
  checkCircle: {
    position: "absolute",
    right: 0,
    top: "-5%",
    color: "#567091",
    backgroundColor: "white",
    borderRadius: 12,
  },
});

export default SelectRoleScreen;
