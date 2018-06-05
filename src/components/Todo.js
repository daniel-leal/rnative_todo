/* Core */
import React from 'react';

/* Presentational */
import { View, Image, Text, StyleSheet } from 'react-native';

const Todo = ({ data }) => (
  <View style={styles.todo}>
    <View style={styles.todoInfo}>
      <Text style={data.is_done ? styles.todoDone : styles.todoDescription}>{data.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  todo: {
    padding: 20,
    backgroundColor: '#FFF',
    marginBottom: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  todoInfo: {
    marginLeft: 10,
  },

  todoDescription: {
    fontWeight: 'bold',
  },

  todoDone: {
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  }
});

export default Todo;
