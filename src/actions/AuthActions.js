import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGIN_USER_INITIAL
} from './types';

export const loginUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    console.log(AccessToken);

    LoginManager.logInWithReadPermissions(['public_profile'])
      .then((result) => {
        console.log(result);
        if (result.isCancelled) {
          loginUserFail(dispatch);
        } else {
          AccessToken.getCurrentAccessToken()
            .then((accessTokenData) => {
              const credential = firebase.auth.FacebookAuthProvider
                .credential(accessTokenData.accessToken);
                firebase.auth().signInWithCredential(credential)
                  .then(user => {
                    loginUserSuccess(dispatch, user);
                  })
                  .catch(() => loginUserFail(dispatch));
              });
          }
      });
  };
};

export const reloginUserFirst = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    AccessToken.getCurrentAccessToken()
      .then((accessTokenData) => {
        if (accessTokenData) {
          const credential = firebase.auth.FacebookAuthProvider
            .credential(accessTokenData.accessToken);
          firebase.auth().signInWithCredential(credential).then(user => {
                loginUserSuccess(dispatch, user);
          })
          .catch(() => loginUserFail(dispatch));
        } else loginUserInitial(dispatch);
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
