import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import PopUpScreen from "../component/PopUpScreen";
import EmployeeAvatar from "../component/EmployeeAvatar";
import TextEmployeeInfo from "../component/TextEmployeeInfo";
import ConfirmPopUp from "../component/ConfirmPopUp";

export default function IndividualApplicantProfileScreen({
  route,
  navigation,
}) {
  const employeeInfo = useSelector(
    ({ jobEmployerReducer }) => jobEmployerReducer
  ).data.filter((value) => value.id == route.params.parentItemId)[0]
    .applicantsapplicant;
  const [imageVisible, setImageVisible] = useState(false);
  const [showAcceptPopUp, setShowAcceptPopUp] = useState(false);
  const [showDenyPopUp, setShowDenyPopUp] = useState(false);
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
        visible={showAcceptPopUp}
        setVisible={setShowAcceptPopUp}
        textPopup={
          'คุณยืนยันที่จะตอบรับ "' +
          employeeInfo[itemId].firstName +
          " " +
          employeeInfo[itemId].lastName +
          '" หรือไม่?'
        }
        navigation={navigation}
        callback={() => {
          console.log("Accept");
        }}
      />

      <ConfirmPopUp
        visible={showDenyPopUp}
        setVisible={setShowDenyPopUp}
        textPopup={
          'คุณยืนยันที่จะปฏิเสธ "' +
          employeeInfo[itemId].firstName +
          " " +
          employeeInfo[itemId].lastName +
          '" หรือไม่?'
        }
        navigation={navigation}
        callback={() => {
          console.log("Decline");
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

      <View style={{ flexDirection: "row", backgroundColor: "white" }}>
        <TouchableOpacity
          style={[styles.footerView, { flex: 1, backgroundColor: "#0bb203" }]}
          activeOpacity={0.5}
          onPress={() => setShowAcceptPopUp(true)}
        >
          <Text style={styles.footerText}>ตอบรับ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerView, { flex: 1, backgroundColor: "#f65a5a" }]}
          activeOpacity={0.5}
          onPress={() => setShowDenyPopUp(true)}
        >
          <Text style={styles.footerText}>ปฏิเสธ</Text>
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
