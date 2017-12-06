import React, { Component } from 'react';
// import { Actions } from 'react-native-router-flux';
import { Text, View, Image } from 'react-native';
import { CardSection, Card } from './common';

class PostItem extends Component {
  onRowPress() {
    //Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    const { owner, title, link, storyName } = this.props.post;

    return (
      <View>
        <Card>
          <CardSection>
            <Text style={styles.ownerStyle}>
              {owner}
            </Text>
            <Text style={styles.textStyle}>
              {' shared a card in '}
            </Text>
            <Text style={styles.storyStyle}>
              {'#' + storyName}
            </Text>
          </CardSection>

          <CardSection>
            <Image source={{ uri: link }} style={styles.imageStyle} />
          </CardSection>

          <CardSection>
            <Text style={styles.titleStyle}>
              {title}
            </Text>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  imageStyle: {
    height: 250,
    flex: 1,
    width: null
  },
  ownerStyle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  textStyle: {
    fontSize: 15
  },
  storyStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'navy',
    textDecorationLine: 'underline'
  }
};

export default PostItem;
