import { AppRegistry } from 'react-native';
import Navigator from './src/index';

const App = Navigator;

AppRegistry.registerComponent('todoApp', () => App);
console.disableYellowBox = true;
