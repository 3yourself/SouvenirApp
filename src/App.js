/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'firebase';
import { Spinner } from './common';

class App extends Component {
state = { loggedIn: null };

componentWillMount() {
  //This method is only called one time, which is before the initial render
/*
  firebase.initializeApp({
    apiKey: "AIzaSyBryPWu4k13ObP5cwpAUrPEjl5c4y9CMx4",
    authDomain: "souvenir-5000d.firebaseapp.com",
    databaseURL: "https://souvenir-5000d.firebaseio.com",
    projectId: "souvenir-5000d",
    storageBucket: "souvenir-5000d.appspot.com",
    messagingSenderId: "355140365107"
    apiKey: 'AIzaSyCRloEDqXpz9IWWRSCBp6-IKMcTbI6yMs0',
    authDomain: 'authentication-71c27.firebaseapp.com',
    databaseURL: 'https://authentication-71c27.firebaseio.com',
    projectId: 'authentication-71c27',
    storageBucket: 'authentication-71c27.appspot.com',
    messagingSenderId: '327514374758'
});
*/

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    this.setState({ loggedIn: true });
  } else {
    this.setState({ loggedIn: false });
  }
});
}

renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <HomeScreen />;
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
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
});

export default App;
