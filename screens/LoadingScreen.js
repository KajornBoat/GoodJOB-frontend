import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from '../API/firebase/firebase';
import API from '../API/API'

class LoadingScreen extends Component {

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {

    firebase.auth().onAuthStateChanged(
      function(user) {
        console.log('AUTH STATE CHANGED CALLED ')
        //console.log(user)
        if (user) {
          //firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
          this.props.navigation.navigate('Dashboard');
        } else {
          this.props.navigation.navigate('Login');
        }
      }.bind(this)
    );
  };

  

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});