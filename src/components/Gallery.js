import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { CardSection } from './common';
import { createPost } from '../actions';
import StoriesList from './StoriesList';

const INITIAL_STATE = { showImagePicker: false,
          uri: 'https://firebasestorage.googleapis.com/v0/b/souvenir-5000d.appspot.com/o/static%2FgalleryIcon.png?alt=media&token=501e14ac-9358-4701-aabc-60d5818de43e',
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
      storyName: this.props.selectedStoryName,
      storyGenericUid: this.props.selectedStoryGenericUid
    });
    this.setState(INITIAL_STATE);
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
    return (
      <View style={styles.containerStyle}>
        <CardSection style={styles.selectTextContainer}>
          <Text style={styles.selectTextStyle}>Choose that Awesome Photo!</Text>
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

        <CardSection style={styles.postButtonContainerStyle}>
          <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.postButtonStyle}>
            <Text style={styles.postTextStyle}>
              Show me to others!
            </Text>
          </TouchableOpacity>
        </CardSection>

        <View>
          {this.renderImagePicker()}
        </View>

        <View style={[styles.footerStyle, this.state.footerErrorStyle]}>
          <StoriesList />
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
    height: 200,
    width: 200,
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
  footerStyle: {
    zIndex: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 55
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
  return { selectedStoryUid, selectedStoryName, selectedStoryGenericUid };
};

export default connect(mapStateToProps, { createPost })(Gallery);
