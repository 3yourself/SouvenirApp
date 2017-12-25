import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, TextInput, TouchableOpacity, ListView, KeyboardAvoidingView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Spinner } from './common';
import { createStory, friendsFetch } from '../actions';

const galleryDefaultImage = require('../../res/static/galleryDefaultImage.png');

const INITIAL_STATE = { showImagePicker: false,
          timestamp: '',
          fileName: '',
          titleValue: '',
          selectedSource: '',
          reqValueMissing: false,
          titleInputContainerErrorStyle: null,
          selectImageContainerErrorStyle: null,
          selectedFriends: []
        };

class CreateStory extends Component {
  state = INITIAL_STATE;

  componentWillMount() {
    this.props.friendsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onButtonPress() {
    let invalid = false;

  if (!this.state.selectedSource) {
      invalid = true;
      this.setState({ selectImageContainerErrorStyle: styles.selectImageContainerErrorStyle });
    } else this.setState({ selectImageContainerErrorStyle: null });

    if (!this.state.titleValue) {
      invalid = true;
      this.setState({ titleInputContainerErrorStyle: styles.titleInputContainerErrorStyle });
    } else this.setState({ titleInputContainerErrorStyle: null });

    if (invalid) return;

    this.props.createStory({
      uri: this.state.uri,
      timestamp: this.state.timestamp,
      fileName: this.state.fileName,
      title: this.state.titleValue,
      friends: this.state.selectedFriends
    });
    this.setState(INITIAL_STATE);
  }

  onFriendPress(id) {
    const newFriends = [...this.state.selectedFriends];
    const index = newFriends.indexOf(id);

    console.log(index);

    if (index === -1) {
      newFriends.push(id);
    } else {
      newFriends.splice(index, 1);
    }

    this.setState({ selectedFriends: newFriends });
    console.log(newFriends);
  }

  createDataSource({ friends }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(friends);
  }

  renderRow(friend) {
    const { id, name } = friend;

    let style = null;

    if (this.state.selectedFriends.indexOf(id) !== -1) {
      style = {
        backgroundColor: 'grey'
      };
    }

    return (
      <View style={[{ paddingTop: 2, paddingBottom: 2, paddingLeft: 5, paddingRight: 50 }]}>
        <TouchableOpacity onPress={() => this.onFriendPress(id)}>
          <View style={[style, { paddingLeft: 10, borderRadius: 2, marginLeft: 2, marginRight: 2 }]}>
            <Text>{name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderImagePicker() {
    if (!this.state.showImagePicker) return;

    const options = {
      title: 'Select Avatar',
      customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    return (
      ImagePicker.showImagePicker(options, (response) => {
          this.setState({
            showImagePicker: false,
            uri: response.uri,
            timestamp: response.timestamp,
            fileName: response.fileName
          });
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log(source);
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              selectedSource: source
            });
          }
        })
    );
  }

  renderSelectedImage() {
    let source = galleryDefaultImage;
    const style = styles.selectImageStyle;

    if (this.state.selectedSource) {
      source = this.state.selectedSource;
      style.opacity = 0.8;
    }

    return (
      <Image
        source={source}
        style={style}
      />
    );
  }

  render() {
    if (this.props.posting) {
      return <Spinner size="large" />;
    }

    return (
      <KeyboardAvoidingView style={styles.containerStyle}>
        <View style={styles.selectTextContainer}>
          <Text style={styles.selectTextStyle}>Choose the Cover</Text>
        </View>

        <View
          style={[styles.selectImageContainerStyle, this.state.selectImageContainerErrorStyle]}
        >
          <TouchableHighlight
            onPress={() => { this.setState({ showImagePicker: true }); }}
            activeOpacity={0.8}
            underlayColor='#eff5ff'
          >
            {this.renderSelectedImage()}
          </TouchableHighlight>
        </View>

        <View style={{ height: 5 }} />

        <View
          style={[styles.titleInputContainerStyle, this.state.titleInputContainerErrorStyle]}
        >
          <TextInput
            style={styles.titleInputStyle}
            placeholder='Put the title here..'
            multiline
            autoCapitalize='sentences'
            numberOfLines={4}
            onChangeText={(text) => this.setState({ titleValue: text })}
            value={this.state.titleValue}
          />
        </View>

        <View style={styles.friendsListContainerStyle}>
          <Text style={styles.friendsListLabelStyle}>Add friends to your story</Text>

          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>

        <View style={styles.postButtonContainerStyle}>
          <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.postButtonStyle}>
            <Text style={styles.postTextStyle}>
              Let It Begin!
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {this.renderImagePicker()}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerStyle: {
    paddingTop: 70,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  selectTextContainer: {
    alignItems: 'center',
    borderBottomWidth: 0
  },
  selectTextStyle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },

  selectImageContainerStyle: {
    alignItems: 'center'
  },
  selectImageStyle: {
    height: 120,
    width: 120,
    borderRadius: 30,
    opacity: 0.3
  },
  selectImageContainerErrorStyle: {
    borderLeftWidth: 8,
    borderColor: '#fcc2c2'
  },

  titleInputContainerStyle: {
    height: 60,
    justifyContent: 'center',
    borderBottomWidth: 0
  },
  titleInputStyle: {
    alignItems: 'center'
  },
  titleInputContainerErrorStyle: {
    borderLeftWidth: 8,
    borderBottomWidth: 0,
    borderColor: '#fcc2c2'
  },

  friendsListContainerStyle: {
    borderBottomWidth: 0,
    paddingLeft: 12,
    height: 180,
    flexDirection: 'column'
  },
  friendsListLabelStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'grey'
  },

  postButtonContainerStyle: {
    bottom: 20,
    alignItems: 'center'
  },
  postButtonStyle: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey'
  },
  postTextStyle: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  }
};

const mapStateToProps = (state) => {
  const posting = state.creatingStoryStatus.posting;

  const friends = _.map(state.friends, (name, id) => {
    return { name, id };
  });

  return { posting, friends };
};

export default connect(mapStateToProps, { createStory, friendsFetch })(CreateStory);
