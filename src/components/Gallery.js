import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button } from './common';

class Gallery extends Component {
  state = { showImagePicker: false };

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
          this.setState({ showImagePicker: false });
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
              avatarSource: source
            });
          }
        })
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Some Text </Text>
        <Button
           onPress={() => { this.setState({ showImagePicker: true }); }}
           title='Upload Photo'
        />
        <Text>Some Text </Text>
        <Text>Some Text </Text>
        <View>
          {this.renderImagePicker()}
        </View>

      </View>
    );
  }
}

export default Gallery;


const styles = {
  container: {
      paddingTop: 100
  }
};
