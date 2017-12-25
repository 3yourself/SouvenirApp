import { SELECT_STORY } from './types';

export const selectStory = ({ uid, storyGenericUid, name }) => {
  return {
    type: SELECT_STORY,
    payload: { uid, storyGenericUid, name }
  };
};
