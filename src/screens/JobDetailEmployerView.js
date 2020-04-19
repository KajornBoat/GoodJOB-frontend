import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import JobDetail, { FooterComment } from "../component/JobDetail";
import { TextList } from "./CreateJobScreen";

const PositionComponent = ({ employees, job }) => (
  <View style={{ marginHorizontal: 10 }}>
    <Text
      style={[styles.titleFont, { textAlign: "center", marginBottom: 20 }]}
      children="ตำแหน่งงาน"
    />
    <View style={{ flexDirection: "row", marginBottom: 10 }}>
      <Text style={{ flex: 3, fontSize: 13, textAlign: "left" }}>ตำแหน่ง</Text>
      <Text style={{ flex: 1, fontSize: 13, textAlign: "right" }}>จำนวน</Text>
      <Text style={{ flex: 1, fontSize: 13, textAlign: "right" }}>ค่าจ้าง</Text>
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
      </View>
    ))}
  </View>
);

const JobDetailEmployerView = () => {
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
          <View
            style={[
              styles.container,
              { borderBottomWidth: 0.5, borderColor: "#ccc" },
            ]}
          >
            <PositionComponent employees={employees} job={job} />
          </View>
          <View
            style={{ marginHorizontal: 20, marginTop: 10, paddingVertical: 15 }}
          >
            <TextList
              positions={job.position.map((value, i) => ({
                position: value,
                amount: job.posReq[i],
                cost: job.posWage[i],
              }))}
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
    paddingHorizontal: 15,
    marginTop: 20,
    paddingBottom: 15,
  },
  titleFont: {
    color: "#567091",
    fontSize: 16,
  },
  listFont: { fontSize: 12, textAlign: "right" },
});

export default JobDetailEmployerView;
