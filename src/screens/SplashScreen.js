import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default () => {
    return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
          <Text>Loading...Splash</Text>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  