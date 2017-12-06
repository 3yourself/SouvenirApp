import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import StoryItem from './StoryItem';
import { storiesFetch } from '../actions';

class StoriesList extends Component {
  componentWillMount() {
    this.props.storiesFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ stories }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(stories);
  }

  renderRow(story) {
    return <StoryItem story={story} />;
  }

  render() {
    return (
      <View style={styles.storiesListStyle}>
        <ListView
          horizontal
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = {
  storiesListStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    //borderBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 80,
    backgroundColor: '#F8F9F9',
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row'
  }
};

const mapStateToProps = state => {
  const stories = _.map(state.stories, (val, uid) => {
    return { ...val, uid };
  });

  return { stories };
};

export default connect(mapStateToProps, { storiesFetch })(StoriesList);
