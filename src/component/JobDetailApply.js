import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import JobDetail from "./JobDetail";
import PopUpScreen from "./PopUpScreen";

const PopUpComponet = ({ visible, setVisible, title, position, callback }) => {
  return (
    <PopUpScreen visible={visible} onRequestClose={() => setVisible(false)}>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>
          คุณยืนยันที่จะ{title}ตำแหน่ง "{position}" หรือไม่?
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: 10,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#13b319",
              borderWidth: 0.5,
              borderColor: "#13b319",
              marginHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 10,
            }}
            onPress={() => {
              setVisible(false);
              callback();
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>ยืนยัน</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "white",
              borderWidth: 0.5,
              borderColor: "black",
              marginHorizontal: 15,
              paddingVertical: 15,
              borderRadius: 10,
            }}
            onPress={() => setVisible(false)}
          >
            <Text style={{ color: "black", textAlign: "center" }}>ยกเลิก</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PopUpScreen>
  );
};

const PositionComponent = ({ employees, job, handleClosed, handleAccept }) => {
  const [position, setPosition] = React.useState("");
  const [popUp, setPopUp] = React.useState(false);
  const callback = () => {
    handleClosed();
    handleCancel();
  };
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
      <PopUpComponet
        visible={popUp}
        setVisible={setPopUp}
        title="สมัคร"
        position={position}
        callback={() => {
          handleClosed();
          handleAccept();
        }}
      />
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
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 20,
          paddingRight: 15,
        }}
      >
        ความคิดเห็น
      </Text>
    </TouchableOpacity>
  );
};

const JobDetailApply = ({
  visible,
  handleClosed,
  job,
  user,
  employees,
  comment,
  handleAccept,
}) => {
  return (
    <JobDetail
      visible={visible}
      handleClosed={handleClosed}
      job={job}
      user={user}
    >
      <View style={styles.container}>
        <PositionComponent
          employees={employees}
          job={job}
          handleClosed={handleClosed}
          handleAccept={handleAccept}
        />
      </View>
      <Footer />
    </JobDetail>
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
