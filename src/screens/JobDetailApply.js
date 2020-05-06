import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import JobDetail, { FooterComment } from "../component/JobDetail";
import ConfirmPopUp from "../component/ConfirmPopUp";
import { useSelector } from "react-redux";
import api from "../API/API";

const AddPositionComponent = ({ job, navigation }) => {
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
      {job.position.map((value, index) => (
        <View key={index} style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={{ flex: 3, fontSize: 13, textAlign: "left" }}>
            {job.position[index]}
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
            <Text children={job.posHave[index]} style={{ color: "#567091" }} />
            <Text children="/" />
            <Text children={job.posReq[index]} />
          </View>
          <Text style={{ flex: 1, fontSize: 13, textAlign: "right" }}>
            {job.posWage[index]}฿
          </Text>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            disabled={job.posHave[index] == job.posReq[index]}
            onPress={() => {
              setPosition(value);
              setPopUp(true);
            }}
          >
            <AntDesign
              name="plussquare"
              size={18}
              style={{
                color:
                  job.posHave[index] == job.posReq[index]
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
        callback={() => {
          api.job.employee.applyJob(job._id,position)
        }}
      />
    </View>
  );
};

const JobDetailApply = ({ navigation, route }) => {
  const job = route.params.job;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 11 }}>
        <JobDetail job={job}>
          <View style={styles.container}>
            <AddPositionComponent job={job} navigation={navigation} />
          </View>
        </JobDetail>
      </View>
      <FooterComment navigation={navigation} job={job} />
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
