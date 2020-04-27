import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import JobDetail, {
  FooterComment,
  MyPositionComponent,
} from "../component/JobDetail";
import ConfirmPopUp from "../component/ConfirmPopUp";
import { useSelector } from "react-redux";

const JobDetailInvite = ({ navigation, route }) => {
  const job = useSelector(
    ({ jobInviteReducer }) => jobInviteReducer
  ).data.filter((value) => value.id == route.params.itemId)[0];
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
        textPopup={`คุณยืนยันที่จะ${title}ตำแหน่ง "${job.myPosition}" หรือไม่?`}
        callback={
          accept ? () => console.log("Accept") : () => console.log("Decline")
        }
      />
      <View style={{ flex: 1 }}>
        <FooterComment navigation={navigation} job={job} />
      </View>
    </View>
  );
};

export default JobDetailInvite;
