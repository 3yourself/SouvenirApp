/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import fire from './fire';
import LoginForm from './LoginForm';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity ,
  FlatList
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class HomeScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = { messages: [], i : 0, someText: 'Edit Me ' + 0, userID: 100000}; // <- set up react state
    //this.state.lastMessage = { text: 'Initial', id: '00001'};
    //this.state.messages.push(this.state.lastMessage);
  }

  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('users/' + this.state.userID + '/messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase sDatabase */
     let lastMessage = [{ text: snapshot.val(), id: snapshot.key, key: this.state.i }];
	 this.state.i++;
	 lastMessage = lastMessage.concat(this.state.messages);
 	 //console.warn('Array size: ' + lastMessage.length + 'Msg: ' + this.state.messages.length)

	 //console.warn(JSON.stringify(this.state.messages))
     this.setState({messages: lastMessage});
    })
  }

  addMessage = () => {
    /* Send the message to Firebase */
    fire.database().ref('users/' + this.state.userID + '/messages').push(this.state.someText);
    this.setState({someText: 'Edit Me ' + this.state.i}) // <- clear the input
  }

  purgeData = () => {
	fire.database().ref('users/' + this.state.userID + '/messages').remove();
	this.setState({messages: []});
  }

  getList = () => {
	  if (this.state.messages[0] == null) return null
	  else {
		//console.warn('getList called. Array size: ' + this.state.messages.length);

		let list = '';

		list = <FlatList
				data={this.state.messages}
				extraData={this.state}
				renderItem={({item}) => <Text>{item.text}, {item.id}, {item.key}}</Text>}
			/>;

		//console.warn(list);

		return list;
		;
	  }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
			Welcome. Input smth!
        </Text>
		<TextInput
			style={styles.hello}
			onChangeText={(text) => this.setState({someText: text})}
			value={this.state.someText}
		/>

		<TouchableOpacity onPress={this.addMessage}>
			<Text style={styles.button1}>PUSH TO DB </Text>
		</TouchableOpacity >

		<TouchableOpacity onPress={this.purgeData}>
			<Text style={styles.button1}>PURGE DB </Text>
		</TouchableOpacity >

		{this.getList()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  hello: {
    fontSize: 16,
    width: 200,
  },

  button1: {
    margin : 20,
	width: 150,
	backgroundColor: '#720084',
	color: '#f0ffff',
	fontWeight: "bold",
	textAlign : 'center',
	margin: 5,
	fontSize: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
