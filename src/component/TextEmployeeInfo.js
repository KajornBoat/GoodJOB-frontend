import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TextEmployeeInfo = ({ data }) => {
  return (
    <View>
      <TextInformation
        title="ชื่อ-นามสกุล"
        data={data.firstname + " " + data.lastname}
      />
      <TextInformation title="อายุ" data={data.age} />
      <TextInformation title="เพศ" data={data.gender} />
      <TextIntroduce introduceText={data.introduce_text} />
      <TextExperience experience={data.selectedBy} />
    </View>
  );
};

const TextInformation = ({ title, data }) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 15 }}>
      <Text style={styles.textTitle}>{title}</Text>
      <Text style={styles.textInfo}>{data}</Text>
    </View>
  );
};

const TextIntroduce = ({ introduceText }) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[{ ...styles.textTitle, flex: 0 }, { marginBottom: 10 }]}>
        แนะนำตัวเอง
      </Text>
      <Text style={[{ ...styles.textInfo, flex: 0 }, { marginLeft: 40 }]}>
        {introduceText}
      </Text>
    </View>
  );
};

const TextExperience = ({ experience }) => {
  return (
    <View>
      <Text style={{ ...styles.textTitle, flex: 0 }}>ประสบการณ์</Text>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          marginRight: 10,
        }}
      >
        <Text style={{ flex: 1.5, marginLeft: 40 }}>
          เคยรับทำงานมาเเล้ว {experience.length} ครั้ง
        </Text>
        {/* <Text style={{ ...styles.textTitle, flex: 1.5, marginLeft: 40 }}>
          งาน
        </Text>
        <Text style={{ ...styles.textTitle, flex: 1, marginLeft: 10 }}>
          ตำแหน่ง
        </Text> */}
      </View>
      {/* <View style={{ marginBottom: 10 }}>
        {experience.map((value, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              marginBottom: 5,
              marginLeft: 40,
              marginRight: 10,
            }}
          >
            <Text style={{ flex: 1.5 }}>{index + 1 + ". " + value}</Text>
            <Text style={{ flex: 1, marginLeft: 10 }}>{value}</Text>
          </View>
        ))}
      </View> */}
    </View>
  );
};

export default TextEmployeeInfo;

const styles = StyleSheet.create({
  textTitle: {
    flex: 1,
    marginLeft: 30,
    color: "#536f90",
  },
  textInfo: {
    flex: 2,
    marginRight: 30,
  },
});
