import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
import Gallery from './Gallery';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 60 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Login" />
      </Scene>

      <Scene key="main">
        <Scene
          onRight={() => Actions.Gallery()}
          rightTitle="Share"
          key="HomeScreen"
          component={HomeScreen}
          title="Souvenir"
          initial
        />
        <Scene key="Gallery" component={Gallery} title="Gallery" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
