import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('BusTrackerApp', () => App);
AppRegistry.runApplication('BusTrackerApp', {
  rootTag: document.getElementById('root')
});