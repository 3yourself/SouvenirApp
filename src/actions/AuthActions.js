import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGIN_USER_INITIAL
} from './types';

//Get and save user info from FB
const saveUserInfo = (error, result) => {
  if (error) {
    console.log('Error fetching data: ', error);
  } else {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`users/${currentUser.uid}/profile`).set({
      facebookId: result.id,
      firstName: result.first_name,
      lastName: result.last_name,
      middleName: result.middle_name,
      email: result.email,
      profilePicture: result.picture.data.url
    });
  }

  console.log('Success fetching user data: ', result);
};

//Get and save friends info from FB
const saveFriendsList = (error, result) => {
  if (error) {
    console.log('Error fetching data: ', error);
  } else {
    const { currentUser } = firebase.auth();

    const friendsList = {};

    result.data.forEach((friend) => {
      friendsList[friend.id] = friend.name;
    });

    firebase.database().ref(`users/${currentUser.uid}/fbFriends`).set(friendsList);

    console.log('Success fetching friends data: ', result);
  }
};

const initializeUser = (dispatch, user) => {
  //User request
  const userInfoRequest = new GraphRequest(
      '/me?fields=id,last_name,first_name,middle_name,email,picture',
      null,
      saveUserInfo);

  //Friends request
  const friendsListRequest = new GraphRequest(
      '/me/friends',
      null,
      saveFriendsList);

  //Submit request to FB
  new GraphRequestManager()
    .addRequest(userInfoRequest)
    .addRequest(friendsListRequest)
    .addBatchCallback((error, result) => {
      console.log('Batch result:', result);
      console.log('User:', user);
      if (result) loginUserSuccess(dispatch, user);
      else loginUserFail(dispatch);
    })
    .start();
};

const loginFirebase = (dispatch) => {
  AccessToken.getCurrentAccessToken()
    .then((accessTokenData) => {
      const credential = firebase.auth.FacebookAuthProvider
        .credential(accessTokenData.accessToken);
        firebase.auth().signInWithCredential(credential)
          .then(user => {
            //refresh user info
            //console.log(user);
            initializeUser(dispatch, user);
          })
          .catch(() => loginUserFail(dispatch));
      });
};

export const loginUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    LoginManager.logInWithReadPermissions([
      'public_profile',
      'email',
      'user_friends',
      'user_about_me'
    ])
      .then((result) => {
        if (result.isCancelled) {
          loginUserFail(dispatch);
          //go for firebase
        } else loginFirebase(dispatch);
      });
  };
};

export const reloginUserFirst = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    AccessToken.getCurrentAccessToken()
      .then((accessTokenData) => {
        if (accessTokenData) {
          //Go for firebase
          loginFirebase(dispatch);
        } else {
          loginUserInitial(dispatch);
          return;
        }
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    firebase.auth().signOut()
      .then(() => LoginManager.logOut())
      .then(() => logoutUserSuccess(dispatch));
  };
};

export const createUserProfile = () => {
  //Much work TBD
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserInitial = (dispatch) => {
  dispatch({ type: LOGIN_USER_INITIAL });
};

const loginUserSuccess = (dispatch, user) => {
  createUserProfile(user);

  Actions.main();

  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

const logoutUserSuccess = (dispatch) => {
  dispatch({ type: LOGOUT_USER_SUCCESS });

  Actions.auth();
};
