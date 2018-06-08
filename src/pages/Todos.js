import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Button,
  ActivityIndicator
} from 'react-native';

import api from '../services/api';
import Todo from '../components/Todo';

export default class Todos extends Component {
  static navigationOptions = {
    headerTitle: 'Todo App',
    headerStyle: {
      backgroundColor: '#333',
    },
    headerTintColor: '#fff',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="+"
        color="#fff"
      />
    ),
  };

  state = {
    modalVisible: false,
    logoutVisible: false,
    isLoading: true,
    todos: [],
  }

  componentDidMount() {
    api.get('/api/v1/todos')
      .then((response) => response.data.data)
      .then((data) => {

        setTimeout(() => {
          this.setState({
            isLoading: false,
            todos: data,
            logoutVisible: true,
          })
        }, 2000)

      })
      .catch((err) => {
        this._signOut();
      });
  }

  _signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={this.state.isLoading}
          size="large"
          color="#ff1744"
          style={styles.spinner}
        />

        <ScrollView contentContainerStyle={styles.todoList}>
          {this.state.todos.map(todo => <Todo key={todo.id} data={todo} />)}

          {
          this.state.logoutVisible ? 
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this._signOut() }}>
              <Text style={{ color: '#FFF' }}>Logout</Text>
            </TouchableOpacity> : null
          }
          
          
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },

  todoList: {
    padding: 20,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff1744',
    padding: 10,
    // margin: 10,
    width: 335,
    borderRadius: 3,
  },

  spinner: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 10,
    bottom: 0,
    height: 80,
  }
});
