import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import EmployeeListJob from "./EmployeeListJob";
import PopUpScreen from "../component/PopUpScreen";
import { useSelector } from "react-redux";
const Stack = createStackNavigator();

const MultiSelectPicker = ({
  title,
  values,
  onChange,
  items,
  popUpState,
  setTitle,
  setValue,
  lastValue,
}) => {
  const { interested } = useSelector(({ userReducer }) => userReducer);
  const list = [...values];
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
          containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
          checkedIcon="check-square"
          checkedColor="#404040"
          uncheckedColor="#404040"
        />
      </View>
    );
  };
  const [active, setActive] = popUpState;
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginHorizontal: 15,
        width: Dimensions.get("screen").width / 2,
        borderWidth: 0.5,
        borderColor: "gray",
        padding: 8,
        borderRadius: 5,
      }}
      onPress={() => setActive(true)}
    >
      <Text>{title}</Text>
      <AntDesign
        name="down"
        size={12}
        style={{ position: "absolute", bottom: "50%", right: "5%" }}
      />
      <PopUpScreen
        onRequestClose={() => {
          setActive(false);
        }}
        visible={active}
      >
        <View
          style={[
            {
              backgroundColor: "white",
              margin: 10,
            },
          ]}
        >
          <View
            style={[{ flexDirection: "row", justifyContent: "space-between" }]}
          >
            <TouchableOpacity
              style={{
                marginVertical: 5,
                marginHorizontal: 10,
                flex: 1,
                padding: 5,
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: "#0bb203",
                backgroundColor: "#0bb203",
                elevation: 2,
              }}
              onPress={() => {
                setValue(items);
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                ทั้งหมด
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginVertical: 5,
                marginHorizontal: 10,
                flex: 1,
                padding: 5,
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: "#567091",
                backgroundColor: "#567091",
                elevation: 2,
              }}
              onPress={() => {
                setValue(interested);
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>สนใจ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginVertical: 5,
                marginHorizontal: 10,
                flex: 1,
                padding: 5,
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: "#f65a5a",
                backgroundColor: "#f65a5a",
                elevation: 2,
              }}
              onPress={() => {
                setValue([]);
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>ล้าง</Text>
            </TouchableOpacity>
          </View>
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
          <View style={[{ flexDirection: "row", justifyContent: "flex-end" }]}>
            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={() => {
                setValue(lastValue);
                setActive(false);
              }}
            >
              <Text>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={() => {
                setActive(false);
                setValue(list);
                onChange(list);
                if (list.length == items.length) {
                  setTitle("ทั้งหมด");
                  return;
                }
                let str = "";
                for (let i = 0; i < list.length; i++) {
                  if (str.length + list[i].length > 19) {
                    str += "...";
                    break;
                  }
                  str += list[i];
                  if (i + 1 < list.length) str += " , ";
                }
                setTitle(str == "" ? "ตำแหน่ง" : str);
              }}
            >
              <Text>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopUpScreen>
    </TouchableOpacity>
  );
};

const EmployeeListJobWithFilter = ({ route }) => {
  const items = require("../assets/constValue").JOB_POSITION;
  const { interested } = useSelector(({ userReducer }) => userReducer);
  const popUpState = useState(false);
  const [filter, setFilter] = useState(interested);
  const [filterState, setFilterState] = useState(interested);
  const [title, setTitle] = useState(
    (() => {
      if (filterState.length == items.length) {
        return "ทั้งหมด";
      } else {
        let str = "";
        for (let i = 0; i < filterState.length; i++) {
          if (str.length + filterState[i].length > 19) {
            str += "...";
            break;
          }
          str += filterState[i];
          if (i + 1 < filterState.length) str += " , ";
        }
        return str == "" ? "ตำแหน่ง" : str;
      }
    })()
  );

  const EmployeeJob = (props) => (
    <EmployeeListJob {...props} filter={filterState} />
  );
  return (
    <Stack.Navigator initialRouteName="EmployeeListJobWithHeader">
      <Stack.Screen
        name="EmployeeListJobWithHeader"
        component={EmployeeJob}
        initialParams={route.params}
        options={{
          headerRight: () => (
            <MultiSelectPicker
              title={title}
              popUpState={popUpState}
              onChange={setFilterState}
              values={filter}
              items={items}
              setTitle={setTitle}
              setValue={setFilter}
              lastValue={filterState}
            />
          ),
          headerTitle: null,
        }}
      />
    </Stack.Navigator>
  );
};

export default EmployeeListJobWithFilter;
