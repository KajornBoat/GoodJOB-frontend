import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import JobDetail, {
  FooterComment,
  MyPositionComponent,
} from "../component/JobDetail";
import ConfirmPopUp from "../component/ConfirmPopUp";
import { useSelector } from "react-redux";
import api from "../API/API";

const JobDetailInvite = ({ navigation, route }) => {
  const job = route.params.job;
  const setJobs = route.params.setJob;
  const [popUp, setPopUp] = useState(false);
  const [title, setTitle] = useState("");
  const [accept, setAccept] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9.7 }}>
        <JobDetail job={job}>
          <MyPositionComponent job={job} />
        </JobDetail>
      </View>
      <View style={{ height: 64, flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#0bb203",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setPopUp(true);
            setTitle("ตอบรับ");
            setAccept(true);
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>ตอบรับ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#f65a5a",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setPopUp(true);
            setTitle("ปฏิเสธ");
            setAccept(false);
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>ปฏิเสธ</Text>
        </TouchableOpacity>
      </View>
      <ConfirmPopUp
        navigation={navigation}
        setVisible={setPopUp}
        visible={popUp}
        textPopup={`คุณยืนยันที่จะ${title}ตำแหน่ง "${job.position}" หรือไม่?`}
        callback={
          accept ? 
          () => {
            console.log("Accept")
            api.job.employee.acceptJob(job._id,"accept").then(()=> {
              api.job.employee.getJobs("jobInviteReducer").then(job => {
                console.log("Reload : jobInvite")
                setJobs(job)
              });    
            })
            
          }
          : () => {
            console.log("Decline")
            api.job.employee.acceptJob(job._id,"cancel").then(()=> {
              api.job.employee.getJobs("jobInviteReducer").then(job => {
                console.log("Reload : jobInvite")
                setJobs(job)
              });    
            })
          }
        }
      />
      <View style={{ flex: 1 }}>
        <FooterComment navigation={navigation} job={job} />
      </View>
    </View>
  );
};

export default JobDetailInvite;
