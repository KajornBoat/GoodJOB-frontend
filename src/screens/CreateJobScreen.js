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
  Picker,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
//https://docs.expo.io/versions/latest/sdk/map-view/
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Geocoder from "react-native-geocoding";
import PopUpScreen from "../component/PopUpScreen";
// Constant Import
import { JOB_POSITION, MONTH_TH } from "../assets/constValue";
import api from "../API/API";
import { setJobEmployer } from "../redux/actions/jobemployer.action";
import { useDispatch } from "react-redux";

const TextInputComponent = ({
  value,
  onSaved,
  title,
  maxLength,
  keyboardType,
}) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState(value);

  return (
    <View>
      <Text style={[styles.labelFont, styles.gapVertical]}>{title}</Text>
      <TouchableOpacity onPress={() => setActive(true)}>
        <Text
          style={[
            styles.inputContainer,
            styles.gapVertical,
            { color: value ? "black" : "gray" },
          ]}
        >
          {value || "กรุณาใส่" + title}
        </Text>
      </TouchableOpacity>
      <PopUpScreen
        visible={active}
        onRequestClose={() => {
          setActive(false);
          setText(value);
        }}
      >
        <View style={styles.popUpContainer}>
          <Text style={[styles.gapVertical, styles.labelFont]}>{title}</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            style={[
              styles.inputContainer,
              styles.gapVertical,
              { borderColor: "gray", borderBottomWidth: 0.5 },
            ]}
            placeholder={"กรุณาใส่" + title}
            maxLength={maxLength}
            keyboardType={keyboardType}
          />
          <View
            style={[
              styles.gapVertical,
              { flexDirection: "row", justifyContent: "flex-end" },
            ]}
          >
            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={() => {
                setActive(false);
                setText(value);
              }}
            >
              <Text>ยกเลิก</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={() => {
                setActive(false);
                onSaved(text);
              }}
            >
              <Text>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopUpScreen>
    </View>
  );
};

const DateInputComponent = ({
  date,
  setDate,
  startDate,
  setStartDate,
  finishDate,
  setFinishDate,
}) => {
  const [datePick, setDatePick] = useState({
    show: false,
    value: null,
    mode: "date",
    onChange: null,
  });
  return (
    <View>
      <Text style={[styles.labelFont, styles.gapVertical]}>วันที่</Text>
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
            styles.inputContainer,
            styles.gapVertical,
            { textAlignVertical: "center", color: date ? "black" : "gray" },
          ]}
        >
          {date
            ? `${date.getDate()} ${MONTH_TH[date.getMonth()]} ${
                date.getFullYear() + 543
              }`
            : "กรุณาเลือกวันที่เริ่มงาน"}
        </Text>
        <AntDesign
          name="down"
          size={12}
          style={{ ...styles.pickArrow, top: 12.5 }}
        />
      </TouchableOpacity>
      <Text style={[styles.labelFont, styles.gapVertical]}>
        เวลาที่เริ่มงาน-เลิกเวลา
      </Text>
      <View style={[{ flexDirection: "row" }, styles.gapVertical]}>
        <View
          style={{
            flexDirection: "row",
            width: "47.5%",
            marginRight: "5%",
          }}
        >
          <Text
            style={[
              styles.labelFont,
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
                styles.inputContainer,
                { textAlignVertical: "center" },
                startDate
                  ? {
                      textAlign: "center",
                      color: "black",
                    }
                  : {
                      textAlign: "left",
                      color: "gray",
                      fontSize: 12,
                    },
              ]}
            >
              {startDate
                ? `${((num) => (num < 10 ? "0" + num : num))(
                    startDate.getHours()
                  )}:${((num) => (num < 10 ? "0" + num : num))(
                    startDate.getMinutes()
                  )} `
                : "กรุณาเลือกเวลา"}
            </Text>
            <AntDesign
              name="down"
              size={15}
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
              styles.labelFont,
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
                styles.inputContainer,
                { textAlignVertical: "center" },
                finishDate
                  ? {
                      textAlign: "center",
                      color: "black",
                    }
                  : {
                      textAlign: "left",
                      color: "gray",
                      fontSize: 12,
                    },
              ]}
            >
              {finishDate
                ? `${((num) => (num < 10 ? "0" + num : num))(
                    finishDate.getHours()
                  )}:${((num) => (num < 10 ? "0" + num : num))(
                    finishDate.getMinutes()
                  )} `
                : "กรุณาเลือกเวลา"}
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

const MapComponent = ({ location, setLocation ,address ,setAddress}) => {
  const [showMap, setShowMap] = useState(false);
  return (
    <View>
      <Text style={[styles.labelFont, styles.gapVertical]}>สถานที่</Text>
      <TouchableOpacity
        onPress={() => {
          setShowMap(true);
        }}
      >
        <Text
          style={[
            styles.inputContainer,
            styles.gapVertical,
            { textAlignVertical: "center", color: address ? "black" : "gray" },
          ]}
        >
          {address === ""
            ? "กรุณาใส่สถานที่"
            : address.length > 40
            ? address.slice(0, 39) + "..."
            : address}
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
    </View>
  );
};

const TextAreaComponent = ({ title, value, maxLength, height, onSaved }) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState(value);
  return (
    <View>
      <Text style={[styles.labelFont, styles.gapVertical]}>{title}</Text>
      <TouchableOpacity onPress={() => setActive(true)}>
        <Text
          style={[
            styles.inputContainer,
            styles.gapVertical,
            {
              borderWidth: 0.5,
              height: 100,
              textAlignVertical: "top",
              padding: 5,
              borderRadius: 5,
              height: height,
              color: value ? "black" : "gray",
            },
          ]}
        >
          {value || "กรุณาใส่" + title}
        </Text>
      </TouchableOpacity>
      <PopUpScreen
        visible={active}
        onRequestClose={() => {
          setActive(false);
          setText(value);
        }}
      >
        <View style={styles.popUpContainer}>
          <Text style={[styles.labelFont, styles.gapVertical]}>{title}</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            style={[
              styles.gapVertical,
              {
                borderColor: "gray",
                textAlignVertical: "top",
                padding: 5,
                borderRadius: 5,
                borderWidth: 0.5,
                height: height,
              },
            ]}
            placeholder={"กรุณาใส่" + title}
            maxLength={maxLength}
            multiline
          />
          <View
            style={[
              styles.gapVertical,
              { flexDirection: "row", justifyContent: "flex-end" },
            ]}
          >
            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={() => {
                setActive(false);
                setText(value);
              }}
            >
              <Text>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={async () => {
                setActive(false);
                onSaved(text);
              }}
            >
              <Text>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopUpScreen>
    </View>
  );
};

const TiltePosition = () => (
  <View>
    <Text style={[styles.gapVertical, styles.labelFont]}>ตำแหน่งงาน</Text>
    <View style={[styles.gapVertical, { flexDirection: "row" }]}>
      <Text
        style={[
          styles.labelFont,
          { width: "60%", fontSize: 13, paddingLeft: "7%" },
        ]}
      >
        ตำแหน่ง
      </Text>
      <Text
        style={[
          styles.labelFont,
          { width: "20%", fontSize: 13, textAlign: "center" },
        ]}
      >
        จำนวน
      </Text>
      <Text
        style={[
          styles.labelFont,
          { width: "20%", fontSize: 13, textAlign: "right" },
        ]}
      >
        ค่าจ้าง/คน
      </Text>
    </View>
  </View>
);

const PostitionSeletion = ({
  value,
  index,
  positions,
  setPositions,
  selectJob,
  setSelectJob,
}) => (
  <View
    style={{
      alignItems: "center",
      flexDirection: "row",
    }}
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
          color: "#f65a5a",
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
      {value.name}
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
      {value.required}
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
      {value.wage}฿
    </Text>
  </View>
);

const ModeComponent = ({ selectMode, setSelectMode }) => (
  <View style={{ marginVertical: 15 }}>
    <Text style={[styles.labelFont, styles.gapVertical]}>
      รูปแบบการค้นหาลูกจ้าง
    </Text>
    <View style={[{ flexDirection: "row" }, styles.gapVertical]}>
      <TouchableOpacity
        style={{
          backgroundColor: selectMode == "manual" ? "#567091" : "white",
          borderColor: selectMode == "manual" ? "#567091" : "gray",
          marginRight: "1%",
          ...styles.selectMode,
        }}
        onPress={() => {
          setSelectMode("manual");
        }}
      >
        <Text
          style={[
            styles.textMode,
            {
              color: selectMode == "manual" ? "white" : "black",
            },
          ]}
        >
          Manual Search
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: selectMode == "auto" ? "#567091" : "white",
          borderColor: selectMode == "auto" ? "#567091" : "gray",
          marginLeft: "1%",
          ...styles.selectMode,
        }}
        onPress={() => {
          setSelectMode("auto");
        }}
      >
        <Text
          style={[
            styles.textMode,
            ,
            {
              color: selectMode == "auto" ? "white" : "black",
            },
          ]}
        >
          Auto Search
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const AddPosition = ({ positions, setPositions, selectJob, setSelectJob }) => {
  const [newPosition, setNewPosition] = useState({
    name: "",
    required: "",
    wage: "",
  });
  const [active, setActive] = useState(false);
  const [inputType, setInputType] = useState("");
  const [text, setText] = useState();
  return (
    <View
      style={[
        styles.gapVertical,
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
          msg += newPosition.name == "" ? "ตำแหน่งไม่ถูกต้อง\n" : "";
          msg += Number(newPosition.required) > 0 ? "" : "จำนวนไม่ถูกต้อง\n";
          msg +=
            newPosition.wage != "" && Number(newPosition.wage) >= 0
              ? ""
              : "ค่าจ้างไม่ถูกต้อง\n";
          if (msg == "") {
            setPositions([
              ...positions,
              {
                name: newPosition.name,
                required: Number(newPosition.required),
                wage: Number(newPosition.wage),
              },
            ]);
            setSelectJob([...selectJob, newPosition.name]);
            setNewPosition({
              name: "",
              required: "",
              wage: "",
            });
          } else {
            alert(msg);
          }
        }}
      >
        <AntDesign
          name="pluscircle"
          size={20}
          style={{
            color: "#0bb203",
          }}
        />
      </TouchableOpacity>
      <View style={[styles.pickerBorder, { width: "50%", marginRight: "2%" }]}>
        <Picker
          selectedValue={newPosition.name}
          style={styles.pickerInBox}
          onValueChange={(itemValue, itemIndex) => {
            setNewPosition({ ...newPosition, name: itemValue });
          }}
        >
          <Picker.Item
            key={0}
            label={"กรุณาเลือกตำแหน่ง"}
            value={""}
            color="gray"
          />
          {JOB_POSITION.filter((value) => selectJob.indexOf(value) == -1).map(
            (value, index) => (
              <Picker.Item key={index + 1} label={value} value={value} />
            )
          )}
        </Picker>
        <AntDesign name="down" size={12} style={styles.pickArrow} />
      </View>
      <TouchableOpacity
        style={[styles.inputContainer, { width: "19%", marginRight: "1%" }]}
        onPress={() => {
          setActive(true);
          setText(newPosition.required);
          setInputType("required");
        }}
      >
        <Text
          style={{
            textAlign: "right",
            color: newPosition.required ? "black" : "gray",
          }}
        >
          {newPosition.required || "จำนวน"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.inputContainer, { width: "19%", marginLeft: "1%" }]}
        onPress={() => {
          setActive(true);
          setText(newPosition.wage);
          setInputType("wage");
        }}
      >
        <Text
          style={{
            textAlign: "right",
            color: newPosition.wage ? "black" : "gray",
          }}
        >
          {newPosition.wage || "ค่าจ้าง"}
        </Text>
      </TouchableOpacity>
      <PopUpScreen
        visible={active}
        onRequestClose={() => {
          setActive(false);
          setText(
            inputType === "required" ? newPosition.required : newPosition.wage
          );
        }}
      >
        <View style={styles.popUpContainer}>
          <Text style={[styles.gapVertical, styles.labelFont]}>
            {inputType === "required" ? "กรุณาใส่จำนวน" : "กรุณาใส่ค่าจ้าง"}
          </Text>
          <TextInput
            value={text}
            onChangeText={setText}
            style={[
              styles.inputContainer,
              styles.gapVertical,
              { borderColor: "gray", borderBottomWidth: 0.5 },
            ]}
            placeholder={
              inputType === "required" ? "จำนวน" : "ค่าจ้าง"
            }
            maxLength={inputType === "required" ? 2 : 5}
            keyboardType="numeric"
          />
          <View
            style={[
              styles.gapVertical,
              { flexDirection: "row", justifyContent: "flex-end" },
            ]}
          >
            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={() => {
                setActive(false);
                setText(
                  inputType === "required" ? newPosition.required : newPosition.wage
                );
              }}
            >
              <Text>ยกเลิก</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginVertical: 5, marginHorizontal: 10 }}
              onPress={() => {
                setActive(false);
                setNewPosition({
                  name: newPosition.name,
                  required: inputType === "required" ? text : newPosition.required,
                  wage: inputType === "wage" ? text : newPosition.wage,
                });
              }}
            >
              <Text>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopUpScreen>
    </View>
  );
};

export const TextList = ({ positions }) => {
  const SubList = ({ title, cal }) => (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "60%" }}>
        <Text style={[styles.labelFont, { fontSize: 12 }]}>{title}</Text>
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
                  {value.required + " x " + cal(value.wage) + "฿"}
                </Text>
              </View>
              <View
                style={{
                  width: "20%",
                  marginLeft: "1%",
                }}
              >
                <Text style={styles.listFont}>
                  {value.required * cal(value.wage) + "฿"}
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
          styles.gapVertical,
          {
            textAlign: "right",
            fontWeight: "bold",
            color: "red",
            width: "101%",
          },
        ]}
      >
        {positions.reduce((prev, curr) => prev + curr.required * curr.wage, 0) +
          "฿"}
      </Text>
      <SubList
        title="ค่าจ้างมัดจำ (คิด 30%)"
        cal={(value) => Math.ceil((value * 30) / 100)}
      />
      <Text
        style={[
          styles.listFont,
          styles.gapVertical,
          {
            textAlign: "right",
            fontWeight: "bold",
            width: "101%",
          },
        ]}
      >
        {positions.reduce(
          (prev, curr) =>
            prev + curr.required * Math.ceil((curr.wage * 30) / 100),
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
          styles.gapVertical,
          {
            textAlign: "right",
            fontWeight: "bold",
            width: "101%",
          },
        ]}
      >
        {positions.reduce(
          (prev, curr) =>
            prev + curr.required * Math.floor((curr.wage * 70) / 100),
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#afd9ff",
        height: 64,
      }}
      onPress={post}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
        ประกาศงาน
      </Text>
    </TouchableOpacity>
  );
};

const CreateJobScreen = ({ navigation }) => {
  // Data Job
  const [jobName, setJobName] = useState("");
  const [date, setDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);
  // Date

  const [location, setLocation] = useState(null);
  const [nameAddress, setNameAddress] = useState("");
  const [description, setDescription] = useState("");
  const [positions, setPositions] = useState([]);
  const [selectJob, setSelectJob] = useState([]);
  const [selectMode, setSelectMode] = useState("manual");

  const dispatch = useDispatch();

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={-500}
        enabled
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View style={styles.container}>
            <TextInputComponent
              maxLength={40}
              onSaved={setJobName}
              value={jobName}
              title="ชื่องาน"
            />
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <DateInputComponent
              date={date}
              setDate={setDate}
              startDate={startDate}
              setStartDate={setStartDate}
              finishDate={finishDate}
              setFinishDate={setFinishDate}
            />
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <MapComponent 
              location={location} 
              setLocation={setLocation} 
              address = {nameAddress}
              setAddress ={setNameAddress}
            />
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <TextAreaComponent
              height={140}
              maxLength={500}
              onSaved={setDescription}
              value={description}
              title="รายละเอียด"
            />
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <TiltePosition />
            {positions.map((value, index) => (
              <PostitionSeletion
                key={index}
                value={value}
                index={index}
                positions={positions}
                setPositions={setPositions}
                selectJob={selectJob}
                setSelectJob={setSelectJob}
              />
            ))}
            <AddPosition
              positions={positions}
              setPositions={setPositions}
              selectJob={selectJob}
              setSelectJob={setSelectJob}
            />
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <ModeComponent
              selectMode={selectMode}
              setSelectMode={setSelectMode}
            />
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <TextList positions={positions} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
            positions.length > 0 ? "" : "กรุณาเลือกตำแหน่งงานที่ต้องการจ้าง\n";
          if (msg != "") {
            alert(msg);
          } else {
            console.log("Saving...");
            let job = {
              title: jobName,
              description: description,
              start_date: sd,
              finish_date: fd,
              location: {
                coordinates : [location.latitude, location.longitude],
                nameAddress : nameAddress
              },
              mode: selectMode,
              positions: positions
            };            
            api.job.employer.createJob(job).then( (jobnew) => {          
              dispatch(setJobEmployer(jobnew));
            });
            navigation.goBack();
            
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 10,
  },

  labelFont: {
    color: "#567091",
  },
  gapVertical: {
    marginVertical: 5,
  },
  pickerBorder: {
    borderBottomWidth: 0.5,
    borderRadius: 5,
    borderColor: "gray",
  },
  pickerInBox: {
    height: 25,
    width: "108%",
    backgroundColor: "transparent",
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    left: "-5%",
  },
  selectMode: {
    width: "49%",
    paddingVertical: 7,
    borderWidth: 0.5,
    borderRadius: 5,
    elevation: 2,
  },
  textMode: {
    textAlign: "center",
  },
  pickArrow: { position: "absolute", right: 5, top: "33%" },
  listFont: { fontSize: 12, textAlign: "right" },
  inputContainer: {
    borderBottomWidth: 0.5,
    height: 25,
    paddingHorizontal: 5,
    textAlignVertical: "center",
    borderColor: "gray",
  },
  popUpContainer: {
    margin: 10,
  },
});
export default CreateJobScreen;
