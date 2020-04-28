import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DateComponet } from "../component/JobDetail";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const LocationComponent = ({ place, style }) => {
  return (
    <View
      style={{
        marginHorizontal: "0.5%",
        flexGrow: 1,
        flexDirection: "row",
        marginBottom: 10,
        ...style,
      }}
    >
      <Ionicons
        name="md-pin"
        size={18}
        style={{ textAlignVertical: "top" }}
        color="#f65a5a"
      />
      <Text style={{ marginLeft: 10 }}>
        {place.length <= 40 ? place : place.slice(0, 40) + "..."}
      </Text>
    </View>
  );
};

export const BoxList = ({
  title,
  startDate,
  finishDate,
  place,
  onPress,
  style = {},
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.boxlist_container, ...style }}
      onPress={onPress}
    >
      <Text style={styles.boxlist_title}>{title}</Text>
      <DateComponet
        startDate={startDate}
        finishDate={finishDate}
        style={styles.boxlist_date}
      />
      <LocationComponent place={place} />
    </TouchableOpacity>
  );
};

const EmployeeListJob = ({ navigation, route, filter }) => {
  const jobs = useSelector(
    ({
      jobAcceptReducer,
      jobInviteReducer,
      jobStatusReducer,
      jobApplyReducer,
      jobHistoryReducer,
    }) => {
      switch (route.params.jobs) {
        case "jobAcceptReducer":
          return jobAcceptReducer;
        case "jobInviteReducer":
          return jobInviteReducer;
        case "jobStatusReducer":
          return jobStatusReducer;
        case "jobApplyReducer":
          return jobApplyReducer;
        case "jobHistoryReducer":
          return jobHistoryReducer;
        default:
          break;
      }
    }
  ).data;

  const job_lists =
    filter === undefined
      ? jobs
      : jobs.filter((job) => {
          if (filter === undefined) return true;
          else
            return (
              filter.filter((select) => job.position.indexOf(select) > -1)
                .length > 0
            );
        });

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
        {job_lists.map((value, index) => (
          <BoxList
            key={index}
            title={value.title}
            startDate={value.start_date}
            finishDate={value.finish_date}
            place={value.place}
            onPress={() => {
              navigation.navigate(route.params.routeName, { itemId: value.id });
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default EmployeeListJob;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#afd9ff",
    flex: 1,
    paddingHorizontal: 20,
  },
  boxlist_container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginVertical: 15,
    elevation: 3,
  },
  boxlist_title: {
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    borderBottomColor: "#aaa",
  },
  boxlist_date: {
    marginTop: 20,
    marginBottom: 5,
  },
});
