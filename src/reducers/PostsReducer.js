import {
  POSTS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  //Why does not it work????
  // owner: '',
  // title: '',
  // link: '',
  // storyName: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POSTS_FETCH_SUCCESS:
      //console.log(action);
      return action.payload;
    default:
      return state;
  }
};
