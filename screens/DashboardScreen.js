import React, { Component } from 'react';
import { FlatList,View, Text, StyleSheet, Button } from 'react-native';
import API from '../API/API'
class DashboardScreen extends Component {
  getUID(){
    API.user.getUserID().then(uid => {
      console.log("UID = ",uid);
      alert(uid);
    });
    
  }
  getUser(){
    API.user.getUser().then( user => {
      console.log("User = ",user)
     // this.user = user.email
     this.stateee = false;
      alert("UserEmail = " + user.email);
    });
  }
  getIdToken(){
    API.user.getIdToken().then(idToken => {
      console.log("idToken = ",idToken);
      alert(idToken);
    });
  }
  render() {
    return (
      <View style={styles.container,{margin: 30} } >
        <Button title="Sign out" onPress={() => API.auth.signOut()} />
        <Text>{"\n"}</Text>
        <Button title="Get idToken" onPress={() => this.getIdToken()}/>
        <Button title="Get UID" onPress={() => this.getUID()}/>
        <Button title="Get USer" onPress={() =>this.getUser()}/>
        <Text>{"\n"}</Text>
        <Button title="Create NewUser" onPress={() =>API.user.createNewUser()}/>

      </View>
    );
  }

}
export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});