import {
  POSTING_IN_PROGRESS,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILED
} from '../actions/types';

const INITIAL_STATE = {
  posting: false
};

export default (state = INITIAL_STATE, action) => {
  //console.log(action);
  switch (action.type) {
    case POSTING_IN_PROGRESS:
      return { ...state, posting: true };
    case CREATE_POST_SUCCESS:
      return { ...state, posting: false };
    case CREATE_POST_FAILED:
      return { ...state, posting: false };
    default:
      return state;
  }
};
