import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { selectStory } from '../actions';

class StoryItem extends Component {
  renderStory() {
    const { name, link, uid } = this.props.story;

    const style = {
      paddingTop: 5,
      flexDirection: 'column',
      width: 57,
      height: 80,
      alignItems: 'center',
      borderRadius: 3
    };

    if (this.props.selectedStoryUid === uid) {
      style.backgroundColor = 'grey';
    }

    return (
      <View style={style}>
        <CachedImage source={{ uri: link }} style={styles.imageStyle} />
        <Text style={styles.nameStyle}>{name}</Text>
      </View>
    );
  }

  render() {
    const { name, uid, storyGenericUid } = this.props.story;

    return (
      <TouchableHighlight onPress={() => this.props.selectStory({ uid, name, storyGenericUid })}>
        {this.renderStory()}
      </TouchableHighlight>
    );
  }
}

const styles = {
  imageStyle: {
    height: 45,
    width: 45,
    borderRadius: 9
  },
  nameStyle: {
    fontSize: 9,
    paddingTop: 4,
    fontWeight: 'bold',
    textAlign: 'center'
  }
};

const mapStateToProps = (state) => {
  const selectedStoryUid = state.selectedStory.uid;
  return { selectedStoryUid };
};

export default connect(mapStateToProps, { selectStory })(StoryItem);
