import React from "react";
import { View, StyleSheet } from "react-native";

import { Avatar } from "react-native-elements";

const EmployeeAvatar = ({ uri, size, onPress }) => {
  return (
    <View style={styles.avatarStyle}>
      <Avatar
        rounded
        containerStyle={{ marginVertical: 10 }}
        source={uri}
        size={size}
        activeOpacity={0.5}
        onPress={onPress}
      />
    </View>
  );
};

export default EmployeeAvatar;

const styles = StyleSheet.create({
  avatarStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
