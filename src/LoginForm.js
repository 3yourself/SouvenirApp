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
import FBSDK, { LoginManager, AccessToken,  LoginButton } from 'react-native-fbsdk';

class LoginForm extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <LoginButton
            readPermissions={["public_profile", 'email']}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("Login failed with error: " + result.error);
                } else if (result.isCancelled) {
                  alert("Login was cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then((accessTokenData) => {
                      const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
                      firebase.auth().signInWithCredential(credential)
                      .then((result) => {
                        //sucess
                      }, (error) => {
                        console.log(error)
                      })
                    }, (error => {
                        console.log('Something went wrong: ' + error)
                    }))
                  }
          }
        }
        //onLogoutFinished={() => alert("logout.")}
        />
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
