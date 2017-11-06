import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

export const loginUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

      LoginManager.logInWithReadPermissions(['public_profile'])
        .then(AccessToken.getCurrentAccessToken().then((accessTokenData) => {
          const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
          firebase.auth().signInWithCredential(credential)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch));
        }));
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
