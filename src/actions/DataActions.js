import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { POSTS_FETCH_SUCCESS, STORIES_FETCH_SUCCESS, CREATE_POST_SUCCESS }
from './types';
import { BACKEND_URL } from '../Config';


export const postsFetch = () => {
  const { currentUser } = firebase.auth();
  //console.log('postFetch');
  return (dispatch) => {
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
        //Add Story---------------->>>
        // firebase.database().ref(`/users/${currentUser.uid}/userStories`)
        //   .push({ storyGenericUid: '-L044qZdx7C6-mOp0Pxq', name: 'Weekend in the Dream', date: '2017-12-01', link: "https://firebasestorage.googleapis.com/v0/b/souvenir-5000d.appspot.com/o/stories%2F2.jpg?alt=media&token=6be82c06-8d1b-43df-8b69-1cb2065fea7f" })
        //     .then(() => {
        //     });

        //Add a Generic Story---------------->>>
        // firebase.database().ref('/stories/')
        //   .push({ storyName: 'Weekend in the Dream',
        //           link: 'https://firebasestorage.googleapis.com/v0/b/souvenir-5000d.appspot.com/o/stories%2F2.jpg?alt=media&token=6be82c06-8d1b-43df-8b69-1cb2065fea7f',
        //           users: {
        //             ownerId: currentUser.uid,
        //             contributors: ['fX9chkGoe1fwfpnsu0IhXhAh4Sp2',
        //                            'hHpPpBLO3SSt10o0i36VEKnQwfn2'
        //                           ]
        //           }
        //         })
        //     .then(() => { });


    firebase.database().ref(`/users/${currentUser.uid}/userStories`)
      .on('value', snapshot => {
        dispatch({ type: STORIES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const createPost = ({ uri,
                             timestamp = '2000-01-01',
                             fileName,
                             title,
                             storyName,
                             storyGenericUid
                           }) => {
  const fileRef = timestamp + '__' + fileName;

  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;

  //God knows what is this..
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob

  let uploadBlob = null;
  const mime = 'image/jpg';

  //console.log('Before disptach');

  const { currentUser } = firebase.auth();

  return (dispatch) => {
    const imageRef = firebase.storage().ref('posts').child(fileRef);
    fs.readFile(uri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
    })
    .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((link) => {
        axios.post(BACKEND_URL, {
            currentUser,
            storyGenericUid,
            link,
            date: timestamp,
            ownerID: currentUser.uid,
            owner: 'Rick James',
            storyName,
            title
          })
          .then((response) => {
            console.log(response);
          });
      })
      .then(() => {
        dispatch({ type: CREATE_POST_SUCCESS });
        Actions.callback({ key: 'home', type: 'jump' });
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
