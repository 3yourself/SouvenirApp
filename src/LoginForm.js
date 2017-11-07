import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from './actions';
import { Button, CardSection, Spinner } from './common';

class LoginForm extends Component {
  onButtonPress() {
    this.props.loginUser();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Facebook
      </Button>
    );
  }

  render() {
    return (
      <View>
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { error, loading } = auth;

  return { error, loading };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
