import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Todo = ({ data }) => (
  <View style={styles.todo}>

    <View style={styles.todoInfo}>
      <Text style={data.is_done ? styles.todoDone : styles.todoDescription}>{data.description}</Text>
    </View>

    <Icon.Button name="check" color="#70BD85" backgroundColor="rgba(0,0,0,0)" onPress={() => {}}>
    </Icon.Button>
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
    alignItems: 'center',
    marginRight: 20,
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
