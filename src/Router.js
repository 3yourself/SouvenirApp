import React from 'react';
import { View } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginForm from './components/LoginForm';
import HomeScreen from './components/HomeScreen';
import Gallery from './components/Gallery';
import UserProfile from './components/UserProfile';

const tabImage = ({ selected, iconName }) => {
    return (
        <View>
            <Icon
                name={iconName}
                color={selected ? '#473332' : '#bdb8bc'}
                size={35}
            />
        </View>
    );
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
              key="HomeScreen"
              rightTitle="Profile"
              onRight={() => Actions.UserProfile()}
              component={HomeScreen}
              title="All My Cards"

            />
            <Scene key="UserProfile" component={UserProfile} title="Profile" />
          </Scene>

          <Scene key="Share" title="Share" iconName="share" icon={tabImage} initial>
            <Scene key="Gallery" component={Gallery} title="Gallery" />
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
