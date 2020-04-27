import React from "react";
import { View } from "react-native";
import JobDetail, { MyPositionComponent } from "../component/JobDetail";
import { useSelector } from "react-redux";

const JobDetailHistory = ({ route }) => {
  const job = useSelector(
    ({ jobHistoryReducer }) => jobHistoryReducer
  ).data.filter((value) => value.id == route.params.itemId)[0];
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 11 }}>
        <JobDetail job={job}>
          <MyPositionComponent job={job} />
        </JobDetail>
      </View>
    </View>
  );
};

export default JobDetailHistory;
