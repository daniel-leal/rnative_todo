import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Alert,
  AsyncStorage
} from 'react-native';

import api from '../services/api';

export default class Login extends Component {
  static navigationOptions = {
    headerTitle: 'Todo App',
    headerStyle: {
      backgroundColor: '#333',
    },
    headerTintColor: '#fff',
  };

  state = {
    modalVisible: false,
    errorMessage: '',
    username: '',
    password: '',
    token: '',
  }

  _login(navigation) {
    api.post('/api/v1/sign_in', {
      email: this.state.username,
      password: this.state.password,      
    })
    .then((response) => response.data)
    .then((data) => { 
      console.log(data)
      this.setState({
        token: data
      })
      AsyncStorage.setItem('TodoApp:token', JSON.stringify(this.state.token));
      navigation.navigate('App');
    })
    .catch((err) => { Alert.alert('Ocorreu um erro:', err.data.error) });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 120, height: 120, marginBottom: 50, marginTop: 80 }}
          source={require('../images/logo.png')}
        />

        <TextInput
          autoFocus
          autoCapitalize="none"
          style={styles.boxInput}
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          placeholder="Username"
          placeholderTextColor="#fff"
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />

        <TextInput
          autoCapitalize="none"
          style={styles.boxInput}
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          placeholder="Password"
          placeholderTextColor="#fff"
          value={this.state.password}
          secureTextEntry
          onChangeText={password => this.setState({ password })}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => { this._login(this.props.navigation) }}>
          <Text style={{ color: '#FFF' }}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ff1744',
    padding: 10,
    margin: 10,
    width: 350,
    borderRadius: 3,
  },

  boxTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  boxInput: {
    alignSelf: 'stretch',
    marginTop: 10,
    paddingVertical: 0,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    height: 40,
    borderRadius: 3,
    width: 350,
    color: '#fff'
  },
});

