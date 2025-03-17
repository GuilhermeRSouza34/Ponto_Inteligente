import { AppRegistry } from 'react-native';
import App from './App.web';

AppRegistry.registerComponent('BusTrackerApp', () => App);
AppRegistry.runApplication('BusTrackerApp', {
  rootTag: document.getElementById('root')
});