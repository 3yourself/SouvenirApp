import {
  STORIES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  // name: '',
  // link: '',
  // date: ''
  // selectedStory: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORIES_FETCH_SUCCESS:
      //console.log(action);
      return action.payload;
    default:
      //console.log('returning default story state');
      //console.log(state);
      return state;
  }
};
