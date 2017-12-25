import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CustomCachedImage } from 'react-native-img-cache';
import Image from 'react-native-image-progress';
import { Spinner } from './common';
import { THEME_COLOR_DARK } from '../Config';

class PostItem extends Component {
  onRowPress() {
    //Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    const { owner, title, link, storyName } = this.props.post;

    return (
      <View>
        <View style={styles.containerStyle}>
          <View style={styles.headerContainerStyle}>
            <Text style={styles.ownerStyle}>
              {owner}
            </Text>
            <Text style={styles.textStyle}>
              {' shared a card in '}
            </Text>
            <Text style={styles.storyStyle}>
              {'#' + storyName}
            </Text>
          </View>

          <View style={styles.cardStyle}>
            <View style={styles.imageContainerStyle}>
              <CustomCachedImage
                source={{ uri: link }}
                style={styles.imageStyle}
                component={Image}
                indicator={Spinner}
              />
            </View>

            <View style={styles.footerTextContainerStyle}>
              <Text style={styles.titleStyle}>
                {title}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.separatorStyle} />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    paddingTop: 3,
    paddingBottom: 3
  },
  cardStyle: {
    borderBottomWidth: 1.8,
    borderLeftWidth: 0.8,
    borderRightWidth: 0.8,
    borderTopWidth: 0.8,
    marginLeft: 3,
    marginRight: 3,
    borderColor: THEME_COLOR_DARK
  },
  titleStyle: {
    fontSize: 15,
    paddingLeft: 15
  },
  imageStyle: {
    height: 250,
    flex: 1,
    width: null,
    borderRadius: 2
  },
  ownerStyle: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  textStyle: {
    fontSize: 12
  },
  storyStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'navy'
  },
  headerContainerStyle: {
    flexDirection: 'row',
    paddingLeft: 2,
    paddingRight: 2
  },
  imageContainerStyle: {
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 3,
    paddingTop: 3,
    height: 250
  },
  footerTextContainerStyle: {

  },
  separatorStyle: {
    height: 5,
    paddingLeft: 5,
    paddingRight: 5
  }
};

export default PostItem;
