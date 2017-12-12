import React, { Component } from 'react';
import _ from 'lodash';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { postsFetch } from '../actions';
import PostItem from './PostItem';

class PostsList extends Component {
  componentWillMount() {
    this.props.postsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //this.props.postsFetch();
    this.createDataSource(nextProps);
  }

  createDataSource({ posts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(posts);
  }

  renderRow(post) {
    return <PostItem post={post} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const filteredPosts = _.filter(state.posts, (rec) => {
     return rec.storyUid === state.selectedStory.uid || !state.selectedStory.uid;
   });

  const posts = _.map(filteredPosts, (val, uid) => {
    return { ...val, uid };
  });

  const selectedStoryUid = state.selectedStory.uid;

  return { selectedStoryUid, posts };
};

export default connect(mapStateToProps, { postsFetch })(PostsList);
