import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import JobDetail, {
  FooterComment,
  MyPositionComponent,
} from "../component/JobDetail";
import { AntDesign } from "@expo/vector-icons";
import ConfirmPopUp from "../component/ConfirmPopUp";

const JobDetailStatus = ({ navigation }) => {
  const position = "ช่างภาพ";
  const job = {
    position: ["ช่างภาพ", "สตาฟ"],
    posWage: [1000, 500],
    posReq: [3, 2],
  };
  const [popUp, setPopUp] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9.7 }}>
        <JobDetail>
          <MyPositionComponent position={position} job={job} />
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
        textPopup={`คุณยืนยันที่จะยกเลิกตำแหน่ง "${position}" หรือไม่?`}
        callback={() => console.log("Cancel")}
      />
      <View style={{ flex: 1 }}>
        <FooterComment />
      </View>
    </View>
  );
};

export default JobDetailStatus;
