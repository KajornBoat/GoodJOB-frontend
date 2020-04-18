import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import JobDetail, {
  FooterComment,
  MyPositionComponent,
  PopUpComponet,
} from "./JobDetail";
import { AntDesign } from "@expo/vector-icons";

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
              style={{ color: "#f3595a" }}
            />
          </TouchableOpacity>
        </JobDetail>
      </View>
      <PopUpComponet
        visible={popUp}
        setVisible={setPopUp}
        title="ยกเลิก"
        position={position}
        callback={() => {
          console.log("Cancel");
        }}
        navigation={navigation}
      />
      <View style={{ flex: 1 }}>
        <FooterComment />
      </View>
    </View>
  );
};

export default JobDetailStatus;
