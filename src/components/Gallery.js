import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { CardSection, Button } from './common';
import { createPost } from '../actions';

class Gallery extends Component {
  state = { showImagePicker: false };

  onButtonPress() {
    console.log(this.state.uri);
    this.props.createPost({
      uri: this.state.uri,
      timestamp: this.state.timestamp,
      fileName: this.state.fileName
    });
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
    let source = { uri: 'https://firebasestorage.googleapis.com/v0/b/souvenir-5000d.appspot.com/o/static%2FgalleryIcon.png?alt=media&token=501e14ac-9358-4701-aabc-60d5818de43e' };
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

        <CardSection style={styles.selectImageContainerStyle}>
          <TouchableHighlight
            onPress={() => { this.setState({ showImagePicker: true }); }}
            activeOpacity={0.8}
            underlayColor='#eff5ff'
          >
            {this.renderSelectedImage()}
          </TouchableHighlight>
        </CardSection>

        <CardSection style={styles.postButtonContainerStyle}>
          <Button onPress={this.onButtonPress.bind(this)}>
            Show me to others!
          </Button>
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
      paddingTop: 70
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
  postButtonContainerStyle: {
    borderBottomWidth: 0,
    paddingTop: 40
  }
};

export default connect(null, { createPost })(Gallery);
