import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DateComponet } from "../component/JobDetail";
import Geocoder from "react-native-geocoding";
import { Ionicons } from "@expo/vector-icons";
const LocationComponent = ({ location, style }) => {
  // Geocoder.init("AIzaSyAIJcF0gx85hBRcIs3wNVuZ6a7WQqgta20", {
  //   language: "th",
  // });
  const [place, setPlace] = React.useState("");
  // React.useEffect(() => {
  //   Geocoder.from(location)
  //     .then((json) => {
  //       var addressComponent = json.results[0].formatted_address.replace(
  //         "Unnamed Road,",
  //         ""
  //       );
  //       setPlace(addressComponent);
  //     })
  //     .catch((error) => console.warn(error));
  // }, []);
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
        color="#f3595a"
      />
      <Text style={{ marginLeft: 10 }}>
        {place.length <= 40 ? place : place.slice(0, 40) + "..."}
      </Text>
    </View>
  );
};

const BoxList = ({ title, startDate, finishDate, location, onPress }) => {
  return (
    <TouchableOpacity style={styles.boxlist_container} onPress={onPress}>
      <Text style={styles.boxlist_title}>{title}</Text>
      <DateComponet
        startDate={startDate}
        finishDate={finishDate}
        style={styles.boxlist_date}
      />
      <LocationComponent location={location} />
    </TouchableOpacity>
  );
};

const EmployeeListJob = ({ navigation, route }) => {
  const DataTemp = {
    title: "ABCDE",
    startDate: new Date(),
    finishDate: new Date(Date.now() + 60000),
    location: [10, 13],
    onPress: () => navigation.navigate(route.params.routeName),
  };
  return (
    <ScrollView
      style={[
        styles.container,
        {
          paddingTop:
            (route.params != undefined
              ? require("expo-constants").default.statusBarHeight
              : 0) + 15,
        },
      ]}
    >
      <View style={{ marginBottom: route.params != undefined ? 40 : 15 }}>
        <BoxList {...DataTemp} />
        <BoxList {...DataTemp} />
        <BoxList {...DataTemp} />
        <BoxList {...DataTemp} />
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
  },
  boxlist_title: {
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    borderBottomColor: "gray",
  },
  boxlist_date: {
    marginTop: 20,
    marginBottom: 5,
  },
});
