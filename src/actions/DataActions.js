import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import { POSTS_FETCH_SUCCESS, STORIES_FETCH_SUCCESS, CREATE_POST_SUCCESS }
from './types';

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
        //Add Story---------------->>>
        // firebase.database().ref(`/users/${currentUser.uid}/userStories`)
        //   .push({ storyGenericUid: '-L044P6g-YIobVVeuiFD', name: 'My Eurotrip', date: '2017-12-01', link: "https://firebasestorage.googleapis.com/v0/b/souvenir-5000d.appspot.com/o/stories%2F1.jpg?alt=media&token=cbbe6bb3-f730-4d2c-aac4-1ece448c6a2d" })
        //     .then(() => {
        //     });

        //Add User profile---------------->>>
        // firebase.database().ref(`/users/${currentUser.uid}/profile`)
        //   .set({ firstName: 'Audrius', lastName: 'Xw' })
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
        //Push the post to users, including this user, as he is contributor
        //First get the story contributos
        firebase.database().ref(`/stories/${storyGenericUid}/users/contributors`)
          .once('value')
          .then((contributorSnapshot) => {
            //then get story uid of contributors story
            contributorSnapshot.val().forEach((userId) => {
              console.log('userId', userId);
              firebase.database().ref(`/users/${userId}/userStories/`)
                .orderByChild('storyGenericUid')
                .equalTo(storyGenericUid)
                .once('value')
                .then((storiesSnapshot) => {
                  //finally insert contributors post
                  firebase.database().ref(`/users/${userId}/posts/`)
                    .push({
                      link,
                      date: timestamp,
                      ownerID: currentUser.uid,
                      owner: 'Rick James',
                      storyUid: Object.keys(storiesSnapshot.val())[0],
                      storyName,
                      title
                    });
                  })
                .catch((error) => {
                  console.log('Failed to insert a post for a contributor', userId, error);
                });
            });
          });
      })
      .then(() => {
        console.log('Post pushed to users posts.');
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
