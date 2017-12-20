import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { POSTS_FETCH_SUCCESS, STORIES_FETCH_SUCCESS, CREATE_POST_SUCCESS, POSTING_IN_PROGRESS, CREATE_POST_FAILED, FRIENDS_FETCH_SUCCESS }
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

export const friendsFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/fbFriends`)
      .once('value')
      .then(snapshot => {
        dispatch({ type: FRIENDS_FETCH_SUCCESS, payload: snapshot.val() });
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
                             timestamp = firebase.database.ServerValue.TIMESTAMP,
                             fileName,
                             title,
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

  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: POSTING_IN_PROGRESS });

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
        axios.post(BACKEND_URL + 'createPost', {
            currentUser,
            storyGenericUid,
            link,
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
        dispatch({ type: CREATE_POST_FAILED });
        console.log(error);
      });
  };
};

export const createStory = ({ uri,
                             timestamp = firebase.database.ServerValue.TIMESTAMP,
                             fileName,
                             title,
                             storyGenericUid
                           }) => {
  const fileRef = timestamp + '__' + fileName;

  // const Blob = RNFetchBlob.polyfill.Blob;
  // const fs = RNFetchBlob.fs;
  //
  // //God knows what is this..
  // window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  // window.Blob = Blob
  //
  // let uploadBlob = null;
  // const mime = 'image/jpg';
  //
  // const { currentUser } = firebase.auth();
  //
  // return (dispatch) => {
  //   dispatch({ type: POSTING_IN_PROGRESS });
  //
  //   const imageRef = firebase.storage().ref('posts').child(fileRef);
  //   fs.readFile(uri, 'base64')
  //     .then((data) => {
  //       return Blob.build(data, { type: `${mime};BASE64` });
  //   })
  //   .then((blob) => {
  //       uploadBlob = blob;
  //       return imageRef.put(blob, { contentType: mime });
  //     })
  //     .then(() => {
  //       uploadBlob.close();
  //       return imageRef.getDownloadURL();
  //     })
  //     .then((link) => {
  //       axios.post(BACKEND_URL + 'createPost', {
  //           currentUser,
  //           storyGenericUid,
  //           link,
  //           title
  //         })
  //         .then((response) => {
  //           console.log(response);
  //         });
  //     })
  //     .then(() => {
  //       dispatch({ type: CREATE_POST_SUCCESS });
  //       Actions.callback({ key: 'home', type: 'jump' });
  //     })
  //     .catch((error) => {
  //       dispatch({ type: CREATE_POST_FAILED });
  //       console.log(error);
  //     });
  // };
};
