import { SELECT_STORY } from './types';

export const selectStory = ({ uid, storyGenericUid, name }) => {
  //console.warn('I am in action: ' + libraryId);
  return {
    type: SELECT_STORY,
    payload: { uid, storyGenericUid, name }
  };
};
