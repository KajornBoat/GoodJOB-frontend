import React from "react";
import { View } from "react-native";
import JobDetail, { FooterComment, MyPositionComponent } from "./JobDetail";

const JobDetailAccept = () => {
  const job = {
    position: ["ช่างภาพ", "สตาฟ"],
    posWage: [1000, 500],
    posReq: [3, 2],
  };
  const position = "ช่างภาพ";
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 11 }}>
        <JobDetail>
          <MyPositionComponent position={position} job={job} />
        </JobDetail>
      </View>
      <FooterComment />
    </View>
  );
};

export default JobDetailAccept;
