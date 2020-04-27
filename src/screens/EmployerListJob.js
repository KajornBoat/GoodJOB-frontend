import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BoxList } from "./EmployeeListJob";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const BoxListWithEmployeeData = ({
  title,
  startDate,
  finishDate,
  place,
  onPress,
  onBottomLeftPress,
  onBottomRightPress,
  onBottomMiddlePress,
  mode,
}) => {
  return (
    <View style={styles.boxlist_container}>
      <BoxList
        title={title}
        startDate={startDate}
        finishDate={finishDate}
        place={place}
        onPress={onPress}
        style={styles.boxlist_container_edit}
      />
      {mode === "Manual" ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.boxlist_viewEmployee,
              { borderRightWidth: 0.25, borderBottomLeftRadius: 8 },
            ]}
            onPress={onBottomLeftPress}
          >
            <Text style={styles.boxlist_viewEmpolyee_text}>ข้อมูลลูกจ้าง</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.boxlist_viewEmployee,
              { borderLeftWidth: 0.25, borderBottomRightRadius: 8 },
            ]}
            onPress={onBottomRightPress}
          >
            <Text style={styles.boxlist_viewEmpolyee_text}>ข้อมูลผู้สมัคร</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[
            styles.boxlist_viewEmployee,
            { borderBottomRightRadius: 8, borderBottomLeftRadius: 8 },
          ]}
          onPress={onBottomMiddlePress}
        >
          <Text style={styles.boxlist_viewEmpolyee_text}>ข้อมูลลูกจ้าง</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const EmployerListJob = ({ navigation, route, job_lists, mode }) => {
  return (
    <ScrollView
      style={[
        styles.container,
        {
          paddingTop: require("expo-constants").default.statusBarHeight + 15,
        },
      ]}
    >
      <View style={{ marginBottom: 40 }}>
        {job_lists.map((value, index) => {
          return (
            value.mode == mode && (
              <BoxListWithEmployeeData
                key={index}
                title={value.title}
                startDate={value.start_date}
                finishDate={value.finish_date}
                place={value.place}
                onPress={() => {
                  navigation.navigate(route.params.routeName, {
                    itemId: value.id,
                  });
                }}
                key={index}
                {...value}
                onBottomMiddlePress={() =>
                  navigation.navigate("AutoEmployeeInfoScreen", {
                    itemId: value.id,
                  })
                }
                onBottomLeftPress={() =>
                  navigation.navigate("ManualEmployeeInfoScreen", {
                    itemId: value.id,
                  })
                }
                onBottomRightPress={() =>
                  navigation.navigate("ManualApplicantInfoScreen", {
                    itemId: value.id,
                  })
                }
              />
            )
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ({ navigation, route }) => {
  const job_lists = useSelector(({ jobEmployerReducer }) => jobEmployerReducer)
    .data;
  const [mode, setMode] = useState("Manual");

  const EmployerJob = () => (
    <EmployerListJob
      navigation={navigation}
      job_lists={job_lists}
      mode={mode}
      route={route}
    />
  );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EmployerListJob"
        component={EmployerJob}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={styles.mode_box}
              onPress={() => setMode(mode === "Manual" ? "Auto" : "Manual")}
            >
              <Text style={{ color: "white" }}>{mode} Search</Text>
            </TouchableOpacity>
          ),
          headerTitle: null,
          headerRight: () => (
            <TouchableOpacity
              style={styles.create_button}
              onPress={() => navigation.navigate("CreateJobScreen")}
            >
              <AntDesign
                name="pluscircle"
                size={24}
                style={{
                  color: "#0bb203",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#afd9ff",
    flex: 1,
    paddingHorizontal: 20,
  },
  boxlist_container: {
    borderRadius: 8,
    marginVertical: 15,
    elevation: 3,
  },
  boxlist_container_edit: {
    marginVertical: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 0,
  },
  boxlist_viewEmployee: {
    flex: 1,
    backgroundColor: "#527092",
    borderWidth: 0.5,
    paddingVertical: 10,
  },
  boxlist_viewEmpolyee_text: {
    color: "white",
    textAlign: "center",
  },
  mode_box: {
    marginHorizontal: 20,
    width: 113,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: "#527092",
  },
  create_button: {
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
