import React, { Component } from 'react';
import { ListView, View, TouchableOpacity, Image, Text } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import StoryItem from './StoryItem';
import { storiesFetch } from '../actions';

const addIcon = require('../../res/static/addIcon.png');

class StoriesList extends Component {
  componentWillMount() {
    this.props.storiesFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }


  onCreateNewStoryPress() {
    Actions.push('createStory');
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
      <View style={styles.storiesContainerStyle}>
        <View style={styles.storiesListStyle}>
          <ListView
            horizontal
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </View>

        <View style={styles.createNewStoryContainerStyle}>
          <TouchableOpacity onPress={this.onCreateNewStoryPress.bind(this)}>
            <View style={styles.createNewStoryTouchableStyle}>
              <Image source={addIcon} style={styles.createNewStoryIconImageStyle} />
              <Text style={styles.nameStyle}>Create Story</Text>
            </View>
          </TouchableOpacity >
        </View>
      </View>
    );
  }
}

const styles = {
  storiesContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //borderTopWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#F8F9F9',
    marginLeft: 5,
    marginRight: 5,
    height: 80
  },
  storiesListStyle: {
    flexDirection: 'row'
  },
  createNewStoryContainerStyle: {
    paddingTop: 5,
    width: 65,
    height: 80,
    borderRadius: 3,
    alignItems: 'center',
    flexDirection: 'column'
  },
  createNewStoryIconImageStyle: {
    height: 45,
    width: 45,
    borderRadius: 9,
    opacity: 0.5
  },
  createNewStoryTouchableStyle: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  nameStyle: {
    fontSize: 9,
    paddingTop: 4,
    fontWeight: 'bold',
    textAlign: 'center'
  }
};

const mapStateToProps = state => {
  let stories = _.map(state.stories, (val, uid) => {
    return { ...val, uid };
  });

  if (stories.length > 5) {
    console.log(stories);
    stories = _.slice(stories, 0, 5);
    return { stories };
  }
  return { stories };
};

export default connect(mapStateToProps, { storiesFetch })(StoriesList);
