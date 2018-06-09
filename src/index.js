import Login from './pages/Login';
import Todos from './pages/Todos';
import AuthLoadingScreen from './AuthLoadingScreen';

import Signup from './pages/Signup';

import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

const AuthStack = createStackNavigator({
  Login: Login,
  Signup: Signup,
});

const AppStack = createStackNavigator({
  Todos: Todos,
});

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


console.disableYellowBox = true;
