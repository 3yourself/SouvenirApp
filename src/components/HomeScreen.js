import React, { Component } from 'react';
import { View } from 'react-native';
import PostsList from './PostsList';
import StoriesList from './StoriesList';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.contentStyle}>
          <PostsList />
        </View>
        <View style={styles.footerStyle}>
          <StoriesList />
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
     flex: 1,
     flexDirection: 'column',
     justifyContent: 'center',
     backgroundColor: 'white'
  },
  footerStyle: {
    zIndex: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 3
  },
  contentStyle: {
    marginBottom: 85
  }
};

export default HomeScreen;
