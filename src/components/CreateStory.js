import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, TextInput, TouchableOpacity, ListView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import _ from 'lodash';
import { CardSection, Spinner } from './common';
import { createStory, friendsFetch } from '../actions';

const INITIAL_STATE = { showImagePicker: false,
          uri: 'https://firebasestorage.googleapis.com/v0/b/souvenir-5000d.appspot.com/o/static%2FgalleryIcon.png?alt=media&token=501e14ac-9358-4701-aabc-60d5818de43e',
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
      <View style={[{ paddingTop: 2, paddingBottom: 2, paddingLeft: 5 }]}>
        <TouchableOpacity onPress={() => this.onFriendPress(id)}>
          <View style={[style]}>
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
    let source = { uri: this.state.uri };
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
      <View style={styles.containerStyle}>
        <CardSection style={styles.selectTextContainer}>
          <Text style={styles.selectTextStyle}>Choose the Cover</Text>
        </CardSection>

        <CardSection
          style={[styles.selectImageContainerStyle, this.state.selectImageContainerErrorStyle]}
        >
          <TouchableHighlight
            onPress={() => { this.setState({ showImagePicker: true }); }}
            activeOpacity={0.8}
            underlayColor='#eff5ff'
          >
            {this.renderSelectedImage()}
          </TouchableHighlight>
        </CardSection>

        <View style={{ height: 5 }} />

        <CardSection
          style={[styles.titleInputContainerStyle, this.state.titleInputContainerErrorStyle]}
        >
          <TextInput
            style={styles.titleInputStyle}
            placeholder='Put the title here..'
            multiline
            numberOfLines={4}
            onChangeText={(text) => this.setState({ titleValue: text })}
            value={this.state.titleValue}
          />
        </CardSection>

        <CardSection style={styles.friendsListContainerStyle}>
          <Text style={styles.friendsListLabelStyle}>Add friends to your story</Text>

          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </CardSection>

        <CardSection style={styles.postButtonContainerStyle}>
          <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.postButtonStyle}>
            <Text style={styles.postTextStyle}>
              Let It Begin!
            </Text>
          </TouchableOpacity>
        </CardSection>

        <View>
          {this.renderImagePicker()}
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
      paddingTop: 70,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start'
  },
  selectTextStyle: {
    fontSize: 24,
    textAlign: 'center'
  },
  selectTextContainer: {
    justifyContent: 'center',
    borderBottomWidth: 0
  },
  buttonStyle: {
    width: 200
  },
  selectImageStyle: {
    height: 120,
    width: 120,
    borderRadius: 30,
    opacity: 0.3
  },
  selectImageContainerStyle: {
    justifyContent: 'center',
    borderBottomWidth: 0
  },
  selectImageContainerErrorStyle: {
    borderLeftWidth: 8,
    borderColor: '#fcc2c2'
  },
  postButtonContainerStyle: {
    borderBottomWidth: 0,
    paddingTop: 40,
    alignSelf: 'center'
  },
  postButtonStyle: {
    flex: 0.8,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    marginLeft: 5,
    marginRight: 5,
    height: 50
  },
  postTextStyle: {
    alignSelf: 'center',
    color: 'grey',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  titleInputStyle: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleInputContainerStyle: {
    justifyContent: 'center',
    borderBottomWidth: 0
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
