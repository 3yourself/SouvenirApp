import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

componentWillMount() {
  /*firebase.initializeApp({
    apiKey: "AIzaSyBryPWu4k13ObP5cwpAUrPEjl5c4y9CMx4",
    authDomain: "souvenir-5000d.firebaseapp.com",
    databaseURL: "https://souvenir-5000d.firebaseio.com",
    projectId: "souvenir-5000d",
    storageBucket: "souvenir-5000d.appspot.com",
    messagingSenderId: "355140365107"
  });*/
}

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Router />
        </View>
      </Provider>
    );
  }
}

export default App;
