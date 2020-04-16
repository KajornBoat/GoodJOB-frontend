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
import Geocoder from "react-native-geocoding";
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

const LocationComponent = ({ location }) => {
  Geocoder.init("AIzaSyAIJcF0gx85hBRcIs3wNVuZ6a7WQqgta20", { language: "th" });
  const [showMap, setShowMap] = useState(false);
  const [name, setName] = useState("");
  const [marker, setMarker] = useState();
  const { width, height } = Dimensions.get("window");
  const [region, setRegion] = useState();
  useEffect(() => {
    setRegion({
      latitude: location[0],
      longitude: location[1],
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0022 * (width / height),
    });
    setMarker({ latitude: location[0], longitude: location[1] });
    Geocoder.from(location)
      .then((json) => {
        var addressComponent = json.results[0].formatted_address.replace(
          "Unnamed Road,",
          ""
        );
        setName(addressComponent);
      })
      .catch((error) => console.warn(error));
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
            color="#f3595a"
          />
          <Text style={{ marginLeft: 10 }}>
            {name.length <= 40 ? name : name.slice(0, 40) + "..."}
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
          {name}
        </Text>
      </Modal>
    </View>
  );
};

const JobDetail = ({ children }) => {
  const [title, setTitle] = useState("ABC");
  const [url, setUrl] = useState("#");
  const [name, setName] = useState("A");
  const [startDate, setStartTime] = useState(new Date());
  const [finishDate, setFinishTime] = useState(new Date());
  const [location, setLocation] = useState([30, 120]);
  const [description, setDescription] = useState("AV");

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <HeaderComponent title={title} url={url} name={name} />
      <View style={styles.container}>
        <Text
          style={[styles.titleFont, { textAlign: "center", marginBottom: 20 }]}
          children="รายละเอียด"
        />
        <DateComponet startDate={startDate} finishDate={finishDate} />
        <LocationComponent location={location} />
        <Text style={{ lineHeight: 20, marginBottom: 10 }}>{description}</Text>
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
