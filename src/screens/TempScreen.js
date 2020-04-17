import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import JobDetail from "../component/JobDetail";
import EmployeeListJob from "./EmployeeListJob";
import PopUpScreen from "../component/PopUpScreen";
const Page = createStackNavigator();

const MultiSelectPicker = ({ title, values, onChange, items, popUpState }) => {
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
          onChange(list);
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

const TempScreen = () => {
  const popUpState = useState(false);
  const [filterState, setFilterState] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    let str = "";
    for (let i = 0; i < filterState.length; i++) {
      if (str.length + filterState[i].length > 19) {
        str += "...";
        break;
      }
      str += filterState[i];
      if (i + 1 < filterState.length) str += " , ";
    }
    setTitle(str === "" ? "ตำแหน่งงาน" : str);
    return;
  }, [filterState]);

  return (
    <Page.Navigator initialRouteName="EmployeeListJobWithHeader">
      <Page.Screen
        name="EmployeeListJobWithHeader"
        component={EmployeeListJob}
        options={{
          headerRight: () => (
            <MultiSelectPicker
              title={title}
              popUpState={popUpState}
              onChange={setFilterState}
              values={filterState}
              items={require("../assets/constValue").JOB_POSITION}
            />
          ),
          headerTitle: null,
        }}
        initialParams={{ filter: filterState, routeName: "JobDetail" }}
      />
    </Page.Navigator>
  );
};

export default TempScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  iconColor: {
    color: "#567091",
  },
  labelFont: {
    color: "#567091",
    fontWeight: "bold",
    fontSize: 16,
  },
});
