import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons";

import API from "../API/API";

import { setLoading } from "../redux/actions/pagestatus.action";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const dispatch = useDispatch();
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
          เข้าสู่ระบบ
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
        <TouchableOpacity
          style={{
            marginTop: "10%",
            backgroundColor: "#3b5998",
            paddingVertical: 12,
            paddingHorizontal: 20,
            flexDirection: "row",
            borderRadius: 10,
            elevation: 2,
            width: 240,
          }}
          onPress={() => API.auth.signInWithFacebook()}
        >
          <FontAwesome
            name="facebook"
            size={28}
            style={{ color: "white", flex: 1 }}
          />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              textAlignVertical: "center",
              flex: 5,
            }}
          >
            เข้าสู่ระบบด้วย Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: "10%",
            backgroundColor: "white",
            paddingVertical: 12,
            paddingHorizontal: 20,
            flexDirection: "row",
            borderRadius: 10,
            elevation: 2,
            width: 240,
          }}
          onPress={() => {
            API.auth.signInWithGoogleAsync();
            dispatch(setLoading());
          }}
        >
          <Image
            source={require("../assets/googleIcon.png")}
            style={{ width: 28, height: 28, flex: 1, left: -10 }}
            resizeMode="contain"
          />
          <Text
            style={{
              marginLeft: 10,
              textAlignVertical: "center",
              flex: 5,
            }}
          >
            เข้าสู่ระบบด้วย Google
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
});

export default LoginScreen;
