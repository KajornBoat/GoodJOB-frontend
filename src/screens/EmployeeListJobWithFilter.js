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
const Stack = createStackNavigator();

const MultiSelectPicker = ({
  title,
  values,
  onChange,
  items,
  popUpState,
  setTitle,
}) => {
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
          if (
            !(
              list.length == values.length &&
              list.filter((value) => values.indexOf(value) == -1).length == 0
            )
          ) {
            onChange(list);
            let str = "";
            for (let i = 0; i < list.length; i++) {
              if (str.length + list[i].length > 19) {
                str += "...";
                break;
              }
              str += list[i];
              if (i + 1 < list.length) str += " , ";
            }
            setTitle(str === "" ? "ตำแหน่งงาน" : str);
          }
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
    </TouchableOpacity>
  );
};

const EmployeeListJobWithFilter = ({ route }) => {
  const popUpState = useState(false);
  const [filterState, setFilterState] = useState([]);
  const [title, setTitle] = useState("ตำแหน่ง");
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
              values={filterState}
              items={require("../assets/constValue").JOB_POSITION}
              setTitle={setTitle}
            />
          ),
          headerTitle: null,
        }}
      />
    </Stack.Navigator>
  );
};

export default EmployeeListJobWithFilter;
