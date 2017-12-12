import {
  SELECT_STORY
} from '../actions/types';

const INITIAL_STATE = {
  //Why does not it work????
  // Selected story:
   uid: '',
   name: '',
   storyGenericUid: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_STORY:
      //console.log(action);
      return action.payload;
    default:
      return state;
  }
};
