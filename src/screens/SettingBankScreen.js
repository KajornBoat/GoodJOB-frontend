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

const PickerComponent = ({ title, value, items, onValueChange }) => {
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
            onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
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
  condition = (_) => true,
}) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState(value);

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
                  alert(title + "ไม่ถูกต้อง");
                  return;
                }
                setActive(false);
                onSaved(text);
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
  const [bank, setBank] = useState({ name: "", id: "" });
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
              value={bank.name}
              onValueChange={(value) => setBank({ ...bank, name: value })}
              items={require("../assets/constValue").BANK}
            />
            <TextInputComponent
              title="เลขบัญชีธนาคาร"
              value={bank.id}
              onSaved={(value) => setBank({ ...bank, id: value })}
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
