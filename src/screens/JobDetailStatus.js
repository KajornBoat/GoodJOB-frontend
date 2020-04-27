import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import JobDetail, {
  FooterComment,
  MyPositionComponent,
} from "../component/JobDetail";
import { AntDesign } from "@expo/vector-icons";
import ConfirmPopUp from "../component/ConfirmPopUp";
import { useSelector } from "react-redux";

const JobDetailStatus = ({ navigation, route }) => {
  const job = useSelector(
    ({ jobStatusReducer }) => jobStatusReducer
  ).data.filter((value) => value.id == route.params.itemId)[0];
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
              size={18}
              style={{ color: "#f65a5a" }}
            />
          </TouchableOpacity>
        </JobDetail>
      </View>
      <ConfirmPopUp
        navigation={navigation}
        setVisible={setPopUp}
        visible={popUp}
        textPopup={`คุณยืนยันที่จะยกเลิกตำแหน่ง "${job.myPosition}" หรือไม่?`}
        callback={() => console.log("Cancel")}
      />
      <View style={{ flex: 1 }}>
        <FooterComment navigation={navigation} job={job} />
      </View>
    </View>
  );
};

export default JobDetailStatus;
