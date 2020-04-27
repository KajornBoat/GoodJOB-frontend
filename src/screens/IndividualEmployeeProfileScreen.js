import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import PopUpScreen from "../component/PopUpScreen";
import EmployeeAvatar from "../component/EmployeeAvatar";
import TextEmployeeInfo from "../component/TextEmployeeInfo";

export default function IndividualEmployeeProfileScreen({ route, navigation }) {
  const employeeInfo = useSelector(
    ({ jobEmployerReducer }) => jobEmployerReducer
  ).data.filter((value) => value.id == route.params.parentItemId)[0].myEmployee;
  const [imageVisible, setImageVisible] = useState(false);

  const itemId = route.params.itemId;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <PopUpScreen
        visible={imageVisible}
        onRequestClose={() => setImageVisible(false)}
        transparent
      >
        <View style={{ justifyContent: "center" }}>
          <EmployeeAvatar uri={employeeInfo[itemId].image} size={250} />
        </View>
      </PopUpScreen>

      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <EmployeeAvatar
            uri={employeeInfo[itemId].image}
            size={100}
            onPress={() => setImageVisible(true)}
          />
        </View>
        <TextEmployeeInfo data={employeeInfo[itemId]} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
