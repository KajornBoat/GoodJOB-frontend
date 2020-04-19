import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import PopUpScreen from "../component/PopUpScreen";
import HeaderWithBackArrow from "../component/HeaderWithBackArrow";
import EmployeeAvatar from "../component/EmployeeAvatar";
import TextEmployeeInfo from "../component/TextEmployeeInfo";

export default function IndividualEmployeeProfileScreen({ route, navigation }) {
  const employeeInfo = require("../assets/employeeInfo").employees;
  const [imageVisible, setImageVisible] = useState(false);

  const itemId = route.params.itemId;

  return (
    <View>
      <PopUpScreen
        visible={imageVisible}
        onRequestClose={() => setImageVisible(false)}
      >
        <View style={{ justifyContent: "center" }}>
          <HeaderWithBackArrow onPress={() => setImageVisible(false)} />
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
