import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import JobDetail, { FooterComment } from "../component/JobDetail";
import { TextList } from "./CreateJobScreen";

const PositionComponent = ({ job }) => (
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
      </View>
    ))}
  </View>
);

const JobDetailEmployerView = ({ navigation, route }) => {
  const { job } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 11 }}>
        <JobDetail job={job}>
          <View
            style={[
              styles.container,
              { borderBottomWidth: 0.5, borderColor: "#ccc" },
            ]}
          >
            <PositionComponent job={job} />
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
      <FooterComment navigation={navigation} job={job} />
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
