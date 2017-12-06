import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loginUser } from '../actions';
import { Spinner } from './common';

class LoginForm extends Component {
  onButtonPress() {
    this.props.loginUser();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Icon.Button
        name="facebook" backgroundColor="#3b5998" onPress={this.onButtonPress.bind(this)}
      >
        Login with Facebook
      </Icon.Button>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderButton()}
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const mapStateToProps = ({ auth }) => {
  const { error, loading } = auth;

  return { error, loading };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
