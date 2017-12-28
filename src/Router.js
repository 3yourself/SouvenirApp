import React from 'react';
import { View, Platform } from 'react-native';
import { Scene, Router, Tabs } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginForm from './components/LoginForm';
import HomeScreen from './components/HomeScreen';
import Gallery from './components/Gallery';
import Stories from './components/Stories';
import UserProfile from './components/UserProfile';
import CreateStory from './components/CreateStory';
import THEME_COLOR_DARK from './Config';


const home = ({ focused }) => {
    return (
        <View>
            <Icon
                name='home'
                color={focused ? 'teal' : '#4a4a4a'}
                size={35}
            />
        </View>
    );
};

const share = ({ focused }) => {
    return (
        <View>
            <Icon
                name='envelope-open'
                color={focused ? 'teal' : '#4a4a4a'}
                size={26}
            />
        </View>
    );
};

const stories = ({ focused }) => {
    return (
        <View>
            <Icon
                name='book'
                color={focused ? 'teal' : '#4a4a4a'}
                size={27}
            />
        </View>
    );
};

const profile = ({ focused }) => {
    return (
        <View>
            <Icon
                name='user-circle'
                color={focused ? 'teal' : '#4a4a4a'}
                size={28}
            />
        </View>
    );
};

const RouterComponent = () => {
  return (
    <Router sceneStyle={styles.sceneStyle}>
      <Scene key="root">
        <Scene key="login" component={LoginForm} title="Login" />

        <Tabs
          key="tabbar"
          tabBarStyle={Platform.OS === 'ios' ? styles.tabBarIosStyle : styles.tabBarAndroidStyle}
          labelStyle={styles.labelStyle}
          iconStyle={Platform.OS === 'ios' ? styles.iconIosStyle : null}
          headerMode='none'
          init
          tabBarPosition='top'
          showIcon
          upperCaseLabel={false}
          activeTintColor='teal'
          inactiveTintColor='#4a4a4a'
          swipeEnabled
        >
          <Scene key="homeScreen" component={HomeScreen} title="Home" icon={home} />

          <Scene key="gallery" component={Gallery} title="Share a Card" icon={share} />

          <Scene key="Stories" component={Stories} title="Stories" icon={stories} />

          <Scene key="UserProfile" component={UserProfile} title="Profile" icon={profile} />
        </Tabs>

        <Scene key='createStory' component={CreateStory} title='Create the Story' />
      </Scene>
    </Router>
  );
};

const styles = {
  tabBarAndroidStyle: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.8,
    borderBottomColor: 'grey',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 3
  },
  tabBarIosStyle: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.8,
    borderBottomColor: 'grey',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 3,
    paddingTop: 13,
    height: 80
  },
  labelStyle: {
    //color: 'teal'
    fontSize: 10
  },
  sceneStyle: {
    backgroundColor: '#ffffff'
  },
  iconIosStyle: {
    width: 50
  }
};

export default RouterComponent;
