import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import JobDetail from "./JobDetail";

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

const TextList = ({ positions }) => {
  const SubList = ({ title, cal }) => (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "60%" }}>
        <Text style={[styles.titleFont, { fontSize: 12 }]}>{title}</Text>
      </View>
      <View style={{ width: "100%" }}>
        {positions.map((value, index) => {
          return (
            <View style={{ width: "100%", flexDirection: "row" }} key={index}>
              <View
                style={{
                  width: "20%",
                  marginBottom: 3,
                }}
              >
                <Text style={styles.listFont}>
                  {value.amount + " x " + cal(value.cost) + "฿"}
                </Text>
              </View>
              <View
                style={{
                  width: "20%",
                  marginLeft: "1%",
                }}
              >
                <Text style={styles.listFont}>
                  {value.amount * cal(value.cost) + "฿"}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
  return (
    <View style={{ width: "100%" }}>
      <SubList title="ค่าจ้างรวม" cal={(value) => value} />
      <Text
        style={[
          styles.listFont,
          {
            textAlign: "right",
            fontWeight: "bold",
            color: "red",
            width: "101.3%",
            marginBottom: 10,
          },
        ]}
      >
        {positions.reduce((prev, curr) => prev + curr.amount * curr.cost, 0) +
          "฿"}
      </Text>
      <SubList
        title="ค่าจ้างมัดจำ (คิด 30%)"
        cal={(value) => Math.ceil((value * 30) / 100)}
      />
      <Text
        style={[
          styles.listFont,
          {
            textAlign: "right",
            fontWeight: "bold",
            width: "101.3%",
            marginBottom: 10,
          },
        ]}
      >
        {positions.reduce(
          (prev, curr) =>
            prev + curr.amount * Math.ceil((curr.cost * 30) / 100),
          0
        ) + "฿"}
      </Text>
      <SubList
        title="ค่าจ้างส่วนที่เหลือ (จ่ายก่อนเริ่มงาน)"
        cal={(value) => Math.floor((value * 70) / 100)}
      />
      <Text
        style={[
          styles.listFont,
          {
            textAlign: "right",
            fontWeight: "bold",
            width: "101.3%",
            marginBottom: 10,
          },
        ]}
      >
        {positions.reduce(
          (prev, curr) =>
            prev + curr.amount * Math.floor((curr.cost * 70) / 100),
          0
        ) + "฿"}
      </Text>
    </View>
  );
};

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

const JobDetailEmployerView = ({}) => {
  const employees = [];
  return (
    <JobDetail>
      <View style={[styles.container, { borderBottomWidth: 0.5 }]}>
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
  listFont: { fontSize: 12, textAlign: "right" },
});

export default JobDetailEmployerView;
