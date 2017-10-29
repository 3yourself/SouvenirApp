/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity
 } from 'react-native';
import firebase from 'firebase';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';

class LoginForm extends Component {

state = { loggedIn: null, loading: false };

  fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then
    //(this.onLoginSucess.bind(this))
      (function(result) {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((accessTokenData) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
            firebase.auth().signInWithCredential(credential).then((result) => {
              // promise was successful
            }, (error) => {
              console.log(error)
            })
          }, (error => {
              console.log('Something went wrong: ' + error)
          }))
        }
    },
      function(error) {
        alert('Something went wrong: ' + error);
      }
  );
}

onLoginFail() {
  this.setState({
    loading: false,
    error: 'Authentication Failed.'
  });
}

onLoginSucess() {
    this.setState({
      loading: false,
      errror: ''
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.fbAuth.bind(this)}>
          <Text>facebook</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default LoginForm;
