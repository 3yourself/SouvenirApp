import { View } from 'react-native';
import React from 'react';

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>);
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 3,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
