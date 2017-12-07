import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectStory } from '../actions';

class StoryItem extends Component {
  render() {
    const { name, link, uid } = this.props.story;
    //console.log(this.props.story);
    return (
      <TouchableHighlight onPress={() => this.props.selectStory({ uid, name })}>
        <View style={styles.containerStyle}>
          <Image source={{ uri: link }} style={styles.imageStyle} />
          <Text style={styles.nameStyle}>{name}</Text>
        </View>
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
  containerStyle: {
    paddingLeft: 4,
    paddingTop: 5,
    flexDirection: 'column',
    width: 65,
    alignItems: 'center'
  },
  nameStyle: {
    fontSize: 9,
    paddingTop: 4,
    fontWeight: 'bold',
    textAlign: 'center'
  }
};

export default connect(null, { selectStory })(StoryItem);
