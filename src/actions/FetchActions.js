import firebase from 'firebase';
//import { Actions } from 'react-native-router-flux';
import { POSTS_FETCH_SUCCESS, STORIES_FETCH_SUCCESS }
from './types';

// export const employeeUpdate = ({ prop, value }) => {
//   //console.log(value + ' ' + prop);
//   return {
//     type: EMPLOYEE_UPDATE,
//     payload: { prop, value }
//   };
// };

// export const employeeCreate = ({ name, phone, shift }) => {
//   //console.log(name, phone, shift);
//   const { currentUser } = firebase.auth();
//
//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/employees`)
//       .push({ name, phone, shift })
//         .then(() => {
//           dispatch({ type: EMPLOYEE_CREATE });
//           Actions.employeeList({ type: 'reset' });
//         });
//   };
// };

export const postsFetch = () => {
  const { currentUser } = firebase.auth();
  console.log('postFetch');
  return (dispatch) => {
        // firebase.database().ref(`/users/${currentUser.uid}/stories`)
        //   .push({ name: 'Holidays go', date: '2017-12-01', link: 'https://g1.dcdn.lt/images/pix/280x170/yDBUiujPmYc/bitkoinai-bitcoin-75811753.jpg' })
        //     .then(() => {
        //       //dispatch({ type: EMPLOYEE_CREATE });
        //       //Actions.employeeList({ type: 'reset' });
        //     });
    firebase.database().ref(`/users/${currentUser.uid}/posts`)
      .on('value', snapshot => {
        dispatch({ type: POSTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const storiesFetch = () => {
  const { currentUser } = firebase.auth();
  console.log('storyFetch');
  return (dispatch) => {
        // firebase.database().ref(`/users/${currentUser.uid}/stories`)
        //   .push({ name: 'Holidays go', date: '2017-12-01', link: 'https://g1.dcdn.lt/images/pix/280x170/yDBUiujPmYc/bitkoinai-bitcoin-75811753.jpg' })
        //     .then(() => {
        //       //dispatch({ type: EMPLOYEE_CREATE });
        //       //Actions.employeeList({ type: 'reset' });
        //     });
    firebase.database().ref(`/users/${currentUser.uid}/stories`)
      .on('value', snapshot => {
        dispatch({ type: STORIES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};


// export const employeeSave = ({ name, phone, shift, uid }) => {
//   const { currentUser } = firebase.auth();
//
//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
//       .set({ name, phone, shift })
//       .then(() => {
//         console.log('saved');
//         dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
//         Actions.employeeList({ type: 'reset' });
//       });
//   };
// };

// export const employeeDelete = ({ uid }) => {
//   const { currentUser } = firebase.auth();
//
//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
//       .remove()
//         .then(() => {
//           Actions.employeeList({ type: 'reset' });
//         });
//   };
// };
