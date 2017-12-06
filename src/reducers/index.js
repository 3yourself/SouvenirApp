import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostsReducer from './PostsReducer';
import StoriesReducer from './StoriesReducer';

export default combineReducers({
    auth: AuthReducer,
    posts: PostsReducer,
    stories: StoriesReducer
});
