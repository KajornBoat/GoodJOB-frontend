import React from "react";
import { View } from "react-native";
import JobDetail, {
  FooterComment,
  MyPositionComponent,
} from "../component/JobDetail";
import { useSelector } from "react-redux";

const JobDetailAccept = ({ navigation, route }) => {
  const job = route.params.job;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 11 }}>
        <JobDetail job={job}>
          <MyPositionComponent job={job} />
        </JobDetail>
      </View>
      <FooterComment navigation={navigation} job={job} />
    </View>
  );
};

export default JobDetailAccept;
