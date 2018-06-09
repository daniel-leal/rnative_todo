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
  AsyncStorage,
  Button
} from 'react-native';

import api from '../services/api';

export default class Signup extends Component {
  static navigationOptions = {
    headerTitle: 'Sign Up',
    headerStyle: {
      backgroundColor: '#333',
    },
    headerTintColor: '#fff',
  };

  state = {
    username: '',
    password: '',
    password_confirmation: '',
    token: '',
  }

  _signup(navigation) {
    api.post('/api/v1/sign_up', {
      user: {
        email: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      },
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
    .catch((err) => { 
      var message = ''

      // Rrefinate the error message.
      message += `\n Email: ${err.data.errors.email} \n\n`;
      message += `Password: ${err.data.errors.password} \n\n`;
      message += `Password: ${err.data.errors.password_confirmation}`;

      Alert.alert('Ocorreu um erro:', message) 
    });
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

        <TextInput
          autoCapitalize="none"
          style={styles.boxInput}
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          placeholder="Password Confirmation"
          placeholderTextColor="#fff"
          value={this.state.password_confirmation}
          secureTextEntry
          onChangeText={password_confirmation => this.setState({ password_confirmation })}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => { this._signup(this.props.navigation) }}>
          <Text style={{ color: '#FFF' }}>Sign Up</Text>
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

