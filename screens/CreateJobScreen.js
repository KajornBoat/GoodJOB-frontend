import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
  Alert,
  Picker,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
//https://docs.expo.io/versions/latest/sdk/map-view/
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Geocoder from "react-native-geocoding";
// Constant Import
import { JOB_POSITION, MONTH_TH } from "../assets/constValue";
// Create Job Component
const CreateJobScreen = ({ visible, onClosed }) => {
  // Data Job
  const [jobName, setJobName] = useState("");
  const [date, setDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);
  // Date
  const [datePick, setDatePick] = useState({
    show: false,
    value: null,
    mode: "date",
    onChange: null,
  });
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [newPosition, setNewPosition] = useState({
    position: "",
    amount: "",
    cost: "",
  });
  const [description, setDescription] = useState("");
  const [positions, setPositions] = useState([]);
  const [selectJob, setSelectJob] = useState([]);
  const [selectMode, setSelectMode] = useState("Manual Search");
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        Alert.alert(
          "Alert",
          "คุณต้องการออกจากหน้านี้หรือไม่",
          [
            { text: "CANCEL" },
            {
              text: "OK",
              onPress: onClosed,
            },
          ],
          { cancelable: true }
        );
      }}
    >
      <View>
        <KeyboardAvoidingView
          behavior="padding"
          //https://github.com/facebook/react-native/issues/11681
          keyboardVerticalOffset={-500}
          enabled
        >
          <ScrollView stickyHeaderIndices={[0]}>
            <HeaderBack onClickBackArrow={onClosed} />
            <View style={styles.container}>
              <Text style={[styles.titleFont, styles.childPadVer]}>
                ชื่องาน
              </Text>
              <TextInput
                style={[styles.inputStyle, styles.childPadVer]}
                value={jobName}
                onChangeText={setJobName}
                maxLength={40}
              />
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
              <Text style={[styles.titleFont, styles.childPadVer]}>วันที่</Text>
              <TouchableOpacity
                onPress={() =>
                  setDatePick({
                    show: true,
                    value: date,
                    mode: "date",
                    onChange: (value) => {
                      setDate(value);
                    },
                  })
                }
              >
                <Text
                  style={[
                    styles.inputStyle,
                    styles.childPadVer,
                    { textAlignVertical: "center" },
                  ]}
                >
                  {date &&
                    `${date.getDate()} ${MONTH_TH[date.getMonth()]} ${
                      date.getFullYear() + 543
                    }`}
                </Text>
                <AntDesign
                  name="down"
                  size={12}
                  style={{ ...styles.pickArrow, top: "25%" }}
                />
              </TouchableOpacity>
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
              <Text style={[styles.titleFont, styles.childPadVer]}>เวลา</Text>
              <View style={[{ flexDirection: "row" }, styles.childPadVer]}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "47.5%",
                    marginRight: "5%",
                  }}
                >
                  <Text
                    style={[
                      styles.titleFont,
                      {
                        textAlignVertical: "center",
                        width: "30%",
                        fontSize: 13,
                      },
                    ]}
                  >
                    ตั้งแต่
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setDatePick({
                        show: true,
                        value: startDate || Date.now(),
                        mode: "time",
                        onChange: (value) => {
                          setStartDate(value);
                        },
                      })
                    }
                    style={{ width: "70%" }}
                  >
                    <Text
                      style={[
                        styles.inputStyle,
                        { textAlignVertical: "center", textAlign: "center" },
                      ]}
                    >
                      {startDate &&
                        `${((num) => (num < 10 ? "0" + num : num))(
                          startDate.getHours()
                        )}:${((num) => (num < 10 ? "0" + num : num))(
                          startDate.getMinutes()
                        )} `}
                    </Text>
                    <AntDesign
                      name="down"
                      size={12}
                      style={{ ...styles.pickArrow, top: "33%" }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "47.5%",
                  }}
                >
                  <Text
                    style={[
                      styles.titleFont,
                      {
                        textAlignVertical: "center",
                        width: "30%",
                        fontSize: 13,
                      },
                    ]}
                  >
                    จนถึง
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setDatePick({
                        show: true,
                        value: finishDate || Date.now(),
                        mode: "time",
                        onChange: (value) => {
                          setFinishDate(value);
                        },
                      })
                    }
                    style={{ width: "70%" }}
                  >
                    <Text
                      style={[
                        styles.inputStyle,
                        { textAlignVertical: "center", textAlign: "center" },
                      ]}
                    >
                      {finishDate &&
                        `${((num) => (num < 10 ? "0" + num : num))(
                          finishDate.getHours()
                        )}:${((num) => (num < 10 ? "0" + num : num))(
                          finishDate.getMinutes()
                        )} `}
                    </Text>
                    <AntDesign
                      name="down"
                      size={12}
                      style={{ ...styles.pickArrow, top: "33%" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {datePick.show && (
                <DateTimePicker
                  value={datePick.value || Date.now()}
                  mode={datePick.mode}
                  is24Hour={true}
                  display="default"
                  onChange={(event, date) => {
                    setDatePick({ ...datePick, show: false });
                    date && datePick.onChange(date);
                  }}
                />
              )}
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
              <Text style={[styles.titleFont, styles.childPadVer]}>
                สถานที่
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowMap(true);
                }}
              >
                <Text
                  style={[
                    styles.inputStyle,
                    styles.childPadVer,
                    { textAlignVertical: "center" },
                  ]}
                >
                  {address.length > 40 ? address.slice(0, 39) + "..." : address}
                </Text>
                <Modal
                  visible={showMap}
                  onRequestClose={() => {
                    setShowMap(false);
                  }}
                  animationType="fade"
                >
                  <Map
                    coordinate={location}
                    onMark={setLocation}
                    nameAddress={address}
                    setNameAddress={setAddress}
                  />
                </Modal>
              </TouchableOpacity>
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
              <Text style={[styles.childPadVer, styles.titleFont]}>
                รายละเอียด
              </Text>
              <TextInput
                style={[
                  styles.inputStyle,
                  styles.childPadVer,
                  { height: 140, textAlignVertical: "top" },
                ]}
                maxLength={500}
                multiline
                numberOfLines={8}
                value={description}
                onChangeText={setDescription}
              />
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
              <Text style={[styles.childPadVer, styles.titleFont]}>
                ตำแหน่งงาน
              </Text>
              <View style={[styles.childPadVer, { flexDirection: "row" }]}>
                <Text
                  style={[
                    styles.titleFont,
                    { width: "60%", fontSize: 13, paddingLeft: "7%" },
                  ]}
                >
                  ตำแหน่ง
                </Text>
                <Text
                  style={[
                    styles.titleFont,
                    { width: "20%", fontSize: 13, textAlign: "center" },
                  ]}
                >
                  จำนวน
                </Text>
                <Text
                  style={[
                    styles.titleFont,
                    { width: "20%", fontSize: 13, textAlign: "right" },
                  ]}
                >
                  ค่าจ้าง/คน
                </Text>
              </View>
              {positions.map((value, index) => (
                <View
                  key={index}
                  style={
                    ([styles.childPadVer],
                    {
                      alignItems: "center",
                      flexDirection: "row",
                    })
                  }
                >
                  <TouchableOpacity
                    style={{
                      height: 18,
                      marginRight: "2%",
                      marginLeft: "0.5%",
                    }}
                    onPress={() => {
                      setPositions(positions.filter((_, i) => i !== index));
                      setSelectJob(selectJob.filter((_, i) => i !== index));
                    }}
                  >
                    <Ionicons
                      name="md-trash"
                      size={20}
                      style={{
                        color: "#f3595a",
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      height: 35,
                      textAlignVertical: "center",
                      width: "50%",
                      marginRight: "2%",
                    }}
                  >
                    {value.position}
                  </Text>
                  <Text
                    style={[
                      {
                        width: "19%",
                        marginRight: "1%",
                        textAlign: "right",
                        paddingHorizontal: "2%",
                      },
                    ]}
                  >
                    {value.amount}
                  </Text>
                  <Text
                    style={[
                      {
                        width: "19%",
                        marginLeft: "1%",
                        textAlign: "right",
                        paddingHorizontal: "1%",
                      },
                    ]}
                  >
                    {value.cost}฿
                  </Text>
                </View>
              ))}
              <View
                style={[
                  styles.childPadVer,
                  { alignItems: "center", flexDirection: "row" },
                ]}
              >
                <TouchableOpacity
                  style={{
                    height: 16,
                    marginRight: "2%",
                  }}
                  onPress={() => {
                    let msg = "";
                    msg +=
                      newPosition.position == "" ? "ตำแหน่งไม่ถูกต้อง\n" : "";
                    msg +=
                      Number(newPosition.amount) > 0 ? "" : "จำนวนไม่ถูกต้อง\n";
                    msg +=
                      newPosition != "" && Number(newPosition.cost) >= 0
                        ? ""
                        : "ค่าจ้างไม่ถูกต้อง\n";
                    if (msg == "") {
                      setPositions([
                        ...positions,
                        {
                          position: newPosition.position,
                          amount: Number(newPosition.amount),
                          cost: Number(newPosition.cost),
                        },
                      ]);
                      setSelectJob([...selectJob, newPosition.position]);
                      setNewPosition({
                        position: "",
                        amount: "",
                        cost: "",
                      });
                    } else {
                      alert(msg);
                    }
                  }}
                >
                  <AntDesign
                    name="pluscircle"
                    size={16}
                    style={{
                      color: "#13b319",
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={[
                    styles.pickerBorder,
                    { width: "50%", marginRight: "2%" },
                  ]}
                >
                  <Picker
                    selectedValue={newPosition.position}
                    style={styles.pickerInBox}
                    onValueChange={(itemValue, itemIndex) => {
                      setNewPosition({ ...newPosition, position: itemValue });
                    }}
                  >
                    <Picker.Item
                      key={0}
                      label={"          "}
                      value={""}
                      color="gray"
                    />
                    {JOB_POSITION.filter(
                      (value) => selectJob.indexOf(value) == -1
                    ).map((value, index) => (
                      <Picker.Item
                        key={index + 1}
                        label={value}
                        value={value}
                      />
                    ))}
                  </Picker>
                  <AntDesign name="down" size={12} style={styles.pickArrow} />
                </View>
                <TextInput
                  style={[
                    styles.inputStyle,
                    { width: "19%", marginRight: "1%", textAlign: "right" },
                  ]}
                  value={newPosition.amount}
                  onChangeText={(v) => {
                    setNewPosition({ ...newPosition, amount: v });
                  }}
                  maxLength={2}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[
                    styles.inputStyle,
                    { width: "19%", marginLeft: "1%", textAlign: "right" },
                  ]}
                  value={newPosition.cost}
                  onChangeText={(v) => {
                    setNewPosition({ ...newPosition, cost: v });
                  }}
                  maxLength={4}
                  keyboardType="numeric"
                />
              </View>
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
              <Text style={[styles.titleFont, styles.childPadVer]}>
                รูปแบบการค้นหาลูกจ้าง
              </Text>
              <View style={[{ flexDirection: "row" }, styles.childPadVer]}>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      selectMode == "Manual Search" ? "#567091" : "white",
                    borderColor:
                      selectMode == "Manual Search" ? "#567091" : "black",
                    marginRight: "1%",
                    ...styles.selectMode,
                  }}
                  onPress={() => {
                    setSelectMode("Manual Search");
                  }}
                >
                  <Text
                    style={[
                      styles.textMode,
                      {
                        color:
                          selectMode == "Manual Search" ? "white" : "black",
                      },
                    ]}
                  >
                    Manual Search
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      selectMode == "Auto Search" ? "#567091" : "white",
                    borderColor:
                      selectMode == "Auto Search" ? "#567091" : "black",
                    marginLeft: "1%",
                    ...styles.selectMode,
                  }}
                  onPress={() => {
                    setSelectMode("Auto Search");
                  }}
                >
                  <Text
                    style={[
                      styles.textMode,
                      ,
                      {
                        color: selectMode == "Auto Search" ? "white" : "black",
                      },
                    ]}
                  >
                    Auto Search
                  </Text>
                </TouchableOpacity>
              </View>
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
              <TextList positions={positions} />
            </View>
            <Footer
              post={() => {
                let msg = "";
                let sd, fd;
                msg += jobName === "" ? "กรุณากรอกชื่องาน\n" : "";
                msg += date == null ? "กรุณาเลือกวันที่\n" : "";
                msg += startDate == null ? "กรุณาเลือกเวลาเริ่มงาน\n" : "";
                msg += finishDate == null ? "กรุณาเลือกเวลาสิ้นสุดงาน\n" : "";
                if (date != null && startDate != null && finishDate != null) {
                  msg += date > Date.now() ? "" : "วันที่ไม่ถูกต้อง";
                  sd = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    startDate.getHours(),
                    startDate.getMinutes()
                  );
                  fd = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    finishDate.getHours(),
                    finishDate.getMinutes()
                  );
                  msg += fd <= sd ? "เวลางานไม่ถูกต้อง\n" : "";
                }
                msg += location == null ? "กรุณาเลือกสถานที่\n" : "";
                msg +=
                  positions.length > 0
                    ? ""
                    : "กรุณาเลือกตำแหน่งงานที่ต้องการจ้าง\n";
                if (msg != "") {
                  alert(msg);
                } else {
                  console.log("Saving...");
                  let job = {
                    title: jobName,
                    description: description,
                    start_date: sd,
                    finish_date: fd,
                    location: [location.latitude, location.longitude],
                    mode: selectMode,
                    position: positions.map((value) => value.position),
                    posWage: positions.map((value) => value.cost),
                    posReq: positions.map((value) => value.amount),
                  };
                  console.log(JSON.stringify(job));
                  onClosed();
                }
              }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const HeaderBack = ({ onClickBackArrow }) => {
  return (
    <View style={{ ...styles.header, alignItems: "flex-start" }}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Alert",
            "คุณต้องการออกจากหน้านี้หรือไม่",
            [
              { text: "CANCEL" },
              {
                text: "OK",
                onPress: onClickBackArrow,
              },
            ],
            { cancelable: true }
          );
        }}
      >
        <Ionicons name="ios-arrow-round-back" size={32} />
      </TouchableOpacity>
    </View>
  );
};

const Map = (props) => {
  Geocoder.init("AIzaSyAIJcF0gx85hBRcIs3wNVuZ6a7WQqgta20", { language: "th" });
  const { width, height } = Dimensions.get("window");
  const [region, setRegion] = useState({
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0022 * (width / height),
  });
  const [marker, setMarker] = useState(props.coordinate);

  React.useEffect(() => {
    let mounted = true;
    if (props.coordinate == null) {
      (async () => {
        if (
          (await Permissions.askAsync(Permissions.LOCATION)).status == "granted"
        ) {
          let location = await Location.getCurrentPositionAsync({});
          if (mounted)
            setRegion({
              ...region,
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
        }
      })();
    } else {
      setRegion({
        ...region,
        latitude: props.coordinate.latitude,
        longitude: props.coordinate.longitude,
      });
    }
    console.log(marker);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <MapView
        provider={props.provider}
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={(e) => {
          setMarker(e.nativeEvent.coordinate);
          props.onMark({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
          Geocoder.from(e.nativeEvent.coordinate)
            .then((json) => {
              var addressComponent = json.results[0].formatted_address.replace(
                "Unnamed Road,",
                ""
              );
              props.setNameAddress(addressComponent);
            })
            .catch((error) => console.warn(error));
        }}
        onPoiClick={(e) => {
          setMarker(e.nativeEvent.coordinate);
          props.onMark({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
          let name = e.nativeEvent.name
            .split("\n")
            .reduce(
              (prev, curr) =>
                /[\w]/.exec(curr) ? prev : prev + (prev && " ") + curr,
              ""
            );
          Geocoder.from(e.nativeEvent.coordinate)
            .then((json) => {
              var addressComponent = json.results[0].formatted_address.replace(
                "Unnamed Road,",
                ""
              );
              props.setNameAddress(
                name.replace("\n", " ") + " " + addressComponent
              );
            })
            .catch((error) => console.warn(error));
        }}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>
      <Text
        style={{
          position: "absolute",
          top: 0,
          width: "90%",
          backgroundColor: "#fffc",
          borderRadius: 5,
          padding: 10,
          margin: 5,
        }}
      >
        {props.nameAddress}
      </Text>
      <TouchableOpacity
        style={{ width: "50%" }}
        onPress={() => {
          setMarker(null);
          props.onMark(null);
          props.setNameAddress("");
        }}
      >
        <Text
          style={{
            margin: 20,
            padding: 10,
            backgroundColor: "#fffc",
            textAlign: "center",
            borderRadius: 20,
          }}
        >
          CLEAR
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const TextList = ({ positions }) => {
  const SubList = ({ title, cal }) => (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "60%" }}>
        <Text style={[styles.titleFont, { fontSize: 12 }]}>{title}</Text>
      </View>
      <View style={{ width: "100%" }}>
        {positions.map((value, index) => {
          return (
            <View style={{ width: "100%", flexDirection: "row" }} key={index}>
              <View
                style={{
                  width: "20%",
                  marginBottom: 3,
                }}
              >
                <Text style={styles.listFont}>
                  {value.amount + " x " + cal(value.cost) + "฿"}
                </Text>
              </View>
              <View
                style={{
                  width: "20%",
                  marginLeft: "1%",
                }}
              >
                <Text style={styles.listFont}>
                  {value.amount * cal(value.cost) + "฿"}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
  return (
    <View style={{ width: "100%" }}>
      <SubList title="ค่าจ้างรวม" cal={(value) => value} />
      <Text
        style={[
          styles.listFont,
          {
            textAlign: "right",
            fontWeight: "bold",
            color: "red",
            width: "101%",
            marginBottom: 10,
          },
        ]}
      >
        {positions.reduce((prev, curr) => prev + curr.amount * curr.cost, 0) +
          "฿"}
      </Text>
      <SubList
        title="ค่าจ้างมัดจำ (คิด 30%)"
        cal={(value) => Math.ceil((value * 30) / 100)}
      />
      <Text
        style={[
          styles.listFont,
          {
            textAlign: "right",
            fontWeight: "bold",
            width: "101%",
            marginBottom: 10,
          },
        ]}
      >
        {positions.reduce(
          (prev, curr) =>
            prev + curr.amount * Math.ceil((curr.cost * 30) / 100),
          0
        ) + "฿"}
      </Text>
      <SubList
        title="ค่าจ้างส่วนที่เหลือ (จ่ายก่อนเริ่มงาน)"
        cal={(value) => Math.floor((value * 70) / 100)}
      />
      <Text
        style={[
          styles.listFont,
          {
            textAlign: "right",
            fontWeight: "bold",
            width: "101%",
            marginBottom: 10,
          },
        ]}
      >
        {positions.reduce(
          (prev, curr) =>
            prev + curr.amount * Math.floor((curr.cost * 70) / 100),
          0
        ) + "฿"}
      </Text>
    </View>
  );
};

const Footer = ({ post }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        width: "100%",
        backgroundColor: "#b2d9fe",
      }}
      onPress={post}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
        ประกาศงาน
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 10,
  },
  header: {
    height: 40,
    width: "100%",
    borderBottomWidth: 0.5,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "flex-end",
  },
  titleFont: {
    color: "#567091",
  },
  childPadVer: {
    marginBottom: 10,
  },
  inputStyle: {
    borderWidth: 0.5,
    height: 35,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  pickerBorder: { borderWidth: 0.5, borderRadius: 5 },
  pickerInBox: {
    height: 35,
    width: "109%",
    backgroundColor: "transparent",
    color: "black",
    transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
    left: "-3%",
  },
  selectMode: {
    width: "49%",
    paddingVertical: 7,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  textMode: {
    textAlign: "center",
  },
  pickArrow: { position: "absolute", right: 5, top: "33%" },
  listFont: { fontSize: 12, textAlign: "right" },
});
export default CreateJobScreen;
