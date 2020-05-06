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
import { useSelector, useDispatch } from "react-redux";
import api from "../API/API";
import { setSelectEmployee } from "../redux/actions/jobemployer.action";

export default function IndividualInviteEmployeeProfileScreen({
  route,
  navigation,
}) {
  const employeeInfo = route.params.employeeInfo;
  const [imageVisible, setImageVisible] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const jobID = route.params.jobID;
  const dispatch = useDispatch()
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
        visible={showPopUp}
        setVisible={setShowPopUp}
        textPopup={
          'คุณยืนยันที่จะเชิญ "' +
          employeeInfo.user.firstname +
          " " +
          employeeInfo.user.lastname +
          '" หรือไม่?'
        }
        navigation={navigation}
        callback={() => {
          console.log("Sent Invite",employeeInfo.user._id);
          api.job.employer.inviteUser(jobID,employeeInfo.user._id,route.params.position).then(employee => {
            api.job.employer.getEmployee(jobID,"selecting").then(employee => {
              const playload = {
                "employee" : employee,
                "jobID" : jobID
              }
              console.log("ReLoad_SelectEmployee")
              dispatch(setSelectEmployee(playload))
            })
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
