import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

class StoryItem extends Component {
  onRowPress() {
    
  }

  render() {
    const { name, link } = this.props.story;
    return (
      <TouchableHighlight onPress={this.onRowPress.bind(this)}>
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

export default StoryItem;
