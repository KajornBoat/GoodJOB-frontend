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
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import * as actionUser from "../redux/actions/user.action";

import PopUpScreen from "../component/PopUpScreen";
import PopUpLoading from "../component/PopupLoading";
import api from "../API/API";

const AvatarComponent = ({ url, onChangeImage }) => {
  const [activeLoad, setActiveLoad] = useState(false);
  const dispatch = useDispatch();

  return (
    <View style={{ alignItems: "center" }}>
      <Avatar
        containerStyle={styles.gapVertical}
        rounded
        source={{
          uri: url,
        }}
        size="large"
        showEditButton
        onEditPress={async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });
          if (!result.cancelled) {
            setActiveLoad(true);
            let link = await api.user.update
              .image(result)
              .catch((err) => console.log(err));

            dispatch(onChangeImage(link));

            setTimeout(() => {
              setActiveLoad(false);
            }, 2500);
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
            backgroundColor: "#afd9ff",
          },
          underlayColor: "#c3eaff",
        }}
      />

      <PopUpLoading active={activeLoad} setActive={setActiveLoad} />
    </View>
  );
};

const TextInputComponent = ({
  value,
  onSaved,
  title,
  maxLength,
  keyboardType,
  updateData,
}) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState(value);
  const [activeLoad, setActiveLoad] = useState(false);
  const dispatch = useDispatch();

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
            { color: value ? "black" : "gray" },
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
          <Text style={[styles.gapVertical, styles.labelFont]}>{title}</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            style={[
              styles.inputContainer,
              styles.gapVertical,
              { borderColor: "gray", borderBottomWidth: 0.5 },
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
              <Text>ยกเลิก</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={async () => {
                setActiveLoad(true);
                await updateData(text);
                setActiveLoad(false);
                setActive(false);
                dispatch(onSaved(text));
              }}
            >
              <Text>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopUpScreen>

      <PopUpLoading active={activeLoad} setActive={setActiveLoad} />
    </View>
  );
};

const PickerComponent = ({
  title,
  value,
  items,
  onValueChange,
  updateData,
}) => {
  const [activeLoad, setActiveLoad] = useState(false);
  const dispatch = useDispatch();
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
            onValueChange={async (itemValue, itemIndex) => {
              setActiveLoad(true);
              await updateData(itemValue);
              setActiveLoad(false);
              dispatch(onValueChange(itemValue));
            }}
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
              color: value ? "black" : "gray",
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
      <PopUpLoading active={activeLoad} setActive={setActiveLoad} />
    </View>
  );
};

const MultipleSelect = ({ title, values, onChange, items, updateData }) => {
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
  const [activeLoad, setActiveLoad] = useState(false);
  const dispatch = useDispatch();
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
          <PopUpScreen
            onRequestClose={async () => {
              if (
                list.length == values.length &&
                list.filter((value) => values.indexOf(value) == -1).length == 0
              ) {
                setActive(false);
                return;
              }
              setActiveLoad(true);
              await updateData(list);
              setActiveLoad(false);
              setActive(false);
              dispatch(onChange(list));
            }}
            visible={active}
          >
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
        </View>
      </TouchableOpacity>
      <PopUpLoading active={activeLoad} setActive={setActiveLoad} />
    </View>
  );
};

const TextAreaComponent = ({
  title,
  value,
  maxLength,
  height,
  onSaved,
  updateData,
}) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState(value);
  const [activeLoad, setActiveLoad] = useState(false);
  const dispatch = useDispatch();
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
              color: value ? "black" : "gray",
            },
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
          <Text style={[styles.labelFont, styles.gapVertical]}>{title}</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            style={[
              styles.gapVertical,
              {
                borderColor: "gray",
                textAlignVertical: "top",
                padding: 5,
                borderRadius: 5,
                borderWidth: 0.5,
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
              <Text>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={async () => {
                setActiveLoad(true);
                await updateData(text);
                setActiveLoad(false);
                setActive(false);
                dispatch(onSaved(text));
              }}
            >
              <Text>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopUpScreen>
      <PopUpLoading active={activeLoad} setActive={setActiveLoad} />
    </View>
  );
};

const SettingScreen = () => {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("cekmitl@kmitl.ac.th");
  const [firstName, setFirstName] = useState("sadsad");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idCard, setIdCard] = useState("");
  const [currentProvince, setCurrentProvince] = useState("");
  const [gender, setGender] = useState("");
  const [introduceText, setIntroduceText] = useState("");
  const [interestJob, setInterestJob] = useState([]);

  const userReducer = useSelector(({ userReducer }) => userReducer);
  const dispatch = useDispatch();

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
              url={userReducer.photoURL}
              onChangeImage={setUrl}
            />
            <Text
              style={[
                styles.gapVertical,
                styles.labelFont,
                { textAlign: "center" },
              ]}
            >
              {userReducer.email}
            </Text>
            <TextInputComponent
              title="ชื่อจริง"
              value={userReducer.firstname}
              onSaved={actionUser.setFirstname}
              maxLength={20}
              updateData={api.user.update.firstname}
            />
            <TextInputComponent
              title="นามสกุล"
              value={userReducer.lastname}
              onSaved={actionUser.setLastname}
              maxLength={20}
              updateData={api.user.update.lastName}
            />
            <TextInputComponent
              title="อายุ"
              value={userReducer.age}
              onSaved={actionUser.setAge}
              maxLength={2}
              keyboardType="numeric"
              updateData={api.user.update.age}
            />
            <TextInputComponent
              title="หมายเลขโทรศัพท์"
              value={userReducer.phone_number}
              onSaved={actionUser.setPhoneNumber}
              maxLength={10}
              keyboardType="numeric"
              updateData={api.user.update.phoneNumber}
            />
            <TextInputComponent
              title="เลขประจำตัวประชาชน"
              value={userReducer.id_card}
              onSaved={actionUser.setIDcard}
              maxLength={13}
              keyboardType="numeric"
              updateData={api.user.update.id_card}
            />
            <PickerComponent
              title="จังหวัดที่อยู่ปัจจุบัน"
              value={userReducer.province}
              onValueChange={actionUser.setProvince}
              items={require("../assets/constValue").PROVINCE_TH}
              updateData={api.user.update.province}
            />
            <PickerComponent
              title="เพศ"
              value={userReducer.gender}
              onValueChange={actionUser.setGenger}
              items={require("../assets/constValue").GENDER}
              updateData={api.user.update.gender}
            />
            <MultipleSelect
              title="ตำแหน่งงานที่สนใจ"
              values={userReducer.interested}
              onChange={actionUser.setInterested}
              items={require("../assets/constValue").JOB_POSITION}
              updateData={api.user.update.interested}
            />
            <TextAreaComponent
              title="แนะนำตัวเอง"
              value={userReducer.introduce}
              onSaved={actionUser.setIntroduce}
              maxLength={200}
              height={110}
              updateData={api.user.update.introduce}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { backgroundColor: "white" },
  formContainer: {
    flex: 1,
    marginTop: 15,
    marginBottom: 20,
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
    borderColor: "gray",
  },
  popUpContainer: {
    margin: 10,
  },
});

export default SettingScreen;
