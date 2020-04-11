import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Picker,
  Modal,
} from "react-native";
import { Avatar, CheckBox } from "react-native-elements";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import PopUpScreen from "./PopUpScreen";
import api from "../API/API";


const AvatarComponent = ({ url, role, onChangeImage }) => {
  const templateEmployer = require("../assets/รูปนายจ้าง.png");
  const templateEmployee = require("../assets/รูปลูกจ้าง.png");
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={[styles.gapVertical, styles.labelFont, { fontSize: 16 }]}>
        แก้ไขข้อมูลส่วนตัว
      </Text>
      <Avatar
        containerStyle={styles.gapVertical}
        rounded
        source={
          url
            ? {
                uri: url,
              }
            : role === "Employer"
            ? templateEmployer
            : templateEmployee
        }
        size="large"
        showEditButton
        onEditPress={async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });
          api.user.uploadImage(result);
          //console.log(result);
          if (!result.cancelled) {
            onChangeImage(result.uri);
          }
        }}
        editButton={{
          name: "plus",
          type: "font-awesome",
          iconStyle: {
            fontSize: 16,
          },
          size: 26,
          style: {
            backgroundColor: "#b2d9fe",
          },
          underlayColor: "#c3eaff",
        }}
      />
    </View>
  );
};

const TextInputComponent = ({
  value,
  onSaved,
  title,
  maxLength,
  keyboardType,
}) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState(value);
  return (
    <View>
      <View style={[{ flexDirection: "row" }, styles.gapVertical]}>
        <Text style={styles.labelFont}>{title}</Text>
        <Text style={{ paddingHorizontal: 5, color: "red" }}>*</Text>
      </View>
      <TouchableOpacity onPress={() => setActive(true)}>
        <Text
          style={[
            styles.inputContainer,
            styles.gapVertical,
            { color: value ? "black" : "#f003" },
          ]}
        >
          {value || "กรุณาใส่" + title}
        </Text>
      </TouchableOpacity>
      <PopUpScreen
        visible={active}
        onRequestClose={() => {
          setActive(false);
          setText(value);
        }}
      >
        <View style={styles.popUpContainer}>
          <Text
            style={[{ fontSize: 18, fontWeight: "bold" }, styles.gapVertical]}
          >
            {title}
          </Text>
          <TextInput
            value={text}
            onChangeText={setText}
            style={[
              styles.inputContainer,
              styles.gapVertical,
              { borderColor: "#126f6f", borderBottomWidth: 2 },
            ]}
            placeholder={"กรุณาใส่" + title}
            maxLength={maxLength}
            keyboardType={keyboardType}
          />
          <View
            style={[
              styles.gapVertical,
              { flexDirection: "row", justifyContent: "flex-end" },
            ]}
          >
            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={() => {
                setActive(false);
                setText(value);
              }}
            >
              <Text style={{ color: "#126f6f" }}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={() => {
                setActive(false);
                onSaved(text);
              }}
            >
              <Text style={{ color: "#126f6f" }}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopUpScreen>
    </View>
  );
};

const PickerComponent = ({ title, value, items, onValueChange }) => {
  return (
    <View>
      <View style={[{ flexDirection: "row" }, styles.gapVertical]}>
        <Text style={styles.labelFont}>{title}</Text>
        <Text style={{ paddingHorizontal: 5, color: "red" }}>*</Text>
      </View>
      <View style={styles.gapVertical}>
        <View style={[{ height: 25 }, styles.gapVertical]}>
          <Picker
            selectedValue={value}
            style={{
              backgroundColor: "transparent",
              color: "transparent",
              height: 25,
            }}
            onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
          >
            <Picker.Item
              key={0}
              label={"กรุณาใส่" + title}
              value={""}
              color="gray"
            />
            {items.map((value, index) => (
              <Picker.Item key={index + 1} label={value} value={value} />
            ))}
          </Picker>
        </View>
        <Text
          style={[
            styles.inputContainer,
            {
              color: value ? "black" : "#f003",
              position: "absolute",
              top: 0,
              width: "100%",
            },
          ]}
        >
          {value || "กรุณาใส่" + title}
        </Text>
        <AntDesign
          name="down"
          size={12}
          style={{ position: "absolute", top: "45%", right: "2%" }}
        />
      </View>
    </View>
  );
};

const MultipleSelect = ({ title, values, onChange, items }) => {
  const list = [...values];
  const [message, setMessage] = useState("");
  const Item = (props) => {
    const [state, setState] = useState(props.default);

    return (
      <View style={{ width: "100%" }}>
        <CheckBox
          title={props.label}
          checked={state}
          onPress={() => {
            setState(!state);
            if (!state == true) props.addList(props.value);
            else props.removeList(props.value);
          }}
          checkedIcon="check-square"
          checkedColor="#404040"
          uncheckedColor="#404040"
        />
      </View>
    );
  };

  useEffect(() => {
    let str = "";
    for (let i = 0; i < values.length; i++) {
      if (str.length + values[i].length > 39) {
        str += "...";
        break;
      }
      str += values[i];
      if (i + 1 < values.length) str += " , ";
    }
    setMessage(str);
    return;
  }, [values]);

  const [active, setActive] = useState(false);
  return (
    <View>
      <Text style={[styles.labelFont, styles.gapVertical]}>{title}</Text>
      <TouchableOpacity onPress={() => setActive(true)}>
        <View>
          <Text
            style={[
              styles.inputContainer,
              styles.gapVertical,
              { color: message ? "black" : "gray" },
            ]}
          >
            {message || "กรุณาเลือก" + title}
          </Text>
          <AntDesign
            name="down"
            size={12}
            style={{ position: "absolute", top: "45%", right: "2%" }}
          />
          <Modal
            transparent
            onRequestClose={() => {
              setActive(false);
              onChange(list);
            }}
            visible={active}
            animationType="fade"
          >
            <PopUpScreen>
              <ScrollView
                style={{
                  backgroundColor: "white",
                  maxHeight: 56.5 * (items.length < 10 ? items.length : 10),
                }}
              >
                {items.map((value, index) => (
                  <Item
                    key={index}
                    default={values.indexOf(value) > -1}
                    label={value}
                    value={value}
                    addList={(value) => {
                      list.push(value);
                    }}
                    removeList={(value) => {
                      list.splice(list.indexOf(value), 1);
                    }}
                  />
                ))}
              </ScrollView>
            </PopUpScreen>
          </Modal>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const TextAreaComponent = ({ title, value, maxLength, height, onSaved }) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState(value);
  return (
    <View>
      <Text style={[styles.labelFont, styles.gapVertical]}>{title}</Text>
      <TouchableOpacity onPress={() => setActive(true)}>
        <Text
          style={[
            styles.inputContainer,
            styles.gapVertical,
            {
              borderWidth: 0.5,
              height: 100,
              textAlignVertical: "top",
              padding: 5,
              borderRadius: 5,
              height: height,
            },
          ]}
        >
          {value}
        </Text>
      </TouchableOpacity>
      <PopUpScreen
        visible={active}
        onRequestClose={() => {
          setActive(false);
          setText(value);
        }}
      >
        <View style={styles.popUpContainer}>
          <Text
            style={[{ fontSize: 18, fontWeight: "bold" }, styles.gapVertical]}
          >
            {title}
          </Text>
          <TextInput
            value={text}
            onChangeText={setText}
            style={[
              styles.gapVertical,
              {
                borderColor: "#126f6f",
                textAlignVertical: "top",
                padding: 5,
                borderRadius: 5,
                borderWidth: 2,
                height: height,
              },
            ]}
            placeholder={"กรุณาใส่" + title}
            maxLength={maxLength}
            multiline
          />
          <View
            style={[
              styles.gapVertical,
              { flexDirection: "row", justifyContent: "flex-end" },
            ]}
          >
            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={() => {
                setActive(false);
                setText(value);
              }}
            >
              <Text style={{ color: "#126f6f" }}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={() => {
                setActive(false);
                onSaved(text);
              }}
            >
              <Text style={{ color: "#126f6f" }}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopUpScreen>
    </View>
  );
};

const RoleComponent = ({ role, setRole }) => {
  return (
    <View
      style={[styles.gapVertical, { flexDirection: "row", marginVertical: 30 }]}
    >
      <Text
        style={[
          {
            marginRight: "2.5%",
            textAlignVertical: "center",
            width: "15.5%",
          },
          styles.labelFont,
        ]}
      >
        บทบาท
      </Text>
      <TouchableOpacity
        onPress={() => setRole("Employer")}
        style={{
          width: "39%",
          marginHorizontal: "1%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            paddingVertical: 10,
            borderWidth: 0.5,
            borderRadius: 5,
            backgroundColor: role == "Employer" ? "#567091" : "white",
            borderColor: role == "Employer" ? "#567091" : "black",
            color: role == "Employer" ? "white" : "black",
          }}
        >
          นายจ้าง
          
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRole("Job Seeker")}
        style={{
          width: "39%",
          marginHorizontal: "1%",
        }}
      >
        <Text
          style={{
            paddingVertical: 10,
            textAlign: "center",
            borderWidth: 0.5,
            borderRadius: 5,
            backgroundColor: role == "Job Seeker" ? "#567091" : "white",
            borderColor: role == "Job Seeker" ? "#567091" : "black",
            color: role == "Job Seeker" ? "white" : "black",
          }}
        >
          ลูกจ้าง
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const SettingScreen = () => {
  const [url, setUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idCard, setIdCard] = useState("");
  const [currentProvince, setCurrentProvince] = useState("");
  const [gender, setGender] = useState("");
  const [introduceText, setIntroduceText] = useState("");
  const [interestJob, setInterestJob] = useState([]);
  const [currentRole, setCurrentRole] = useState("Employer");
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={-500}
        enabled
      >
        <ScrollView>
          <View style={styles.formContainer}>
            <AvatarComponent
              url={url}
              role={currentRole}
              onChangeImage={setUrl}
            />
            <TextInputComponent
              title="ชื่อจริง"
              value={firstName}
              onSaved={setFirstName}
              maxLength={20}
            />
            <TextInputComponent
              title="นามสกุล"
              value={lastName}
              onSaved={setLastName}
              maxLength={20}
            />
            <TextInputComponent
              title="อายุ"
              value={age}
              onSaved={setAge}
              maxLength={2}
              keyboardType="numeric"
            />
            <TextInputComponent
              title="หมายเลขโทรศัพท์"
              value={phoneNumber}
              onSaved={setPhoneNumber}
              maxLength={10}
              keyboardType="numeric"
            />
            <TextInputComponent
              title="เลขประจำตัวประชาชน"
              value={idCard}
              onSaved={setIdCard}
              maxLength={13}
              keyboardType="numeric"
            />
            <PickerComponent
              title="จังหวัดที่อยู่ปัจจุบัน"
              value={currentProvince}
              onValueChange={setCurrentProvince}
              items={require("../assets/constValue").PROVINCE_TH}
            />
            <PickerComponent
              title="เพศ"
              value={gender}
              onValueChange={setGender}
              items={require("../assets/constValue").GENDER}
            />
            <MultipleSelect
              title="ตำแหน่งงานที่สนใจ"
              values={interestJob}
              onChange={(value) => {
                setInterestJob(value);
              }}
              items={require("../assets/constValue").JOB_POSITION}
            />
            <TextAreaComponent
              title="แนะนำตัวเอง"
              value={introduceText}
              onSaved={setIntroduceText}
              maxLength={200}
              height={110}
            />
            <RoleComponent role={currentRole} setRole={setCurrentRole} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
  formContainer: {
    flex: 1,
    marginTop: 15,
    marginBottom: 50,
    marginHorizontal: 30,
  },
  gapVertical: {
    marginVertical: 5,
  },
  labelFont: {
    color: "#567091",
  },
  inputContainer: {
    borderBottomWidth: 0.5,
    height: 30,
    paddingHorizontal: 5,
    textAlignVertical: "center",
  },
  popUpContainer: {
    margin: 10,
  },
});

export default SettingScreen;
