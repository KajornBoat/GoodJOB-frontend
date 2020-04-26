import React from "react";
import { View } from "react-native";
import JobDetail, { MyPositionComponent } from "../component/JobDetail";

const JobDetailHistory = ({ route }) => {
  const { job } = route.params;
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
