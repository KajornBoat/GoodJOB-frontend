import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Picker,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PopUpScreen from "../component/PopUpScreen";
import api from "../API/API";
import { useSelector, useDispatch } from "react-redux";
import { setBankAccount, setBank } from "../redux/actions/user.action";

const PickerComponent = ({ title, value, items, onValueChange ,onUpdate}) => {
  const dispatch = useDispatch()
  return (
    <View>
      <Text style={[styles.labelFont, styles.gapVertical]}>{title}</Text>
      <View style={styles.gapVertical}>
        <View style={[{ height: 25 }, styles.gapVertical]}>
          <Picker
            selectedValue={value}
            style={{
              backgroundColor: "transparent",
              color: "transparent",
              height: 25,
            }}
            onValueChange={async(itemValue, itemIndex) => {
              console.log(itemValue)
              dispatch(onValueChange(itemValue));
              onUpdate(itemValue)
              alert("บันทึก" + title + "สำเร็จ");
            }}
          >
            <Picker.Item
              key={0}
              label={"กรุณาเลือก" + title}
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
          {value || "กรุณาเลือก" + title}
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

const TextInputComponent = ({
  value,
  onSaved,
  title,
  maxLength,
  keyboardType,
  onUpdate,
  condition = (text) => true,
}) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState(value);
  const dispatch = useDispatch()
  useEffect(() => {
    setText(value);
  }, [value]);
  
  return (
    <View>
      <Text style={[styles.labelFont, styles.gapVertical]}>{title}</Text>
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
          <Text style={[styles.labelFont, styles.gapVertical]}>{title}</Text>
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
              onPress={() => {
                if (!condition(text)) {
                  alert("บันทึก" + title + "ไม่สำเร็จ");
                  return;
                }
                setActive(false);
                dispatch(onSaved(text));
                onUpdate(text)
                alert("บันทึก" + title + "สำเร็จ");
              }}
            >
              <Text>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopUpScreen>
    </View>
  );
};

const BankScreen = () => {
  const userReducer = useSelector(({ userReducer }) => userReducer);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={-500}
        enabled
      >
        <ScrollView>
          <View style={styles.formContainer}>
            <PickerComponent
              title="ธนาคาร"
              value={userReducer.bank}
              onValueChange={setBank}
              onUpdate={api.user.update.bank}
              items={require("../assets/constValue").BANK}
            />
            <TextInputComponent
              title="เลขบัญชีธนาคาร"
              value={userReducer.bank_account}
              onSaved={setBankAccount}
              onUpdate={api.user.update.bank_account}
              maxLength={12}
              keyboardType="numeric"
              condition={(text) => text.match(/^[0-9]{10,12}$/)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BankScreen;

const styles = StyleSheet.create({
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
