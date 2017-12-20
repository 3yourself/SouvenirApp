import {
  CREATING_STORY_IN_PROGRESS,
  CREATE_STORY_SUCCESS,
  CREATE_STORY_FAILED
} from '../actions/types';

const INITIAL_STATE = {
  posting: false
};

export default (state = INITIAL_STATE, action) => {
  //console.log(action);
  switch (action.type) {
    case CREATING_STORY_IN_PROGRESS:
      return { ...state, posting: true };
    case CREATE_STORY_SUCCESS:
      return { ...state, posting: false };
    case CREATE_STORY_FAILED:
      return { ...state, posting: false };
    default:
      return state;
  }
};
