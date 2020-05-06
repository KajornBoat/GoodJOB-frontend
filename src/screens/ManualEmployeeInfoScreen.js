import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Picker,
  ScrollView,
  Modal,
  ActivityIndicator
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import EmployeeProfile from "../component/EmployeeProfile";
import api from "../API/API";
import { setSelectEmployee } from "../redux/actions/jobemployer.action";

export default function ManualEmployeeInfoScreen({
  navigation,
  route,
  filter,
}) {
  const job = useSelector(
    ({ jobEmployerReducer }) => jobEmployerReducer
  ).lists.filter((value) => value._id == route.params.itemId)[0];
  const employee = job.acceptEmployee;
  const dispatch = useDispatch();
  if(employee){
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
          onPress={() => {
            api.job.employer.getEmployee(job._id,"selecting").then(employee => {
              const playload = {
                "employee" : employee,
                "jobID" : job._id
              }
              console.log("Load_SelectEmployee")
              dispatch(setSelectEmployee(playload))
            })
            navigation.navigate("SelectForInviteScreen", {
              filter: filter,
              itemId: route.params.itemId,
              nextRouts : "IndividualInviteEmployeeProfileScreen"
            })
          }}
          disabled={
            filter == "ตำแหน่ง" ||
            !(job.positions.filter(value => value.name == filter)[0].required > employee.filter(value => value.position == filter).length)
          }
        >
          <View
            style={{
              ...styles.footerView,
              backgroundColor:
                filter == "ตำแหน่ง" ||
                !(job.positions.filter(value => value.name == filter)[0].required > employee.filter(value => value.position == filter).length)
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
  else{
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
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
              image={value.user.photoURL}
              firstName={value.user.firstname}
              lastName={value.user.lastname}
              onPress={() => { 
                navigation.navigate("IndividualEmployeeProfileScreen", {
                  employeeInfo : value,
                  jobID : route.params.itemId,
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
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
