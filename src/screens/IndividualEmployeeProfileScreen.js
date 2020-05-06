import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PopUpScreen from "../component/PopUpScreen";
import EmployeeAvatar from "../component/EmployeeAvatar";
import TextEmployeeInfo from "../component/TextEmployeeInfo";
import api from "../API/API";
import { setAcceptEmployee } from "../redux/actions/jobemployer.action";

export default function IndividualEmployeeProfileScreen({ route, navigation }) {
  const [imageVisible, setImageVisible] = useState(false);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <PopUpScreen
        visible={imageVisible}
        onRequestClose={() => setImageVisible(false)}
        transparent
      >
        <View style={{ justifyContent: "center" }}>
          <EmployeeAvatar uri={route.params.employeeInfo.user.photoURL} size={250} />
        </View>
      </PopUpScreen>

      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <EmployeeAvatar
            uri={route.params.employeeInfo.user.photoURL}
            size={100}
            onPress={() => setImageVisible(true)}
          />
        </View>
        <TextEmployeeInfo data={route.params.employeeInfo.user} />
        <Button title="จ่ายเงิน" onPress={() => {
         api.job.employer.finishJob(route.params.jobID,route.params.employeeInfo.user._id).then(() => {
          api.job.employer.getEmployee(route.params.jobID,"accept").then(employee => {
            const playload = {
              "employee" : employee,
              "jobID" : route.params.jobID
            }
            console.log("ReLoad_acceptEmployee")
            dispatch(setAcceptEmployee(playload))
          }) 
         })
          navigation.navigate("ManualEmployeeInfoScreen")
        }} />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    flex: 1,
    marginLeft: 30,
    color: "#536f90",
  },
  textInfo: {
    flex: 2,
    marginRight: 30,
  },
});
