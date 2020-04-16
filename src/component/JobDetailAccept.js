import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import JobDetail from "./JobDetail";

const MyPositionComponent = ({ position, job }) => (
  <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
    <Text
      style={[styles.titleFont, { textAlign: "center", marginBottom: 20 }]}
      children="ตำแหน่งงาน"
    />
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", marginBottom: 20 }}>ตำแหน่ง</Text>
        <Text>{position}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", marginBottom: 20 }}>ค่าจ้าง</Text>
        <Text>{job.posWage[job.position.indexOf(position)]}฿</Text>
      </View>
    </View>
  </View>
);

const Footer = ({ comments }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        width: "100%",
        backgroundColor: "#b2d9fe",
      }}
      onPress={comments}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
        ความคิดเห็น
      </Text>
    </TouchableOpacity>
  );
};

const JobDetailAccept = ({
  visible,
  handleClosed,
  job,
  user,
  position,
  comments,
  children = undefined,
}) => {
  return (
    <JobDetail
      visible={visible}
      handleClosed={handleClosed}
      job={job}
      user={user}
    >
      <View style={styles.container}>
        <MyPositionComponent position={position} job={job} />
      </View>
      {children}
      <Footer />
    </JobDetail>
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
});

export default JobDetailAccept;
