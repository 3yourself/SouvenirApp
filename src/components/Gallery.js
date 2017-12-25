import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spinner } from './common';
import { createPost } from '../actions';
import StoriesList from './StoriesList';

const galleryDefaultImage = require('../../res/static/galleryDefaultImage.png');

const INITIAL_STATE = { showImagePicker: false,
          timestamp: '',
          fileName: '',
          titleValue: '',
          selectedSource: '',
          reqValueMissing: false,
          titleInputContainerErrorStyle: null,
          footerErrorStyle: null,
          selectImageContainerErrorStyle: null
        };

class Gallery extends Component {
  state = INITIAL_STATE;

  onButtonPress() {
    let invalid = false;

    if (!this.state.selectedSource) {
      invalid = true;
      this.setState({ selectImageContainerErrorStyle: styles.selectImageContainerErrorStyle });
    } else this.setState({ selectImageContainerErrorStyle: null });

    if (!this.props.selectedStoryUid) {
      invalid = true;
      this.setState({ footerErrorStyle: styles.footerErrorStyle });
    } else this.setState({ footerErrorStyle: null });

    if (!this.state.titleValue) {
      invalid = true;
      this.setState({ titleInputContainerErrorStyle: styles.titleInputContainerErrorStyle });
    } else this.setState({ titleInputContainerErrorStyle: null });

    if (invalid) return;

    this.props.createPost({
      uri: this.state.uri,
      timestamp: this.state.timestamp,
      fileName: this.state.fileName,
      title: this.state.titleValue,
      storyUid: this.props.selectedStoryUid,
      storyGenericUid: this.props.selectedStoryGenericUid
    });
    this.setState(INITIAL_STATE);
  }

  renderImagePicker() {
    if (!this.state.showImagePicker) return;

    const options = {
      title: 'Select Photo',
      // customButtons: [
      //   { name: 'fb', title: 'Choose Photo from Facebook' },
      // ],
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
      <KeyboardAwareScrollView contentContainerStyle={styles.containerStyle}>
        <View style={styles.selectTextContainer}>
          <Text style={styles.selectTextStyle}>Pick a Photo for Your Card</Text>
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

        <View
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
        </View>

        <View style={styles.postButtonContainerStyle}>
          <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.postButtonStyle}>
            <Text style={styles.postTextStyle}>
              Save the Memory
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {this.renderImagePicker()}
        </View>

        <View style={[styles.footerStyle, this.state.footerErrorStyle]}>
          <StoriesList />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  selectTextContainer: {
    paddingTop: 5,
    alignItems: 'center',
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
    height: 150,
    width: 150,
    borderRadius: 30,
    opacity: 0.3
  },
  selectImageContainerErrorStyle: {
    borderLeftWidth: 8,
    borderColor: '#fcc2c2'
  },

  titleInputContainerStyle: {
    height: 60
  },
  titleInputStyle: {
    alignItems: 'center'
  },
  titleInputContainerErrorStyle: {
    borderLeftWidth: 8,
    borderBottomWidth: 0,
    borderColor: '#fcc2c2'
  },

  postButtonContainerStyle: {
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
    marginLeft: 40,
    marginRight: 40,
  },

  footerStyle: {
    bottom: 3
  },
  footerErrorStyle: {
    borderLeftWidth: 8,
    borderColor: '#fcc2c2'
  }
};

const mapStateToProps = (state) => {
  const selectedStoryUid = state.selectedStory.uid;
  const selectedStoryName = state.selectedStory.name;
  const selectedStoryGenericUid = state.selectedStory.storyGenericUid;
  const posting = state.postingStatus.posting;

  return { selectedStoryUid, selectedStoryName, selectedStoryGenericUid, posting };
};

export default connect(mapStateToProps, { createPost })(Gallery);
