import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PopUpScreen from "../component/PopUpScreen";
import EmployeeAvatar from "../component/EmployeeAvatar";
import TextEmployeeInfo from "../component/TextEmployeeInfo";
import ConfirmPopUp from "../component/ConfirmPopUp";
import api from "../API/API";
import { setApplyEmployee } from "../redux/actions/jobemployer.action";

export default function IndividualApplicantProfileScreen({
  route,
  navigation,
}) {
  const employeeInfo = route.params.employeeInfo;
  const [imageVisible, setImageVisible] = useState(false);
  const [showAcceptPopUp, setShowAcceptPopUp] = useState(false);
  const [showDenyPopUp, setShowDenyPopUp] = useState(false);
  const jobID = route.params.parentItemId;
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <PopUpScreen
        visible={imageVisible}
        onRequestClose={() => setImageVisible(false)}
        transparent
      >
        <View style={{ justifyContent: "center" }}>
          <EmployeeAvatar uri={employeeInfo.user.photoURL} size={250} />
        </View>
      </PopUpScreen>

      <ConfirmPopUp
        visible={showAcceptPopUp}
        setVisible={setShowAcceptPopUp}
        textPopup={
          'คุณยืนยันที่จะตอบรับ "' +
          employeeInfo.user.firstname +
          " " +
          employeeInfo.user.lastname +
          '" หรือไม่?'
        }
        navigation={navigation}
        callback={async() => {
          console.log("Accept");
          api.job.acceptJob(jobID,employeeInfo.user._id,"accept").then(employee => {
            const playload = {
              "employee" : employee,
              "jobID" : jobID
            }
            console.log("ReLoad_applyEmployee")
            dispatch(setApplyEmployee(playload))
          })
        }}
      />

      <ConfirmPopUp
        visible={showDenyPopUp}
        setVisible={setShowDenyPopUp}
        textPopup={
          'คุณยืนยันที่จะปฏิเสธ "' +
          employeeInfo.user.firstname +
          " " +
          employeeInfo.user.lastname +
          '" หรือไม่?'
        }
        navigation={navigation}
        callback={() => {
          console.log("Decline");
          api.job.acceptJob(jobID,employeeInfo.user._id,"cancel").then(employee => {
            const playload = {
              "employee" : employee,
              "jobID" : jobID
            }
            console.log("ReLoad_applyEmployee")
            dispatch(setApplyEmployee(playload))
          })
        }}
      />

      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <EmployeeAvatar
            uri={employeeInfo.user.photoURL}
            size={100}
            onPress={() => setImageVisible(true)}
          />
        </View>
        <TextEmployeeInfo data={employeeInfo.user} />
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
