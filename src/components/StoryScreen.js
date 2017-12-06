import React, { Component } from 'react';
import { View } from 'react-native';
import PostsList from './PostsList';
import StoriesList from './StoriesList';

class StoryScreen extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.contentStyle}>
          <PostsList />
        </View>
        <View style={styles.footerStyle}>
          <StoriesList />
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
     paddingTop: 50,
     flex: 1,
     flexDirection: 'column',
     justifyContent: 'center'
  },
  footerStyle: {
    zIndex: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 55
  },
  contentStyle: {
    marginBottom: 145
  }
};

export default HomeScreen;


//
// export default class HomeScreen extends Component {
//     state = { messages: [],
//               i: 0,
//               someText: 'Edit Me ' + 0,
//               userID: 100000
//             }; // <- set up react state
//
//   componentWillMount() {
//     /* Create reference to messages in Firebase Database */
//     const messagesRef = firebase.database().ref('users/' + this.state.userID + '/messages')
//                           .orderByKey().limitToLast(100);
//     messagesRef.on('child_added', snapshot => {
//       let lastMessage = [{ text: snapshot.val(), id: snapshot.key, key: this.state.i }];
//       this.state.i++;
//       lastMessage = lastMessage.concat(this.state.messages);
//       this.setState({ messages: lastMessage });
//     });
//   }
//
//   getList = () => {
//     if (this.state.messages[0] == null) return null;
//
//     let list = '';
//
// 		list = (
//       <FlatList
//         data={this.state.messages}
//         extraData={this.state}
//         renderItem={({ item }) => <Text>{item.text}, {item.id}, {item.key}}</Text>}
//       />
//     );
//
// 		return list;
//   }
//
//   addMessage = () => {
//     /* Send the message to Firebase */
//     firebase.database().ref('users/' + this.state.userID + '/messages').
          // push(this.state.someText);
//     this.setState({ someText: 'Edit Me ' + this.state.i }); // <- clear the input
//   }
//
//   purgeData = () => {
//     firebase.database().ref('users/' + this.state.userID + '/messages').remove();
//     this.setState({ messages: [] });
//   }
//
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
// 			Welcome. Input smth!
//         </Text>
// 		<TextInput
// 			style={styles.hello}
// 			onChangeText={(text) => this.setState({ someText: text })}
// 			value={this.state.someText}
// 		/>
//
// 		<TouchableOpacity onPress={this.addMessage}>
// 			<Text style={styles.button1}>PUSH TO DB </Text>
// 		</TouchableOpacity >
//
// 		<TouchableOpacity onPress={this.purgeData}>
// 			<Text style={styles.button1}>PURGE DB </Text>
// 		</TouchableOpacity >
//
// 		{this.getList()}
//
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   hello: {
//     fontSize: 16,
//     width: 200,
//   },
//
//   button1: {
//     margin: 20,
//     width: 150,
//     backgroundColor: '#720084',
//     color: '#f0ffff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 20,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
