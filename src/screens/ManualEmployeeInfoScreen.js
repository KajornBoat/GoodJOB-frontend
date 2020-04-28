import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Picker,
  ScrollView,
  Modal,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import EmployeeProfile from "../component/EmployeeProfile";

export default function ManualEmployeeInfoScreen({
  navigation,
  route,
  filter,
}) {
  const job_data = useSelector(
    ({ jobEmployerReducer }) => jobEmployerReducer
  ).data.filter((value) => value.id == route.params.itemId)[0];
  const employee = job_data.myEmployee;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <ShowEmployeeProfileList
          employee={employee}
          filter={filter}
          navigation={navigation}
          route={route}
        />
      </ScrollView>
      <TouchableOpacity
        style={{ backgroundColor: "#afd9ff" }}
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate("SelectForInviteScreen", {
            filter: filter,
            itemId: route.params.itemId,
          })
        }
        disabled={
          filter == "ตำแหน่ง" ||
          job_data.posReq[job_data.position.indexOf(filter)] ==
            job_data.posHave[job_data.position.indexOf(filter)]
        }
      >
        <View
          style={{
            ...styles.footerView,
            backgroundColor:
              filter == "ตำแหน่ง" ||
              job_data.posReq[job_data.position.indexOf(filter)] ==
                job_data.posHave[job_data.position.indexOf(filter)]
                ? "#dfdede"
                : "#afd9ff",
          }}
        >
          <MaterialCommunityIcons
            name="account-plus"
            size={32}
            color={"white"}
          />
          <Text style={styles.footerText}>เชิญคนเพิ่ม</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const ShowEmployeeProfileList = ({ employee, route, filter, navigation }) => {
  return (
    <View style={styles.container}>
      {employee
        .filter((value) =>
          filter == "ตำแหน่ง" ? value.position != "" : value.position == filter
        )
        .map((value, index) => (
          <View key={index} style={{ width: "50%" }}>
            <EmployeeProfile
              key={index}
              image={value.image}
              firstName={value.firstName}
              lastName={value.lastName}
              onPress={() => {
                console.log("selected");
                navigation.navigate("IndividualEmployeeProfileScreen", {
                  parentItemId: route.params.itemId,
                  itemId: value.id,
                });
              }}
            />
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
  footerView: {
    height: 64,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#afd9ff",
  },
  footerText: {
    color: "white",
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
});
