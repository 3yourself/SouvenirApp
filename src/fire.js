import firebase from 'firebase'
  var config = {
    apiKey: "AIzaSyBryPWu4k13ObP5cwpAUrPEjl5c4y9CMx4",
    authDomain: "souvenir-5000d.firebaseapp.com",
    databaseURL: "https://souvenir-5000d.firebaseio.com",
    projectId: "souvenir-5000d",
    storageBucket: "souvenir-5000d.appspot.com",
    messagingSenderId: "355140365107"
  };
var fire = firebase.initializeApp(config);
export default fire;