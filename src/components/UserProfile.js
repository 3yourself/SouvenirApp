import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { logoutUser } from '../actions';
import { Spinner } from './common';

class UserProfile extends Component {
  componentWillMount() {
    this.setState({ displayInfo: true });
  }

  onButtonPress() {
    this.setState({ displayInfo: false });
    this.props.logoutUser();
  }

  renderUserInfo() {
    if (this.state.displayInfo) return firebase.auth().currentUser.displayName;
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Text onPress={this.onButtonPress.bind(this)}>
        Log Out
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderButton()}
        <Text>
          {this.renderUserInfo()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

const mapStateToProps = ({ auth }) => {
  const { loading } = auth;

  return { loading };
};

export default connect(mapStateToProps, { logoutUser })(UserProfile);
