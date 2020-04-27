import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import PopUpScreen from "../component/PopUpScreen";
import EmployeeAvatar from "../component/EmployeeAvatar";
import TextEmployeeInfo from "../component/TextEmployeeInfo";
import ConfirmPopUp from "../component/ConfirmPopUp";
import { useSelector } from "react-redux";

export default function IndividualInviteEmployeeProfileScreen({
  route,
  navigation,
}) {
  const employeeInfo = useSelector(
    ({ inviteEmployeeReducer }) => inviteEmployeeReducer
  ).data;
  const [imageVisible, setImageVisible] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const itemId = route.params.itemId;

  return (
    <View style={{ flex: 1 }}>
      <PopUpScreen
        visible={imageVisible}
        onRequestClose={() => setImageVisible(false)}
        transparent
      >
        <View style={{ justifyContent: "center" }}>
          <EmployeeAvatar uri={employeeInfo[itemId].image} size={250} />
        </View>
      </PopUpScreen>

      <ConfirmPopUp
        visible={showPopUp}
        setVisible={setShowPopUp}
        textPopup={
          'คุณยืนยันที่จะเชิญ "' +
          employeeInfo[itemId].firstName +
          " " +
          employeeInfo[itemId].lastName +
          '" หรือไม่?'
        }
        navigation={navigation}
        callback={() => {
          console.log("Sent Invite");
        }}
      />

      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <EmployeeAvatar
            uri={employeeInfo[itemId].image}
            size={100}
            onPress={() => setImageVisible(true)}
          />
        </View>
        <TextEmployeeInfo data={employeeInfo[itemId]} />
      </ScrollView>

      <View style={{ backgroundColor: "white" }}>
        <TouchableOpacity
          style={styles.footerView}
          onPress={() => setShowPopUp(true)}
        >
          <Text style={styles.footerText}>ส่งคำเชิญ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerView: {
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#afd9ff",
  },
  footerText: {
    color: "white",
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
});
