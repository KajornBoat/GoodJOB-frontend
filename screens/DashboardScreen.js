import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, Button } from "react-native";
import API from "../API/API";
import CreateJobScreen from "./CreateJobScreen";
const DashboardScreen = (props) => {
  const [visible, setVisible] = useState(false);
  const getUID = () => {
    API.user.getUserID().then((uid) => {
      console.log("UID = ", uid);
      alert(uid);
    });
  };
  const getUser = () => {
    API.user.getUser().then((user) => {
      console.log("User = ", user);
      // this.user = user.email
      //this.state = false;
      alert("UserEmail = " + user.email);
    });
  };
  const getIdToken = () => {
    API.user.getIdToken().then((idToken) => {
      console.log("idToken = ", idToken);
      alert(idToken);
    });
  };
  return (
    <View style={(styles.container, { margin: 30 })}>
      <Button title="Sign out" onPress={() => API.auth.signOut()} />
      <Text>{"\n"}</Text>
      <Button title="Get idToken" onPress={() => getIdToken()} />
      <Button title="Get UID" onPress={() => getUID()} />
      <Button title="Get USer" onPress={() => getUser()} />
      <Text>{"\n"}</Text>
      <Button title="Create NewUser" onPress={() => API.user.createNewUser()} />
      <Button
        title="Setting Screen"
        onPress={() => props.navigation.navigate("Setting")}
      />
      <Button title="Create Job" onPress={() => setVisible(true)} />
      <CreateJobScreen visible={visible} onClosed={() => setVisible(false)} />
    </View>
  );
};
export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
