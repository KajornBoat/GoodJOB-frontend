import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { DateComponet } from "../component/JobDetail";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import api from "../API/API";

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
  const [jobs, setJobs] = useState();
  if (jobs == undefined) {
    api.job.employee.getJobs(route.params.jobs).then((job) => {
      console.log("Load : ", route.params.routeName);
      setJobs(job);
    });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      api.job.employee.getJobs(route.params.jobs).then((job) => {
        console.log("Reload : ", route.params.routeName);
        setJobs(job);
      });
    });
    return unsubscribe;
  }, [navigation]);
  if (jobs !== undefined) {
    console.log("Update");
    const job_lists =
      filter == undefined
        ? jobs
        : jobs.filter((job) => {
            if (filter === undefined) return true;
            else {
              console.log(job.tags);
              return (
                filter.filter((select) => job.tags.indexOf(select) > -1)
                  .length > 0
              );
            }
          });
    const job_list = Object.keys(job_lists);
    if (job_list.length > 0) {
      return (
        <ScrollView
          style={[
            styles.container,
            {
              paddingTop:
                require("expo-constants").default.statusBarHeight + 15,
            },
          ]}
        >
          <View style={{ marginBottom: 40 }}>
            {job_lists.map((value, index) => (
              <BoxList
                key={index}
                title={value.title}
                startDate={new Date(value.start_date)}
                finishDate={new Date(value.finish_date)}
                place={value.location.nameAddress}
                onPress={() => {
                  navigation.navigate(route.params.routeName, {
                    job: value,
                    setJob: setJobs,
                  });
                }}
              />
            ))}
          </View>
        </ScrollView>
      );
    } else {
      return <View style={styles.loading}></View>;
    }
  } else {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
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
  loading: {
    backgroundColor: "#afd9ff",
    flex: 1,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
