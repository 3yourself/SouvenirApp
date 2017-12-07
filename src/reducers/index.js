import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostsReducer from './PostsReducer';
import StoriesReducer from './StoriesReducer';
import SelectStoryReducer from './SelectStoryReducer';

export default combineReducers({
    auth: AuthReducer,
    posts: PostsReducer,
    stories: StoriesReducer,
    selectedStory: SelectStoryReducer
});
