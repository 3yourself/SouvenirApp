import firebase from 'firebase';
import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import ImageResizer from 'react-native-image-resizer';
import axios from 'axios';
import { POSTS_FETCH_SUCCESS, STORIES_FETCH_SUCCESS, CREATE_POST_SUCCESS, POSTING_IN_PROGRESS, CREATE_POST_FAILED, FRIENDS_FETCH_SUCCESS, CREATING_STORY_IN_PROGRESS, CREATE_STORY_SUCCESS, CREATE_STORY_FAILED }
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

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/userStories`)
      .on('value', snapshot => {
        dispatch({ type: STORIES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const createPost = ({ uri,
                             title,
                             storyGenericUid
                           }) => {
  return (dispatch) => {
    dispatch({ type: POSTING_IN_PROGRESS });

    const fileRef = Date.now() + '__' + Math.random();

    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;

    //God knows what is this..
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    let uploadBlob = null;
    const mime = 'image/jpg';

    const { currentUser } = firebase.auth();

    const imageRef = firebase.storage().ref('posts').child(fileRef);

    ImageResizer.createResizedImage(uri, 800, 800, 'PNG', 100, 0, null)
     .then((resizedFileResponse) => {
       //On iOS platform the directory path will be changed every time you access to the file system.
       //So if you need read file on iOS, you need to get dir path first and concat file name with it.
       // fileUri is a string like "file:///var/mobile/Containers/Data/Application/9B754FAA-2588-4FEC-B0F7-6D890B7B4681/Documents/filename"
       if (Platform.OS === 'ios') {
         let arr = resizedFileResponse.uri.split('/');
         const dirs = RNFetchBlob.fs.dirs;
         filePath = `${dirs.CacheDir}/${arr[arr.length - 1]}`;
       } else {
         filePath = resizedFileResponse.uri;
       }
        fs.readFile(filePath, 'base64')
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
          Actions.jump('homeScreen');
        })
        .catch((error) => {
          dispatch({ type: CREATE_POST_FAILED });
          console.log(error);
        });
      });
  };
};

export const createStory = ({ uri,
                             title,
                             friends
                           }) => {
  return (dispatch) => {
    dispatch({ type: CREATING_STORY_IN_PROGRESS });

    const fileRef = Date.now() + '__' + Math.random();

    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;

    //God knows what is this..
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    let uploadBlob = null;
    const mime = 'image/jpg';

    const { currentUser } = firebase.auth();

    const imageRef = firebase.storage().ref('stories').child(fileRef);

    ImageResizer.createResizedImage(uri, 300, 300, 'PNG', 100, 0, null)
     .then((resizedFileResponse) => {
       console.log('image resized');
       console.log(resizedFileResponse);
       //On iOS platform the directory path will be changed every time you access to the file system.
       //So if you need read file on iOS, you need to get dir path first and concat file name with it.
       // fileUri is a string like "file:///var/mobile/Containers/Data/Application/9B754FAA-2588-4FEC-B0F7-6D890B7B4681/Documents/filename"
        if (Platform.OS === 'ios') {
          let arr = resizedFileResponse.uri.split('/');
          const dirs = RNFetchBlob.fs.dirs;
          filePath = `${dirs.CacheDir}/${arr[arr.length - 1]}`;
        } else {
          filePath = resizedFileResponse.uri;
        }
        fs.readFile(filePath, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then((blob) => {
            uploadBlob = blob;
            console.log('blod');
            return imageRef.put(blob, { contentType: mime });
          })
          .then(() => {
            uploadBlob.close();
            return imageRef.getDownloadURL();
          })
          .then((link) => {
            axios.post(BACKEND_URL + 'createStory', {
                currentUser,
                friends,
                link,
                title
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .then(() => {
            dispatch({ type: CREATE_STORY_SUCCESS });
            Actions.pop();
          })
          .catch((error) => {
            dispatch({ type: CREATE_STORY_FAILED });
            console.log(error);
          });
      });
  };
};
