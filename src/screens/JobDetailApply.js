import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import JobDetail, { FooterComment } from "../component/JobDetail";
import ConfirmPopUp from "../component/ConfirmPopUp";

const AddPositionComponent = ({ employees, job, navigation }) => {
  const [position, setPosition] = React.useState("");
  const [popUp, setPopUp] = React.useState(false);
  return (
    <View style={{ marginLeft: 10 }}>
      <Text
        style={[styles.titleFont, { textAlign: "center", marginBottom: 20 }]}
        children="ตำแหน่งงาน"
      />
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={{ flex: 3, fontSize: 13, textAlign: "left" }}>
          ตำแหน่ง
        </Text>
        <Text style={{ flex: 1, fontSize: 13, textAlign: "right" }}>จำนวน</Text>
        <Text style={{ flex: 1, fontSize: 13, textAlign: "right" }}>
          ค่าจ้าง
        </Text>
        <Text style={{ flex: 1, fontSize: 13, textAlign: "right" }} />
      </View>
      {employees.map((value, index) => (
        <View key={index} style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={{ flex: 3, fontSize: 13, textAlign: "left" }}>
            {value.position}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              flex: 1,
              fontSize: 13,
              textAlign: "right",
            }}
          >
            <Text children={value.amount} style={{ color: "#567091" }} />
            <Text children="/" />
            <Text children={job.posReq[job.position.indexOf(value.position)]} />
          </View>
          <Text style={{ flex: 1, fontSize: 13, textAlign: "right" }}>
            {job.posWage[job.position.indexOf(value.position)]}฿
          </Text>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            disabled={
              value.amount == job.posReq[job.position.indexOf(value.position)]
            }
            onPress={() => {
              setPosition(value.position);
              setPopUp(true);
            }}
          >
            <AntDesign
              name="plussquare"
              size={18}
              style={{
                color:
                  value.amount ==
                  job.posReq[job.position.indexOf(value.position)]
                    ? "#80808080"
                    : "#567091",
              }}
            />
          </TouchableOpacity>
        </View>
      ))}
      <ConfirmPopUp
        navigation={navigation}
        setVisible={setPopUp}
        visible={popUp}
        textPopup={`คุณยืนยันที่จะสมัครตำแหน่ง "${position}" หรือไม่?`}
        callback={() => console.log(position)}
      />
    </View>
  );
};

const JobDetailApply = ({ navigation }) => {
  const job = {
    position: ["ช่างภาพ", "สตาฟ"],
    posWage: [1000, 500],
    posReq: [3, 2],
  };
  const employees = [
    { position: "ช่างภาพ", amount: 2 },
    { position: "สตาฟ", amount: 0 },
  ];
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 11 }}>
        <JobDetail>
          <View style={styles.container}>
            <AddPositionComponent
              employees={employees}
              job={job}
              navigation={navigation}
            />
          </View>
        </JobDetail>
      </View>
      <FooterComment />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    marginTop: 20,
    paddingBottom: 15,
  },
  titleFont: {
    color: "#567091",
    fontSize: 16,
  },
});

export default JobDetailApply;
