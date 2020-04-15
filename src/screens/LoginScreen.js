import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import API from '../API/API'


class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign In With Google"
          onPress ={ () => API.auth.signInWithGoogleAsync() }
          
        />
        <Text>{"\n"}</Text>
        <Button
          title="Sign In With Facebook"
          onPress ={ () => API.auth.signInWithFacebook() }
          
        />
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});