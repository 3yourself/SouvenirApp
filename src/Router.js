import React from 'react';
import { Text, View } from 'react-native'
import { Scene, Router, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';
import Gallery from './Gallery';
import UserProfile from './UserProfile';

const tabImage = ({ selected, title, iconName }) => {
    return (
        <View>
            <Icon
                name={iconName}
                color={selected? '#473332' : '#bdb8bc'}
                size={35}
            />
        </View>
    )
};

const RouterComponent = () => {
  return (
    <Router>

      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Login" />
      </Scene>

      <Scene key="main">
        <Scene
          key="tabbar"
          tabs
          tabBarStyle={{ backgroundColor: '#F0F0F0' }}
        >
          <Scene key="Home" title="Home" iconName="home" icon={tabImage}>
            <Scene
              rightTitle="Profile"
              onRight={() => Actions.UserProfile()}
              key="HomeScreen"
              component={HomeScreen}
              title="Souvenir"
              initial
            />
            <Scene key="UserProfile" component={UserProfile} title="Profile" />
          </Scene>

          <Scene key="Share" title="Share" iconName="share" icon={tabImage}>
            <Scene key="Gallery" component={Gallery} title="Gallery" />
          </Scene>
        </Scene>
      </Scene>

    </Router>
  );
};

export default RouterComponent;
