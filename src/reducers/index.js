import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostsReducer from './PostsReducer';
import StoriesReducer from './StoriesReducer';
import SelectStoryReducer from './SelectStoryReducer';
import PostingReducer from './PostingReducer';
import FriendsReducer from './FriendsReducer';
import CreatingStoryReducer from './CreatingStoryReducer';


export default combineReducers({
    auth: AuthReducer,
    posts: PostsReducer,
    stories: StoriesReducer,
    selectedStory: SelectStoryReducer,
    postingStatus: PostingReducer,
    friends: FriendsReducer,
    creatingStoryStatus: CreatingStoryReducer
});
