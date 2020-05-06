import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import JobDetail, {
  FooterComment,
  MyPositionComponent,
} from "../component/JobDetail";
import { AntDesign } from "@expo/vector-icons";
import ConfirmPopUp from "../component/ConfirmPopUp";
import { useSelector } from "react-redux";
import api from "../API/API";

const JobDetailStatus = ({ navigation, route  }) => {
  const job = route.params.job;
  const [popUp, setPopUp] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9.7 }}>
        <JobDetail job={job}>
          <MyPositionComponent job={job} />
          <TouchableOpacity
            style={{ position: "absolute", bottom: 25, right: "7%" }}
            onPress={() => setPopUp(true)}
          >
            <AntDesign
              name="closecircle"
              size={20}
              style={{ color: "#f65a5a" }}
            />
          </TouchableOpacity>
        </JobDetail>
      </View>
      <ConfirmPopUp
        navigation={navigation}
        setVisible={setPopUp}
        visible={popUp}
        textPopup={`คุณยืนยันที่จะยกเลิกตำแหน่ง "${job.position}" หรือไม่?`}
        callback={() => {
          console.log("CancelJob")
          api.job.employee.acceptJob(job._id,"cancel").then(()=> {
            api.job.employee.getJobs("jobStatusReducer").then((job) => {
              console.log("Reload : JobDetailApply");
              route.params.setJob(job);
            });
          })
        }}
      />
      <View style={{ flex: 1 }}>
        <FooterComment navigation={navigation} job={job} />
      </View>
    </View>
  );
};

export default JobDetailStatus;
