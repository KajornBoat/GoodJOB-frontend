import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";

const HeaderComponent = ({ title, url, name }) => (
  <View
    style={[styles.container, { borderBottomWidth: 0.5, borderColor: "#aaa" }]}
  >
    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
      {title}
    </Text>
    <View style={{ flexDirection: "row" }}>
      <Avatar
        source={url != "" ? { uri: url } : require("../assets/รูปนายจ้าง.png")}
        size="medium"
        rounded
      />
      <Text style={{ marginLeft: 15, textAlignVertical: "center" }}>
        {name}
      </Text>
    </View>
  </View>
);

export const DateComponet = ({ startDate, finishDate, style }) => (
  <View style={style}>
    <View style={{ flexDirection: "row" }}>
      <Feather name="clock" size={16} style={{ textAlignVertical: "top" }} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ marginBottom: 5 }}>
          {`${startDate.getDate()} ${
            require("../assets/constValue").MONTH_TH[startDate.getMonth()]
          } ${startDate.getFullYear() + 543}`}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          {startDate &&
            `${((num) => (num < 10 ? "0" + num : num))(
              startDate.getHours()
            )}:${((num) => (num < 10 ? "0" + num : num))(
              startDate.getMinutes()
            )} `}
          {" - "}
          {finishDate &&
            `${((num) => (num < 10 ? "0" + num : num))(
              finishDate.getHours()
            )}:${((num) => (num < 10 ? "0" + num : num))(
              finishDate.getMinutes()
            )} `}
          {" น."}
        </Text>
      </View>
    </View>
  </View>
);

const LocationComponent = ({ location, place }) => {
  const [showMap, setShowMap] = useState(false);
  const marker = { latitude: location[0], longitude: location[1] };
  const { width, height } = Dimensions.get("window");
  const [region, setRegion] = useState();
  useEffect(() => {
    setRegion({
      latitude: location[0],
      longitude: location[1],
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0022 * (width / height),
    });
  }, []);
  return (
    <View>
      <View>
        <TouchableOpacity
          style={{
            marginHorizontal: "0.5%",
            flexGrow: 1,
            flexDirection: "row",
            marginBottom: 15,
          }}
          onPress={() => setShowMap(true)}
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
          <AntDesign
            name="right"
            size={12}
            style={{ ...styles.pickArrow, top: "33%" }}
          />
        </TouchableOpacity>
      </View>
      <Modal visible={showMap} onRequestClose={() => setShowMap(false)}>
        <MapView
          provider="google"
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          <Marker coordinate={marker} />
        </MapView>
        <Text
          style={{
            position: "absolute",
            top: 0,
            width: "90%",
            backgroundColor: "#fffc",
            borderRadius: 5,
            padding: 10,
            margin: "5%",
          }}
        >
          {place}
        </Text>
      </Modal>
    </View>
  );
};

const JobDetail = ({ children, job }) => {
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <HeaderComponent
        title={job.title}
        url={job.owner.photoURL}
        name={job.owner.firstname + "  " + job.owner.lastname}
      />
      <View style={styles.container}>
        <Text
          style={[styles.titleFont, { textAlign: "center", marginBottom: 20 }]}
          children="รายละเอียด"
        />
        <DateComponet
          startDate={new Date(job.start_date)}
          finishDate={new Date(job.finish_date)}
        />
        <LocationComponent
          location={job.location.coordinates}
          place={job.location.nameAddress}
        />
        <Text style={{ lineHeight: 20, marginBottom: 10 }}>
          {job.description}
        </Text>
      </View>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  titleFont: {
    color: "#567091",
    fontSize: 16,
  },
  pickArrow: { position: "absolute", right: 5, top: "33%" },
});

export default JobDetail;

export const FooterComment = ({ job, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#afd9ff",
      }}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("Comment")}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        ความคิดเห็น
      </Text>
    </TouchableOpacity>
  );
};

export const MyPositionComponent = ({ job }) => (
  <View
    style={{
      marginHorizontal: 10,
      marginBottom: 10,
      paddingHorizontal: 15,
      marginTop: 20,
      paddingBottom: 15,
    }}
  >
    <Text
      style={[styles.titleFont, { textAlign: "center", marginBottom: 20 }]}
      children="ตำแหน่งงาน"
    />
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", marginBottom: 20 }}>ตำแหน่ง</Text>
        <Text>{job.position}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", marginBottom: 20 }}>ค่าจ้าง</Text>
        <Text>{job.wage}฿</Text>
      </View>
    </View>
  </View>
);
