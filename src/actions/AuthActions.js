import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS
} from './types';

export const loginUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    LoginManager.logInWithReadPermissions(['public_profile'])
      .then((result) => {
        //console.log(result);
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

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });

     firebase.auth().signOut()
      .then(() => logoutUserSuccess(dispatch));
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

const logoutUserSuccess = (dispatch) => {
  dispatch({ type: LOGOUT_USER_SUCCESS });

  Actions.auth();
};
