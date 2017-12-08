import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import { POSTS_FETCH_SUCCESS, STORIES_FETCH_SUCCESS, CREATE_POST_SUCCESS }
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
  //console.log('postFetch');
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
  //console.log('storyFetch');
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

export const createPost = ({ uri, timestamp, fileName }) => {
  const fileRef = timestamp + '__' + fileName;

  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;

  //God knows what is this..
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob

  let uploadBlob = null;
  const mime = 'image/jpg';

  console.log('Before disptach');

  const { currentUser } = firebase.auth();

  return (dispatch) => {
    const imageRef = firebase.storage().ref('posts').child(fileRef);
    console.log('Got ref');
    fs.readFile(uri, 'base64')
      .then((data) => {
        console.log('read file');
        return Blob.build(data, { type: `${mime};BASE64` });
    })
    .then((blob) => {
        console.log('try upload', blob);
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((link) => {
        // URL of the image uploaded on Firebase storage
        console.log(link);
        console.log('Uploaded a base64 string!');
        //Push the remaining of the post

        firebase.database().ref(`/users/${currentUser.uid}/posts/`)
          .push({
            link,
            date: timestamp,
            ownerID: currentUser.uid,
            owner: 'Rick James',
            storyID: '-L-fwtgKso0lH7yoFA2',
            storyName: 'My Eurotrip',
            title: 'Just Initial Title'
          })
          .then(() => {
            console.log('saved');
            dispatch({ type: CREATE_POST_SUCCESS });
            Actions.main({ type: 'reset' });
          });
      })
      .catch((error) => {
        console.log(error);
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
