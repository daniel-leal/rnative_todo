import React, { Component } from 'react';
import api from './services/api';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import Todo from './components/Todo';

export default class App extends Component {
  state = {
    modalVisible: false,
    errorMessage: '',
    todos: [],
  }

  componentDidMount() {
    api.get('/api/v1/todos')
      .then((response) => response.data.data)
      .then((data) => {
        this.setState({
          todos: data
        })
      })
      .catch((err) => {
        console.log(err)
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Todo App</Text>
          <TouchableOpacity onPress={this.getTodoList}>
            <Text style={styles.headerButton}>+</Text>
          </TouchableOpacity>
        </View>

         <ScrollView contentContainerStyle={styles.todoList}>
          { this.state.todos.map(todo => <Todo key={todo.id} data={todo} />) }
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

  header: {
    height: (Platform.OS === 'ios') ? 70 : 50,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  headerButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  todoList: {
    padding: 20,
  },
});
