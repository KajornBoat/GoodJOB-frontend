import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import JobDetailAccept from "./JobDetailAccept";
import { AntDesign } from "@expo/vector-icons";
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

const JobDetailStatus = ({
  visible,
  handleClosed,
  job,
  user,
  position,
  comments,
  handleCancel,
}) => {
  const [popUp, setPopUp] = React.useState(false);
  const callback = () => {
    handleClosed();
    handleCancel();
  };
  return (
    <JobDetailAccept
      visible={visible}
      handleClosed={handleClosed}
      job={job}
      user={user}
      position={position}
      comments={comments}
    >
      <View>
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
      </View>
      <PopUpComponet
        visible={popUp}
        setVisible={setPopUp}
        title="ยกเลิก"
        position={position}
        callback={callback}
      />
    </JobDetailAccept>
  );
};

export default JobDetailStatus;
