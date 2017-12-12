import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loginUser, reloginUserFirst } from '../actions';
import { Spinner } from './common';

class LoginForm extends Component {
  componentWillMount() {
      this.props.reloginUserFirst();
  }

  onButtonPress() {
    this.props.loginUser();
  }

  renderButton() {
    if (this.props.loading || this.props.user) {
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
  const { error, loading, user } = auth;

  return { error, loading, user };
};

export default connect(mapStateToProps, { reloginUserFirst, loginUser })(LoginForm);
