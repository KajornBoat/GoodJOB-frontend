import React from "react";
import { View, Picker } from "react-native";

import { AntDesign } from "@expo/vector-icons";

const PickerFilter = ({ title, value, items, setOnValueChange }) => {
  
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 15,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          borderWidth: 0.5,
          borderRadius: 5,
          backgroundColor: "white",
        }}
      >
        <Picker
          selectedValue={value}
          mode="dropdown"
          style={{ height: 30, width: 200, backgroundColor: "transparent" }}
          onValueChange={(itemValue, itemIndex) => setOnValueChange(itemValue)}
        >
          <Picker.Item label={title} value={title} />

          {items.map((value, index) => (
            <Picker.Item key={index + 1} label={value} value={value} />
          ))}
        </Picker>
        <AntDesign
          name="down"
          size={12}
          style={{ position: "absolute", top: "30%", right: "5%" }}
        />
      </View>
    </View>
  );
};

export default PickerFilter;
