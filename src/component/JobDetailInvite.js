import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import JobDetailAccept from "./JobDetailAccept";
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

const JobDetailInvite = ({
  visible,
  handleClosed,
  job,
  user,
  position,
  comments,
  onAccept,
  onDecline,
}) => {
  const [popUp, setPopUp] = useState(false);
  const [title, setTitle] = useState("");
  const [callback, setCallback] = useState();
  return (
    <JobDetailAccept
      visible={visible}
      handleClosed={handleClosed}
      job={job}
      user={user}
      position={position}
      comments={comments}
    >
      <View style={{ height: 70, flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#13b319",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setPopUp(true);
            setTitle("ตอบรับ");
            setCallback(() => () => {
              onAccept();
              handleClosed();
            });
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>ตอบรับ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#f3595a",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setPopUp(true);
            setTitle("ปฏิเสธ");
            setCallback(() => () => {
              onDecline();
              handleClosed();
            });
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>ปฏิเสธ</Text>
        </TouchableOpacity>
      </View>
      <PopUpComponet
        visible={popUp}
        setVisible={setPopUp}
        title={title}
        position={position}
        callback={callback}
      />
    </JobDetailAccept>
  );
};

export default JobDetailInvite;
